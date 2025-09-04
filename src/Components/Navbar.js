import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (location.pathname === "/login" || !isLoggedIn) {
    return (
      <nav className="sticky top-0 z-50 flex justify-center bg-gradient-to-r from-plum-700 to-plum-500 text-white p-4 shadow-md">
        <h1 className="font-extrabold text-2xl tracking-wide">ANGODIGITAL</h1>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center bg-gradient-to-r from-plum-700 to-plum-500 text-white px-8 py-4 shadow-lg backdrop-blur-md bg-opacity-90">
      <h1 className="font-extrabold text-2xl tracking-wide">ANGODIGITAL</h1>

      <div className="flex space-x-8 items-center">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `relative text-lg transition duration-200 ${
              isActive
                ? "font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white"
                : "hover:text-gray-200"
            }`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative text-lg transition duration-200 ${
              isActive
                ? "font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white"
                : "hover:text-gray-200"
            }`
          }
        >
          Cart
          {cartCount > 0 && (
            <span className="ml-2 bg-white text-plum-700 text-sm font-bold px-2 py-0.5 rounded-full shadow-sm">
              {cartCount}
            </span>
          )}
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-white text-plum-700 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
