import signupImg from "../assets/signup.png";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { API } from "../service/api";

const Signup = () => {
  const initalValues = {
    name:"",
    email: "",
    password: "",
  };
  const [signup, setSignup] = useState(initalValues);
  const [load,setLoad] = useState(false)

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoad(true)
      const response = await API.userSignup(signup);
      if (response.isSuccess) {
        toast.success(response.data.msg, {
          autoClose: 2000,
          position: "top-center",
        });
        setSignup(initalValues);
        setLoad(false)
        navigate('/login')
      }
    } catch (error) {
      error.then((innerError) => {
        toast.error(innerError.msg, {
          autoClose: 2000,
          position: "top-center",
        });
      });
      setSignup(initalValues);
    }
  }

  return (
    <div className="flex xl:flex-row flex-col gap-5 items-center justify-center w-full lg:mt-20 py-20 dark:bg-[rgba(8,10,21,1)]">
      <div className="md:w-[50%] w-[70%] flex justify-center items-center">
        <img src={signupImg} alt="login" className="md:w-[70%] w-full" />
      </div>
      <div className="md:w-[50%] w-[90%] flex justify-center items-center">
        <div className="shadow-md shadow-[#7c4ee4] rounded-lg md:w-[70%] w-full mx-5 flex flex-col items-center justify-center gap-8 py-6">
          <div className="flex flex-col items-center dark:text-white">
            <span className="xl:text-xl text-lg font-bold ">Welcome to</span>
            <span className="xl:text-3xl text-2xl font-bold text-[#7c4ee4]">
              BlogSphere!!
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 xl:w-[80%] w-[90%] mr-3"
          >
            <div className="flex items-center text-black">
              <FaUserAlt size={15} className="relative left-6" />
              <input
                required={true}
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={signup.name}
                className="w-full py-3 px-8 border-y-2 border-[#7c4ee4] rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center text-black">
              <MdEmail size={15} className="relative left-6" />
              <input
                required={true}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={signup.email}
                className="w-full py-3 px-8 border-y-2 border-[#7c4ee4] rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center text-black">
              <div
                className="relative left-6 cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <FaLockOpen size={13} /> : <FaLock size={13} />}
              </div>
              <input
                required={true}
                type={toggle ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={signup.password}
                className="w-full py-3 border-y-2 border-[#7c4ee4] rounded-md px-8 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-center ml-5">
              <button
                type="submit"
                disabled={load}
                className="w-full bg-[#7c4ee4] hover:bg-[#5c3bab] transition duration-300 ease-in-out text-white font-bold text-md px-4 py-3 rounded-lg"
              >
                {load ? 'Signing Up...':'Signup'}
              </button>
            </div>
          </form>
          <div className="text-md flex md:flex-row flex-col items-center justify-center gap-2">
            <span className="dark:text-white">Already have an account ?</span>
            <span
              className="text-[#7c4ee4] hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
