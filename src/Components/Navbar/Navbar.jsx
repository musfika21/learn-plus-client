import { NavLink } from "react-router";
import {
  FaHome,
  FaHandsHelping,
  FaUserShield,
  FaInfoCircle,
} from "react-icons/fa";
import Theme from "./Theme/Theme";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 text-lg font-medium transition-all duration-300 ${
      isActive ? "underline" : ""
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          <FaHome className="text-secondary text-xl" />
          <span className="text-primary">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/allDonations" className={linkClass}>
          <FaHandsHelping className="text-secondary text-xl" />
          <span className="text-primary">All Donations</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashBoard" className={linkClass}>
          <FaUserShield className="text-secondary text-xl" />
          <span className="text-primary">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/comingSoon" className={linkClass}>
          <FaInfoCircle className="text-secondary text-xl" />
          <span className="text-primary">About Us</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg border-b border-primary/10 bg-neutral/40 shadow-md">
        <div className="navbar mx-auto">
          {/* Left */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-56 absolute z-50"
              >
                {links}
              </ul>
            </div>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex items-center gap-2">
              {links}
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end flex items-center gap-3">
            <Theme></Theme>
          </div>
        </div>
      </div>

      {/* To offset the fixed navbar height */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
