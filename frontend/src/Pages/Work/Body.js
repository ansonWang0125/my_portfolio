
import React, { useState } from "react";
  
function Body() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  
    return (
        <div className="Body">
            <h2>Add Image:</h2>
            <lable>
                <input type="file" onChange={handleChange} />
            </lable>
            {console.log(file)}
            <img src={file} />
  
        </div>
  
    );
}
  
export default Body;