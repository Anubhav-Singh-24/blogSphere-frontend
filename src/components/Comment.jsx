import { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { DataContext } from "../context/DataProvider";
import { MdDelete } from "react-icons/md";
import { API } from "../service/api";
import { toast } from "react-toastify";

const Comment = ({comment, setToggle}) => {

    const {username} = useContext(DataContext)

    const deleteUserComment = async()=>{
      try {
        await API.deleteComment(comment._id);
        setToggle((prev) => !prev);
      } catch (error) {
        error.then((innerError)=>{
          toast.error(innerError.msg,{
            autoClose:2000,
            position:'top-center'
          })
        })
      }
    }

  return (
    <div className="flex justify-start items-center gap-3 dark:bg-[rgba(8,10,21,1)] dark:text-white">
      <FaUserAlt className="text-3xl" />
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center justify-start gap-7">
          <span className="font-bold">{comment.name}</span>
          <span className="text-gray-500 dark:text-white font-semibold">
            {new Date(comment.date).toDateString()}
          </span>
        </div>
        <div className="flex gap-3 items-center justify-between w-full">
          <span>{comment.comments}</span>
          {comment.username === username && (
            <MdDelete
              onClick={deleteUserComment}
              className="text-lg hover:text-red-600 duration-300 ease-in-out cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
