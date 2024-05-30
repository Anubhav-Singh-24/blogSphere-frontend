import { useRef } from 'react'
import { API } from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const DeleteConf = ({onClose,id}) => {

    let ref = useRef();
    
    const closeModal = (e)=>{
        if(ref.current === e.target){
            onClose();
        }
    }

    let navigate = useNavigate();

    const deleteBlogPost = async () => {
      try {
        const response = await API.deletePost(id);
        if (response.isSuccess) {
          toast.success(response.data.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        }
        onClose();
        navigate('/myposts')
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      }
    };

  return (
    <div ref={ref} onClick={closeModal} className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 backdrop-blur-lg z-50">
      <div className="bg-[#7c4ee4] p-8 rounded-lg flex flex-col gap-4 items-center justify-center">
        <span className='text-white font-bold text-lg'>Are you sure you want to delete?</span>
        <div className="flex justify-center items-center gap-5 font-bold">
          <button
            className="mr-4 px-4 py-2 bg-white text-[#7c4ee4] duration-300 ease-in-out hover:text-green-400 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-white text-[#7c4ee4] duration-300 ease-in-out hover:text-red-600 rounded"
            onClick={deleteBlogPost}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConf
