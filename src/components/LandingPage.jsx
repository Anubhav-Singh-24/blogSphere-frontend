import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { API } from "../service/api";
import { toast } from "react-toastify";
import "quill/dist/quill.snow.css";
import { truncateHTML } from "../utils/common-utils";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import blogImg from "../assets/blog.jpg";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await API.getAllPosts();
        if (res.isSuccess) {
          setPosts(res.data);
        }
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      }
    };
    getPosts();
  }, []);

  const getRandomNumber = ()=>{
      if (posts && posts.length > 0) {
        return Math.floor(Math.random() * (posts.length-2 + 1));
      }
  }

  const ind = getRandomNumber();

  return (
    <>
      {posts.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="lg:mt-36 mt-12 py-12 flex flex-col justify-center items-start lg:px-10 px-0 gap-8 dark:bg-[rgba(8,10,21,1)] dark:text-white">
          <div className="flex lg:flex-row flex-col lg:justify-start gap-5 items-center bg-[#7c4ee4] p-10 text-white w-full rounded-tl-[150px] rounded-br-[150px]">
            <div className="max-w-lg w-full flex justify-center items-center ml-10">
              <img
                src={posts[ind].picture || blogImg}
                alt={posts[ind].title}
                className="rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col flex-wrap gap-4">
              <span className="text-lg font-semibold">
                Elevate Your Curiosity
              </span>
              <span className="lg:text-3xl text-xl font-bold">
                {posts[ind].title}
              </span>
              <div
                className="font-semibold text-sm"
                id="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(posts[ind].content, 250),
                }}
              ></div>
              <div className="flex">
                <Link to={`/detail/${posts[ind]._id}`}>
                  <button className="flex justify-center items-center gap-3 bg-white text-[#7c4ee4] lg:text-md text-sm px-4 p-3 rounded-lg font-bold hover:bg-slate-200 duration-300 ease-in-out">
                    Explore
                    <FaExternalLinkAlt size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:px-0 px-5 dark:bg-[rgba(8,10,21,1)] dark:text-white">
            <span className="text-3xl font-bold">Our Recent Post</span>
            <div className="flex lg:flex-row flex-col justify-start items-center w-full gap-5">
              <div className="lg:max-w-2xl max-w-lg w-full flex justify-center items-center ">
                <img
                  src={posts[posts.length - 1].picture || blogImg}
                  alt={posts[posts.length - 1].title}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col gap-4 p-5 flex-wrap">
                <span className="text-xl font-bold">
                  {posts[posts.length - 1].title}
                </span>
                <div
                  className="rounded-lg text-gray-500 dark:text-white max-w-lg w-full"
                  id="ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: truncateHTML(posts[posts.length - 1].content, 250),
                  }}
                ></div>
                <div className="flex justify-start items-center">
                  <Link to={`/detail/${posts[posts.length - 1]._id}`}>
                    <button className="flex justify-center items-center gap-3 text-white bg-[#7c4ee4] border-2 border-solid border-[#7c4ee4] lg:text-md text-sm px-4 p-3 rounded-lg font-bold hover:bg-white hover:text-[#7c4ee4] duration-300 ease-in-out">
                      Read More
                      <FaExternalLinkAlt size={15} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:px-0 px-5">
            <span className="text-3xl font-bold">Explore More Topics</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto px-7">
              {posts.map((post) => {
                return (
                  <Link to={`/detail/${post._id}`} key={post._id}>
                    <Posts post={post} key={post._id} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
