// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/home";

function App() {
  return (
    <>
      <div style={{ width: "100%", padding: "30px 0" }}>
        <h2 style={{ textAlign: "center" }}>Image Preprocessing</h2>
      </div>
      <div>
        <Home />
      </div>
    </>
  );
}

export default App;
