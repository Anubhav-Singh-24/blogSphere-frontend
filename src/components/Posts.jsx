import { useContext, useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { DataContext } from "../context/DataProvider";
import { FaEye } from "react-icons/fa";
import "quill/dist/quill.snow.css";
import blogImg from '../assets/blog.jpg'
import { truncateHTML } from "../utils/common-utils";


const Posts = ({ post }) => {


    const {username} = useContext(DataContext)
     const [loading, setLoading] = useState(true);
     const imgSrc = post.picture ? post.picture : blogImg
    
 

    useEffect(() => {
      
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => setLoading(false);
    }, [imgSrc]);

  return (
    <div className="bg-white dark:bg-[rgba(8,10,21,1)] rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-110 cursor-pointer max-w-md w-full dark:shadow-white dark:shadow-md">
      {loading ? (
        <div
          className="h-48 w-full object-fit animate-pulse bg-gray-500 dark:bg-gray-700"
        ></div>
      ) : (
        <img src={imgSrc} alt={post.title} className="w-full h-48 object-fit" />
      )}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between text-gray-500 dark:text-white text-sm">
          <div className="flex items-center justify-center gap-2">
            <FaEye />
            <span className="text-xs">{post.views}</span>
          </div>
          <span className="text-sm font-semibold">
            {new Date(post.publishDate).toDateString()}
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-white font-semibold">
          {post.category}
        </span>
        <span className="text-xl font-bold mb-2 dark:text-white">
          {post.title}
        </span>
        <div
          className="text-gray-500 ql-editor dark:text-white"
          dangerouslySetInnerHTML={{ __html: truncateHTML(post.content, 150) }}
        ></div>
        <div className="flex w-full justify-between items-center gap-2 text-lg">
          <span className="text-[#7c4ee4] underline text-sm">Read More</span>
          {post.username === username && (
            <div className="flex items-center justify-center gap-2">
              <CiEdit className="hover:text-blue-400 duration-300 ease-in-out" />
              <MdDelete className="hover:text-red-600 duration-300 ease-in-out" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
