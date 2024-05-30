import { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { DataContext } from "../context/DataProvider";
import { API } from "../service/api";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Comments = ({ post, isAuthenticated }) => {
  const initial = {
    name: "",
    username: "",
    postId: "",
    comments: "",
    date: "",
  };

  const { name, username } = useContext(DataContext);
  const [comment, setComment] = useState(initial);
  const [toggle, setToggle] = useState(false);
  const [comments, setComments] = useState([]);
  let navigate = useNavigate();

  const handleCommentData = (e) => {
    setComment({
      ...comment,
      name: name,
      username: username,
      date: new Date(),
      comments: e.target.value,
      postId: post._id,
    });
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) {
          setComments(response.data);
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
    if (post._id) {
      getComments();
    }
  }, [toggle, post]);

  const addComment = async () => {
    if (isAuthenticated) {
      try {
        await API.newComment(comment);
        setComment(initial);
        setToggle((prev) => !prev);
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      }
    } else {
      toast.warning("You need to Login first", {
        autoClose: 2000,
        position: "top-center",
      });
      navigate("/login");
    }
  };

  return (
    <div className="pb-8 flex flex-col items-start justify-center gap-3 w-full xl:px-16 px-4 dark:bg-[rgba(8,10,21,1)]">
      <div className="flex items-center justify-start gap-3 w-full">
        <FaUser className="text-xl text-[#7c4ee4]" />
        <div className="flex w-full items-center md:gap-10 gap-5 text-black">
          <textarea
            onChange={handleCommentData}
            name="comments"
            placeholder="Write a comment"
            rows="1"
            required={true}
            value={comment.comments}
            className="p-3 rounded-full xl:w-[50%] w-full focus:outline-none border-2 border-solid border-[#7c4ee4]"
          ></textarea>
          <IoMdSend
            className="text-2xl text-[#7c4ee4] cursor-pointer"
            onClick={addComment}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              comment={comment}
              setToggle={setToggle}
              key={comment._id}
            />
          ))
        ) : (
          <span className="text-lg font-bold">No comments posted yet</span>
        )}
      </div>
    </div>
  );
};

export default Comments;
