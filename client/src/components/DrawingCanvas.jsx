import React, { useRef, useState, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const initState = {
    "Ensemble CNN Model": Array.from({ length: 10 }, (_, i) => ({
      [i]: 0,
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    "Simple CNN Model": Array.from({ length: 10 }, (_, i) => ({
      [i]: 0,
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  };

  const [prob, setProb] = useState(initState);

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    // Set up the canvas for drawing
    ctx.current.lineWidth = 35;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = "rgb(100, 0, 0)";

    // Set up mouse event handlers for drawing
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", (event) => {
      isDrawing = true;
      lastX = event.offsetX;
      lastY = event.offsetY;
    });

    canvas.addEventListener("mousemove", (event) => {
      if (isDrawing) {
        const currentX = event.offsetX;
        const currentY = event.offsetY;
        ctx.current.beginPath();
        ctx.current.moveTo(lastX, lastY);
        ctx.current.lineTo(currentX, currentY);
        ctx.current.stroke();
        lastX = currentX;
        lastY = currentY;
      }
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;

      const imageData = canvas.toDataURL();

      fetch("http://127.0.0.1:5555/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProb(data);
        });
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
    });
  }, [setProb]);

  return (
    <main className="main-container">
      <section className="canvas-container">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{
            cursor: "circle",
          }}></canvas>
        <button
          className="clear-button"
          onClick={() => {
            ctx.current.clearRect(0, 0, 500, 500);
            setProb(initState);
          }}>
          Clear Canvas
        </button>
      </section>

      <section className="model-section">
        {Object.keys(prob).map((key) => (
          <div
            key={key}
            className="model-container">
            <h1 className="model-heading">{key}</h1>
            {Object.keys(prob[key])
              .sort((a, b) => prob[key][b] - prob[key][a])
              .map((innerKey) => (
                <p
                  key={innerKey}
                  className="model-values">
                  <span className="model-class">{innerKey}</span>{" "}
                  {`${(prob[key][innerKey] * 100).toFixed(3)}%`}
                </p>
              ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default DrawingCanvas;
