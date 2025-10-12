import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { FiHome, FiPackage, FiCreditCard } from "react-icons/fi";
import Logo from "../Components/Logo/Logo";
import DashBoardWrapper from "../Components/DashBoardWrapper/DashBoardWrapper";
import Loading2 from "../Components/Loading/Loading2"; // import your loading component

const DashLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or replace with real async fetching
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 sec
    return () => clearTimeout(timer);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 rounded-md transition-all duration-200
     ${
       isActive
         ? "bg-primary text-neutral font-semibold"
         : "text-primary hover:text-info"
     }`;

  const iconClasses = ({ isActive }) =>
    `${isActive ? "text-neutral" : "text-secondary"}`;

  if (loading) return <Loading2 />; // show loading screen while loading

  return (
    <DashBoardWrapper>
      <div className="max-w-screen-xl mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content min-h-screen flex flex-col ">
            {/* Mobile Navbar */}
            <div className="navbar bg-accent w-full lg:hidden">
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2 flex items-center justify-between">
                <h2 className="text-primary text-2xl font-semibold">
                  DashBoard
                </h2>
                <Logo />
              </div>
            </div>

            {/* Page Content */}
            <Outlet />
          </div>

          {/* Sidebar */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu bg-accent text-primary font-bold min-h-full w-80 p-4 space-y-2">
              {/* Logo */}
              <li>
                <Logo />
              </li>

              {/* Common Links */}
              <li>
                <NavLink to="/" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiHome className={iconClasses({ isActive })} />
                      Back to Home
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiHome className={iconClasses({ isActive })} />
                      Dashboard
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addClass" className={navLinkClasses}>
                  {({ isActive }) => (
                    <>
                      <FiPackage className={iconClasses({ isActive })} />
                      Add Class
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <FiCreditCard className={iconClasses({ isActive })} />
                      Payment History
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashBoardWrapper>
  );
};

export default DashLayout;
