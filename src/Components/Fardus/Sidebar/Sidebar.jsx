import { FaArrowTrendUp, FaCode } from "react-icons/fa6";
import { IoIosInformationCircleOutline, IoMdHome } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import PremiumLink from "../../Ruhul/PremiumLink";
import { PiChalkboardTeacher } from "react-icons/pi";
import { FaCodepen } from "react-icons/fa";

const Sidebar = ({ setOpenMenu, openMenu }) => {
  return (
    <aside onClick={()=>setOpenMenu(false)}
      className={`z-[100] scrollBar fixed flex flex-col w-64 xl:translate-x-0 ${
        openMenu
          ? "translate-x-0 duration-200 ease-in-out"
          : "translate-x-[-256px] duration-200 ease-in-out"
      } h-[calc(100vh-56px)] px-4 py-8 overflow-y-auto bg-white dark:bg-themeColor border-r dark:border-gray-700 rtl:border-r-0 rtl:border-l mt-[57px]`}>
      <div className="flex flex-col justify-between ">
        <nav className="space-y-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <IoMdHome className="text-lg" />
            <span className="mx-3 font-medium text-xs">Home</span>
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <FaArrowTrendUp className="text-lg" />
            <span className="mx-4 font-medium text-xs">Popular</span>
          </NavLink>

          <NavLink
            to="/following"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 duration-200 hover:bg-pm-color hover:text-white rounded-md ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <RiUserFollowFill className="text-lg" />
            <span className="mx-4 font-medium text-xs">Following</span>
          </NavLink>

          {/* <NavLink
            to="/all"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 duration-200 hover:bg-pm-color hover:text-white rounded-md ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <MdBarChart className="text-lg" />
            <span className="mx-4 font-medium text-xs">All</span>
          </NavLink> */}

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <NavLink
            to="/code-editor"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <FaCode className="" />
            <span className="mx-3 font-medium text-xs">DevStudio</span>
          </NavLink>
          <NavLink
            to="/code-web"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <FaCodepen />
            <span className="mx-3 font-medium text-xs">WebStudio</span>
          </NavLink>
          <NavLink
            to="/blogCard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <TfiWrite className="" />
            <span className="mx-3 font-medium text-xs">Blogs</span>
          </NavLink>
          <NavLink
            to="/ApplayforMentor"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <PiChalkboardTeacher className="" />
            <span className="mx-3 font-medium text-xs">Become A Mentor </span>
          </NavLink>
          <NavLink
            to="/leaderBoard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <MdBarChart className="" />
            <span className="mx-3 font-medium text-xs">Leaderboard</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white " : ""
              }`
            }>
            <IoIosInformationCircleOutline className="text-lg" />
            <span className="mx-3 font-medium text-xs">
              About
            </span>
          </NavLink>
          <hr className="my-6 pb-5 border-gray-200 dark:border-gray-700" />

          <PremiumLink></PremiumLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
