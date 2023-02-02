import { Route, Routes } from "react-router-dom";
import Mainpage from "./mainpage/mainpage";
import { React } from "react";
import './main.css'

function Mainblog() {
  return (
    <div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Mainpage/>} />
        </Routes>
      </div>
    </div>
  );
}
export default Mainblog;