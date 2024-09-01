import React, { useState } from "react";
import "../css/home.css";
import axios from "axios";
import Carrossel from "./carrossel";

function Home() {
  const BASE_API_URL = "http://127.0.0.1:5000/";
  const [data, setData] = useState(null);
  const [folderData, setFolderData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}folder`).then((res) =>
        res.json()
      );
      setFolderData(response);
      setData(null);
      if (response.ok) {
      } else {
        console.log("Failed to read the folders");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const fileURL = URL.createObjectURL(event.target.files[0]);
    setOriginalImage(fileURL);
  };

  const onFileUpload = async () => {
    setData(null);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(response.data);
      setFolderData(null);
    } catch (error) {
      console.error("There was an error processing the image!", error);
    }
  };

  const download = (e, filter__name, accuracy) => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${filter__name}${accuracy.toFixed(2)}%.png`
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      <div>
        <select>
          <option>Select Filter</option>
          <option>Denoised</option>
          <option>Mean</option>
          <option>Median</option>
          <option>Edge Detection</option>
          <option>Laplacian</option>
          <option>Morphological Filter</option>
          <option>Sobel Filter</option>
          <option>Brightness</option>
          <option>Contrast</option>
          <option>Color</option>
          <option>Gaussian Blur</option>
          <option>Inverted</option>
          <option>Sharpening</option>
          <option>Resized</option>
          <option>Scaled</option>
          <option>Detail</option>
          <option>Edge Enhance</option>
          <option>Equalized</option>
        </select>
        <input type="file" onChange={onFileChange} id="photo__selector" />
        <button>Apply Technique</button>
        <button onClick={handleSubmit}>Apply on local directory</button>
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
        {data ? (
          <span>
            <img
              src={`data:image/png;base64,${data.best_ssim_image_base64}`}
              alt="Best SSIM"
            />

            <h3>SSIM: {data.best_filter_ssim} Filter</h3>
            <button>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href={`data:image/png;base64,${data.best_ssim_image_base64}`}
                download
                onClick={(e) =>
                  download(e, data.best_filter_ssim, data.best_ssim_accuracy)
                }
              >
                Download Image{" "}
              </a>
            </button>
          </span>
        ) : (
          <Carrossel />
        )}
        {data && (
          <span>
            <img
              src={`data:image/jpg;base64,${data.best_psnr_image_base64}`}
              alt="Best PSNR"
            />
            <h3>PSNR: {data.best_filter_psnr} Filter</h3>
            <button>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href={`data:image/png;base64,${data.best_psnr_image_base64}`}
                download
                onClick={(e) =>
                  download(e, data.best_filter_psnr, data.best_ssim_accuracy)
                }
              >
                Download Image{" "}
              </a>
            </button>
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
            <strong>Best PSNR: </strong>{" "}
            {data
              ? data.best_filter_psnr
              : folderData && folderData.best_fl_psnr}
          </p>
          <p>
            <strong>Best SSIM: </strong>{" "}
            {data
              ? data.best_filter_ssim
              : folderData && folderData.best_fl_ssim}
          </p>
          <p>
            <strong>Accuracy PSNR: </strong>{" "}
            {data
              ? data.best_psnr_accuracy.toFixed(2)
              : folderData && folderData.best_psnr_accuracy.toFixed(2)}{" "}
            %
          </p>
          <p>
            <strong>Accuracy SSIM: </strong>{" "}
            {data
              ? data.best_ssim_accuracy.toFixed(2)
              : folderData && folderData.best_ssim_accuracy.toFixed(2)}{" "}
            %
          </p>
        </div>
      </div>
      {folderData && (
        <div
          style={{
            justifyContent: "left",
            textAlign: "left",
            margin: "auto",
            width: "35vw",
          }}
        >
          <h4>Selected folder: {folderData.folder_path}</h4>
          <h4>Paths to best image: </h4>
          <ul>
            <li>
              {folderData.result_folder}/{folderData.best_fl_psnr}
            </li>
            <li>
              {folderData.result_folder}/{folderData.best_fl_ssim}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
