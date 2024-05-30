import { useContext, useEffect, useState } from 'react'
import homeBanner from '../assets/homeBanner (2).jpg'
import { DataContext } from '../context/DataProvider'
import { HiMiniPencilSquare } from "react-icons/hi2";
import Posts from './Posts';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../service/api';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Home = () => {

  let navigate = useNavigate();

  const [userPosts,setUserPosts] = useState([]);

  const {name} = useContext(DataContext)

  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const response = await API.getAllUserPosts()
        if(response.isSuccess){
          setUserPosts(response.data);
        }
      } catch (error) {
        error.then((innerError)=>{
          toast.error(innerError.msg,{
            autoClose:2000,
            position:"top-center"
          })
        })
      }
    }
    fetchPosts();
  },[])

  return (
    <div className="mt-32 flex flex-col">
      <div className="flex">
        <div className="w-[90%] mx-auto flex items-center justify-center lg:h-[65vh] md:h-[45vh] sm:h-[35vh] h-[25vh]">
          <img src={homeBanner} alt="" className="w-full h-full rounded-lg " />
          <div className="flex flex-col lg:items-end lg:justify-end items-center justify-center w-[85%] backdrop-blur-sm absolute rounded-lg lg:h-[50%] md:h-[40%] sm:h-[30%] h-[20%] gap-5 p-5">
            <span className="text-white font-bold lg:text-3xl text-xl">
              {name}
            </span>
            <button
              onClick={() => navigate("/editor")}
              className="bg-transparent text-white font-bold lg:text-lg text-sm flex gap-2 items-center justify-center px-4 py-2 border-2 border-solid border-white rounded-lg hover:bg-white hover:text-black duration-500 ease-in-out"
            >
              Create Blog
              <HiMiniPencilSquare />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 pb-14 mt-10 dark:bg-[rgba(8,10,21,1)] dark:text-white">
        <div className="flex w-full justify-center items-center">
          <span className="text-2xl font-bold">Your Posts</span>
        </div>
        {userPosts.length === 0 ? (
          <Loader />
        ) : (
          <div
            className={`${
              userPosts && userPosts.length > 0
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto px-7"
                : "flex justify-center items-center"
            }`}
          >
            {userPosts && userPosts.length > 0 ? (
              userPosts.map((post) => (
                <Link to={`/detail/${post._id}`} key={post._id}>
                  <Posts post={post} key={post._id} />
                </Link>
              ))
            ) : (
              <span className="text-xl font-bold">
                You haven't posted any blog yet
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home
