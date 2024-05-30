import { FaArrowCircleUp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Footer = ({isAuthenticated}) => {

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };


  return (
    <div className="mt-auto w-full bg-[#7c4ee4] p-5">
      <div className="flex flex-col gap-5 justify-center items-center text-white">
        <FaArrowCircleUp size={30} onClick={scrollToTop} className="cursor-pointer"/>
        <div className="flex gap-14 font-bold">
          <NavLink to={'/'}>
            Home
          </NavLink>
          <NavLink to={'/about'}>
            About Us
          </NavLink>
          <NavLink to={isAuthenticated ? '/myposts': '/login'}>
            {isAuthenticated ? 'My Blogs' : 'Login'}
          </NavLink>
        </div>
        <div className="flex gap-7">
            <NavLink to={"mailto:anubhavsingh.2406@gmail.com"}>
            <BiLogoGmail size={30}/>
            </NavLink>
            <NavLink to={"https://github.com/Anubhav-Singh-24"} target="__blank">
            <FaSquareGithub size={30}/>
            </NavLink>
            <NavLink to={"https://linkedin.com/in/anbhv-singh"} target="__blank">
            <IoLogoLinkedin size={30}/>
            </NavLink>
        </div>
        <div className="flex items-center justify-center">
            <span>BlogSphere &copy; 2024 | All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
