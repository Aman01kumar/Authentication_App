import { useEffect, useState } from "react";
import { getProfile } from "../api/user.api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Welcome {user?.username}
      </h1>
      <p className="text-gray-600 mt-2">{user?.email}</p>
    </div>
  );
};

export default Dashboard;
