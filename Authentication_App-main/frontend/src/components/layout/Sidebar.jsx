import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-indigo-700">
        Menu
      </h2>

      <Link to="/dashboard" className="block hover:text-indigo-600">
        Dashboard
      </Link>

      <Link to="/balance" className="block hover:text-indigo-600">
        Balance
      </Link>

      <Link to="/transfer" className="block hover:text-indigo-600">
        Transfer
      </Link>

      <Link to="/files" className="block hover:text-indigo-600">
        Files
      </Link>
    </div>
  );
};

export default Sidebar;
