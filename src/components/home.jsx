import React, { useState } from "react";
import "../css/home.css";
import axios from "axios";

function Home() {
  const BASE_API_URL = "http://127.0.0.1:5000/";
  const [data, setData] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const fileURL = URL.createObjectURL(event.target.files[0]);
    setOriginalImage(fileURL);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("There was an error processing the image!", error);
    }
  };

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
        <input type="file" onChange={onFileChange} id="photo__selector" />
        <button>Apply Technique</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="img__container"
      >
        {originalImage && (
          <span>
            <img src={originalImage} alt="Original Image" />
            <h3>Original</h3>
            <button onClick={onFileUpload}>Upload Image</button>
          </span>
        )}
        {data && (
          <span>
            <img
              src={`data:image/jpg;base64,${data.best_ssim_image_base64}`}
              alt="Best SSIM"
            />

            <h3>Filter: {data.best_filter_ssim}</h3>
            <button>Download Image</button>
          </span>
        )}
        {data && (
          <span>
            <img
              src={`data:image/jpg;base64,${data.best_psnr_image_base64}`}
              alt="Best PSNR"
            />
            <h3>Filter: {data.best_filter_psnr}</h3>
            <button>Download Image</button>
          </span>
        )}
      </div>

      <div
        style={{
          textAlign: "left",
          width: "500px",
          margin: "auto",
          border: "1px solid black",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "lightgray",
        }}
      >
        <h3>Result Summery</h3>
        <div>
          <p>
            <strong>Best PSNR: </strong> {data && data.best_filter_psnr}
          </p>
          <p>
            <strong>Best SSIM: </strong> {data && data.best_filter_ssim}
          </p>
          <p>
            <strong>Accuracy PSNR: </strong>{" "}
            {data && data.best_psnr_accuracy.toFixed(2)} %
          </p>
          <p>
            <strong>Accuracy SSIM: </strong>{" "}
            {data && data.best_ssim_accuracy.toFixed(2)} %
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
