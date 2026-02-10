import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-white text-indigo-700"
        : "text-white hover:bg-indigo-500"
    }`;

  return (
    <div className="w-full bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          Auth Dashboard
        </h1>

        {/* Navigation */}
        <div className="flex gap-4">
          <NavLink to="/dashboard" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/balance" className={linkClass}>
            Balance
          </NavLink>

          <NavLink to="/transfer" className={linkClass}>
            Transfer
          </NavLink>

          <NavLink to="/files" className={linkClass}>
            Files
          </NavLink>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
