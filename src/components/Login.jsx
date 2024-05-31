import loginImg from "../assets/login.svg";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLockOpen } from "react-icons/fa";
import { useContext, useState } from "react";
import { API } from "../service/api";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";

const Login = ({setAuthentication}) => {
  const initalValues = {
    email: "",
    password: "",
  };

  let navigate = useNavigate();
  const { setUserName, setName } = useContext(DataContext);
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState(initalValues);
  const [load,setLoad] = useState(false)

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true)
      const response = await API.userLogin(login);
      if (response.isSuccess) {
        toast.success(`Welcome back ${response.data.name}!!`, {
          autoClose: 2000,
          position: "top-center",
        });
        localStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        setName(response.data.name);
        setUserName(response.data.username);
        setAuthentication(true)
        setLoad(false)
        navigate('/myposts')
      }
      setLogin(initalValues);
    } catch (error) {
      error.then((innerError) => {
        toast.error(innerError.msg, {
          autoClose: 2000,
          position: "top-center",
        });
      });
      setLogin(initalValues);
    }
  };

  return (
    <div className="flex xl:flex-row flex-col gap-5 items-center justify-center w-full lg:mt-20 py-20 dark:bg-[rgba(8,10,21,1)]">
      <div className="md:w-[50%] w-[70%] flex justify-center items-center">
        <img src={loginImg} alt="login" className="xl:w-[70%] w-full" />
      </div>
      <div className="md:w-[50%] w-[90%] flex justify-center items-center">
        <div className="shadow-md shadow-[#7c4ee4] rounded-lg xl:w-[70%] w-full mx-auto flex flex-col items-center justify-center gap-8 py-6">
          <div className="flex flex-col items-center dark:text-white">
            <span className="xl:text-xl text-lg font-bold">Welcome to</span>
            <span className="xl:text-3xl text-2xl font-bold text-[#7c4ee4]">
              BlogSphere!!
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 xl:w-[80%] w-[90%] mr-3"
          >
            <div className="flex items-center text-black">
              <MdEmail size={20} className="relative left-6" />
              <input
                type="email"
                name="email"
                required={true}
                placeholder="Email"
                onChange={handleChange}
                value={login.email}
                className="w-full py-3 px-8 border-y-2 border-[#7c4ee4] rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center text-black">
              <div
                className="relative left-6 cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <FaLockOpen /> : <FaLock />}
              </div>
              <input
                type={toggle ? "text" : "password"}
                required={true}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={login.password}
                className="w-full py-3 border-y-2 border-[#7c4ee4] rounded-md px-8 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-center ml-5">
              <button
              disabled={load}
                type="submit"
                className="w-full bg-[#7c4ee4] hover:bg-[#5c3bab] transition duration-300 ease-in-out text-white font-bold text-md px-4 py-3 rounded-lg"
              >
                {load?'Logging In...':'Login'}
              </button>
            </div>
          </form>
          <div className="text-md flex md:flex-row flex-col items-center justify-center gap-2">
            <span className="dark:text-white">Don't have an account ?</span>
            <span
              className="text-[#7c4ee4] hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
