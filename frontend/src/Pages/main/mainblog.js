import { Route, Routes } from "react-router-dom";
import Mainpage from "./mainpage/mainpage";
import Blog from "./Blog/Blog";
import BlogPost from "./BlogPost/BlogPost";
import { React, useState } from "react";
import './main.css'

function Mainblog() {
const [getBlogContent, setGetBlogContent] = useState([]);
  const getData = (blog) => {
    setGetBlogContent(blog);
  }
  return (
    <div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Mainpage/>} />
          <Route path="/blog" element={<Blog data={getData}/>} />
          <Route path="/blog/:id" element={<BlogPost content={getBlogContent}/>} />
        </Routes>
      </div>
    </div>
  );
}
export default Mainblog;