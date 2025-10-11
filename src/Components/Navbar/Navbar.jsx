import { NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaHandsHelping,
  FaUserShield,
  FaInfoCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import Theme from "../Theme/Theme";
import Logo from "../Logo/Logo";
import { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";

const Navbar = () => {
  const {user} = useAuth();
  console.log(user)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);  
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    setSidebarOpen(false);
  };

  const NavLinks = () => (
    <>
      <li className="text-lg flex items-center space-x-2">
        <NavLink to="/" className="relative inline-block group px-1 py-0.5">
          {({ isActive }) => (
            <span className={`relative text-sm inline-block hover:text-secondary ${isActive ? 'text-secondary font-semibold' : 'text-primary'}`}>
              <FaHome className="inline mr-2" />
              Home
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0'
                } group-hover:w-full`}
              ></span>
            </span>
          )}
        </NavLink>
      </li>

      <li className="text-lg flex items-center space-x-2">
        <NavLink to="/allDonations" className="relative inline-block group px-1 py-0.5">
          {({ isActive }) => (
            <span className={`relative text-sm inline-block hover:text-secondary ${isActive ? 'text-secondary font-semibold' : 'text-primary'}`}>
              <FaHandsHelping className="inline mr-2" />
              All Classes
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0'
                } group-hover:w-full`}
              ></span>
            </span>
          )}
        </NavLink>
      </li>

      {user && (
        <li className="text-lg flex items-center space-x-2">
          <NavLink to="/dashBoard" className="relative inline-block group px-1 py-0.5">
            {({ isActive }) => (
              <span className={`relative text-sm inline-block hover:text-secondary ${isActive ? 'text-secondary font-semibold' : 'text-primary'}`}>
                <FaUserShield className="inline mr-2" />
                Dashboard
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  } group-hover:w-full`}
                ></span>
              </span>
            )}
          </NavLink>
        </li>
      )}

      <li className="text-lg flex items-center space-x-2">
        <NavLink to="/comingSoon" className="relative inline-block group px-1 py-0.5">
          {({ isActive }) => (
            <span className={`relative text-sm inline-block hover:text-secondary ${isActive ? 'text-secondary font-semibold' : 'text-primary'}`}>
              <FaInfoCircle className="inline mr-2" />
              About Us
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0'
                } group-hover:w-full`}
              ></span>
            </span>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg border-b border-primary/10 bg-neutral/40 shadow-md">
        <nav className="flex justify-between w-11/12 mx-auto items-center py-3">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            {/* RESPONSIVE NAVBAR LINKS BY MENU ICON */}
            <div className="flex gap-2" onClick={() => setOpen(!open)}>
              {open ? (
                <IoCloseSharp className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-secondary cursor-pointer" />
              ) : (
                <HiMenu className="lg:hidden h-5 w-5 md:w-7 md:h-7 text-secondary cursor-pointer" />
              )}

              <ul
                className={`lg:hidden absolute space-y-3 left-1/2 transform -translate-x-1/2 duration-300 ease-in-out transition-all font-semibold bg-base-100 rounded-md shadow-lg w-11/12 p-6 backdrop-blur-lg z-50
                ${open ? "top-16 md:top-17 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
              `}
              >
                <NavLinks />
              </ul>
            </div>
            <Logo />
          </div>

          {/* NAVBAR LINKS */}
          <div className="hidden lg:flex">
            <ul className="flex lg:gap-4 xl:gap-8">
              <NavLinks />
            </ul>
          </div>

          {/* LOGIN/REGISTER & THEME */}
          <div className="flex items-center gap-3">
            <Theme />
            
            {user ? (
              <div className="relative cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {user?.photoURL ? (
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full border-2 border-secondary"
                    src={user?.photoURL}
                    alt="profile picture"
                  />
                ) : (
                  <IoPersonCircleOutline className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-15 lg:h-15 text-secondary" />
                )}
                
                <div
                  className={`absolute space-y-3 right-0 transform duration-300 ease-in-out transition-all font-semibold bg-base-100 rounded-md shadow-lg w-48 p-4 backdrop-blur-lg z-50
                  ${sidebarOpen ? "top-16 md:top-19 lg:top-21 opacity-100 scale-100" : "top-10 opacity-0 scale-90 pointer-events-none"}
                  `}
                >
                  <p className="text-center text-primary font-semibold border-b border-primary/10 pb-2">
                    {user?.name || user?.displayName}
                  </p>
                  <button
                    className="bg-secondary text-base text-white p-2 rounded-md hover:bg-secondary/80 transition-all cursor-pointer w-full flex items-center justify-center gap-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-secondary text-base px-6 py-2 rounded-md text-white hover:bg-secondary/80 transition-all cursor-pointer flex items-center gap-2"
                onClick={() => navigate("/register")}
              >
                <FaUser />
                Register
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;