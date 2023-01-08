import React, { useRef, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set up the canvas for drawing
    ctx.lineWidth = 50;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

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
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        lastX = currentX;
        lastY = currentY;

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
            console.log(data);
          });
      }
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}></canvas>
  );
};

export default DrawingCanvas;
