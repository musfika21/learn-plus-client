import { NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaHandsHelping,
  FaUserShield,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Theme from "../Theme/Theme";
import Logo from "../Logo/Logo";
import {useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../CustomHooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatarOpen, setAvatarOpen] = useState(false);

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
          <span className="text-primary">All Classes</span>
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
      setAvatarOpen(false);
    } catch (error) {
      toast.error("Logout failed. Try again!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-lg bg-primary/10 shadow-md px-3">
        <div className="navbar mx-auto">
          {/* Left */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-sm btn-ghost">
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
            <Logo />
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex items-center gap-2">
              {links}
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end flex items-center gap-3">
            <Theme />

            {/* User Avatar */}
            {user ? (
              <div className="relative">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                />
                {avatarOpen && (
                  <div className="absolute right-0 rounded-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary hover:btn-primary transition-all"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-secondary flex items-center gap-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;