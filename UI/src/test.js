import React, { useState, useEffect } from "react";
import { uploadFiles, getFiles } from "../services/FileUploadService";
const ImageUpload = () => {

    const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);

  const [imageInfos, setImageInfos] = useState([]);

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
      };

    const upload = () => {
    
        uploadFiles(currentFile)
          .then((response) => {
            console.log(response.data.message)
            return getFiles();
          })
          .then((files) => {
            setImageInfos(files.data);
          })
          .catch((err) => {
    
            if (err.response && err.response.data && err.response.data.message) {
              console.log(err.response.data.message);
            } else {
              console.log("Could not upload the Image!");
            }
    
            setCurrentFile(undefined);
          });
      };

    useEffect(() => {
        getFiles().then((response) => {
          setImageInfos(response.data);
        });
      }, []);
    return (
      <div>
        {/* <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={selectFile} />
            </label>
          </div>
  
          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={upload}
            >
              Upload
            </button>
          </div>
        </div>
  
        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
  
        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" />
          </div>
        )}
  
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
  
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p>
                    <a href={img.url}>{img.name}</a>
                  </p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div> */}
       </div>
    );
  };
  
  export default ImageUpload;