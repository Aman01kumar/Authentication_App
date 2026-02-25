import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-6 space-y-4">

      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
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
  );
};

export default Sidebar;
