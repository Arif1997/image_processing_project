import React from "react";
import "../css/home.css";

function Home() {
  return (
    <div className="home">
      <div>
        <select>
          <option>Select Filter</option>
          <option>Median filter</option>
          <option>Gaussian filter</option>
          <option>Laplacian filter</option>
          <option>Linear filters</option>
          <option>Fourier transform</option>
          <option>Unsharp filter</option>
          <option>Contrast</option>
          <option>Sobel filter</option>
        </select>

        <button>Upload Image</button>
        <button>Download Image</button>
        <button>Apply</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="img__container"
      >
        <span>
          <img src="/images/original.png" alt="Original Image" />
          <h3>Original</h3>
        </span>
        <span>
          <img src="/images/processed.png" alt="Original Image" />
          <h3>Processed</h3>
        </span>
      </div>
      <div style={{ textAlign: "left", width: "500px", margin: "auto" }}>
        <h3>Result Summery</h3>
        <div>
          <p>
            <strong>Filter:</strong> Gaussian Filter
          </p>
          <p>
            <strong>Accuracy:</strong> 90%
          </p>
          <p>
            <strong>Algorithm:</strong> Gaussian Intensive
          </p>
          <p>
            <strong>Effects:</strong> Removing the background noise
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
