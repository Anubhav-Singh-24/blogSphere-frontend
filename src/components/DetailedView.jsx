import React, { useContext, useEffect, useState } from "react";
import { API } from "../service/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteConf from "./DeleteConf";
import blogImg from "../assets/blog.jpg";
import { FaEye } from "react-icons/fa";
import Comments from "./Comments";
import "quill/dist/quill.snow.css";
import Loader from "./Loader";

const DetailedView = ({ isAuthenticated }) => {
  const [post, setPost] = useState({});
  const [show, setShow] = useState(false);
  const [views, setViews] = useState(0);
    const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const { username } = useContext(DataContext);
  const img = post.picture ? post.picture : blogImg;

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
          const viewCount = response.data.views + 1;
          setViews(viewCount);
        }
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPostById();
    }
  }, [id]);

  useEffect(() => {
    const updateViewsById = async () => {
      try {
        await API.updateViews(id);
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      } 
    };
    if (!post.length === 0) {
      updateViewsById();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
          <div className="mt-32 pb-10 px-10 flex flex-col gap-5 dark:bg-[rgba(8,10,21,1)] dark:text-white">
            <div className="flex justify-start items-center gap-4 text-gray-500 dark:text-white font-bold">
              <span>{post.category}</span>
              <span>{new Date(post.publishDate).toDateString()}</span>
            </div>
            <span className="text-3xl font-bold">{post.title}</span>
            <div className="w-full flex justify-center">
              <img
                src={img}
                alt={post.title}
                className="w-full xl:h-[80vh] h-auto p-2 rounded-3xl object-fit"
              />
            </div>
            <div className="flex justify-between items-center w-full gap-5 px-5 ">
              <div className="flex items-center justify-center text-gray-500 gap-3 dark:text-white">
                <FaEye />
                <span>{views}</span>
              </div>
              {username === post.username && (
                <div className="flex items-center justify-center gap-3">
                  <Link to={`/update/${post._id}`}>
                    <FaRegEdit className="text-xl hover:text-blue-500 duration-300 ease-in-out cursor-pointer" />
                  </Link>
                  <MdDelete
                    onClick={() => setShow(true)}
                    className="text-xl hover:text-red-500 duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              )}
            </div>
            <span className="text-end px-5 text-[#7c4ee4] text-lg font-bold">
              - {post.name}
            </span>
            <div
              className="text-gray-500 px-5 ql-editor dark:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          {show && <DeleteConf id={id} onClose={() => setShow(false)} />}
          <Comments post={post} isAuthenticated={isAuthenticated} />
    </>
  );
};

export default DetailedView;
