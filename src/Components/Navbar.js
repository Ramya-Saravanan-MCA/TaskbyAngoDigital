import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
      <nav className="flex justify-center bg-gradient-to-r from-plum-700 to-plum-500 text-white p-4">
        <h1 className="font-extrabold text-2xl">ANGODIGITAL</h1>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-plum-700 to-plum-500 text-white shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <h1 className="font-extrabold text-xl sm:text-2xl">ANGODIGITAL</h1>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `relative text-lg ${
                isActive ? "font-semibold underline" : "hover:text-gray-200"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-lg ${
                isActive ? "font-semibold underline" : "hover:text-gray-200"
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

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `relative text-lg transition duration-200 ${
                isActive
                  ? "font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white"
                  : "hover:text-gray-200"
              }`
            }
          >
            Favorites
          </NavLink>


          <button
            onClick={handleLogout}
            className="bg-white text-plum-700 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-md"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-plum-600">
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `relative text-lg ${
                isActive ? "font-semibold underline" : "hover:text-gray-200"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `relative text-lg ${
                isActive ? "font-semibold underline" : "hover:text-gray-200"
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

          <NavLink
            to="/favorites"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `relative text-lg ${
                isActive ? "font-semibold underline" : "hover:text-gray-200"
              }`
            }
          >
            Favorites
          </NavLink>

          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="bg-white text-plum-700 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
