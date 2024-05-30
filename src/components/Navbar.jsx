import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { MdOutlineSegment } from "react-icons/md";
import { GiCrossedBones } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { toast } from "react-toastify";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = ({ isAuthenticated, setAuthentication }) => {
  const [open, setOpen] = useState(false);
  const { name, setName, setUserName } = useContext(DataContext);
  const [dark,setDark] = useState(false)

  const navigate = useNavigate();

  const logOut = () => {
    setName({ name: "" });
    setUserName({ username: "" });
    localStorage.removeItem("accessToken");
    setAuthentication(false);
    toast.success("Logged Out Successfully!!", {
      autoClose: 2000,
      position: "top-center",
    });
    navigate('/login')
  };

  return (
    <div className="w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white dark:bg-[rgba(8,10,21,1)] md:px-5 px-7">
        <NavLink
          to={"/"}
          className="cursor-pointer flex items-center gap-1 md:w-[8vw] w-[15vw]"
        >
          <img src={logo} alt="logo" className="w-full md:static relative" />
        </NavLink>
        {/* Menu icon */}
        <div
          className="absolute right-20 top-6 cursor-pointer md:hidden"
        >
          <ThemeSwitcher/>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className={`absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-[#7c4ee4] dark:text-white transition-transform duration-300 ease-in-out ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          {open ? <GiCrossedBones size={25} /> : <MdOutlineSegment size={25} />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 py-7 absolute md:static bg-white dark:bg-[rgba(8,10,21,1)] left-0 w-full md:z-auto z-[-1] md:w-auto md:pl-0 pl-9 text-sm ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <div
            onClick={() => setDark(!dark)}
            className="cursor-pointer hidden sm:block"
          >
            <ThemeSwitcher/>
          </div>
          <li className="md:ml-8 md:my-0 my-5 font-bold cursor-pointer">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-[#7c4ee4] underline"
                    : "text-gray-400 hover:text-[#7c4ee4] duration-300 "
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li className="md:ml-8 md:my-0 my-5 font-bold cursor-pointer">
            <NavLink
              to={isAuthenticated ? "/myposts" : "/login"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-[#7c4ee4] underline"
                    : "text-gray-400 hover:text-[#7c4ee4] duration-300 "
                }`
              }
            >
              {isAuthenticated ? `${name.split(" ")[0]}'s blog` : "Login"}
            </NavLink>
          </li>
          <NavLink to={isAuthenticated ? null : "/signup"}>
            <button
              onClick={isAuthenticated ? logOut : null}
              className="btn bg-[#7c4ee4] text-white md:ml-8 font-semibold md:px-4 md:py-3 px-3 py-2 rounded-xl hover:bg-[#5c3bab] duration-500 md:static"
            >
              {isAuthenticated ? "Logout" : "Signup"}
            </button>
          </NavLink>
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Navbar;
