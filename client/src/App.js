import "./assets/css/App.css";
import DrawingCanvas from "./components/DrawingCanvas";
import { useState } from "react";

function App() {
  return (
    <div className="canvas">
      <DrawingCanvas />
    </div>
  );
}

export default App;
