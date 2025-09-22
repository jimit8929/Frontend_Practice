import { NavLink } from "react-router-dom";
import Logo from "../../public/vite.svg";

const Navbar = () => {
  return (
    <nav className="bg-emerald-200 w-full px-4">
      <div className="flex p-10 items-center justify-between text-black font-bold">
        <div className="left">
          <img
            src={Logo}
            alt="Vite-Logo"
            className="cursor-pointer hover:scale-110 transition-all duration-500 h-10 w-10"
          />
        </div>

        <div className="right flex gap-4 items-center">
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "underline text-emerald-700"
                  : "hover:underline hover:scale-105"
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "underline text-emerald-700"
                  : "hover:underline hover:scale-105"
              }`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/features"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "underline text-emerald-700"
                  : "hover:underline hover:scale-105"
              }`
            }
          >
            Features
          </NavLink>

          <NavLink
            to="/github"
            className={({ isActive }) =>
              `transition-all duration-300 ${
                isActive
                  ? "underline text-emerald-700"
                  : "hover:underline hover:scale-105"
              }`
            }
          >
            Github
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
