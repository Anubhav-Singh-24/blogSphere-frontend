import { useContext } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeProvider";

const ThemeSwitcher = () => {

    const {theme,darkMode,lightMode} = useContext(ThemeContext)

    const toggleTheme = ()=>{
        if (theme === "light") {
          darkMode();
        } else {
          lightMode();
        }
    }

  return (
    <div
      onClick={toggleTheme}
      className={`${
        theme === "light" ? "rotate-0" : "rotate-90"
      } transition-transform duration-300 ease-in-out`}
    >
      {theme === "light" ? (
        <BsFillMoonStarsFill size={25} className="text-[#7c4ee4]" />
      ) : (
        <IoSunnyOutline size={30} className="text-white" />
      )}
    </div>
  );
};

export default ThemeSwitcher;
