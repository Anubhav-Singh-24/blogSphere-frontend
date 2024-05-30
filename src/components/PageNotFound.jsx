import React from 'react'
import { Link } from 'react-router-dom';
import pgErImg from '../assets/pgErr.png'

const PageNotFound = () => {
  return (
    <div className="lg:mt-32 mt-20 pb-20 px-20 flex flex-col justify-center items-center w-full h-full mx-auto">
      <div className="w-full flex items-center justify-center">
        <img src={pgErImg} alt="404" className="lg:w-[30%] w-full" />
      </div>
      <div className="flex flex-col gap-6 w-full text-[#502f9b] dark:text-white justify-center items-center text-center">
        <span className="lg:text-5xl text-3xl font-bold">
          Oops! Page Not Found
        </span>
        <span className="lg:text-xl font-bold">
          We’re sorry, but the page you’re looking for doesn’t exist.
        </span>
        <div className="lg:text-lg text-md font-semibold flex flex-col gap-2">
          <span>
            It might have been removed, had its name changed, or is temporarily
            unavailable.
          </span>
          <span>
            Check the URL make sure the address you entered is correct.
          </span>
        </div>
        <div className="flex w-full items-center justify-center">
          <Link to={"/"}>
            <button className="bg-[#502f9b] text-white font-bold px-5 py-3 rounded-full border-2 border-solid border-[#502f9b] hover:text-[#502f9b] hover:bg-white duration-300 ease-in-out dark:bg-[#7f57df] dark:hover:bg-white">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound
