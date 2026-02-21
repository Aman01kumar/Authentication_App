import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAccount } from "../../api/account.api";

const LandingPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await getAccount();
        setBalance(res.data.data.balance);
      } catch (err) {
        console.log("Balance Fetch Failed:", err);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-gray-600">
          Loading user profile...
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => user?.username || "User";
  const getEmail = () => user?.email || "user@example.com";

  const notifications = [
    { id: 1, text: "New transfer received: ₹500", time: "5 min ago", unread: true },
    { id: 2, text: "Monthly statement is ready", time: "2 hours ago", unread: true },
    { id: 3, text: "Security update completed", time: "1 day ago", unread: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex justify-end items-center gap-4">

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-3 hover:bg-white rounded-xl transition-all"
            >
              🔔
              {notifications.filter((n) => n.unread).length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">
                <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <h3 className="font-bold text-lg">Notifications</h3>
                </div>

                <div>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium">{notif.text}</p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 pr-4 hover:bg-white rounded-xl transition-all"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {getInitials()}
              </div>

              {/* Name */}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold">{getDisplayName()}</p>
                <p className="text-xs text-gray-500">{getEmail()}</p>
              </div>

              ⬇️
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border overflow-hidden z-50">

                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <p className="font-bold">{getDisplayName()}</p>
                  <p className="text-xs text-indigo-100">Premium Member</p>
                </div>

                {/* Menu Options */}
                <div className="p-2">

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    👤 My Profile
                  </button>

                  <button
                    onClick={() => navigate("/balance")}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    💰 Account Balance
                  </button>

                  <button
                    onClick={() => navigate("/files")}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    📂 Upload Files
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    ⚙️ Settings
                  </button>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 rounded-lg hover:bg-red-50 text-red-600 font-semibold"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Financial Hub
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Transfer funds, track balance, and upload files securely.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/balance")}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/files")}
            className="bg-white border px-8 py-4 rounded-xl font-semibold"
          >
            Upload Files
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p>Total Balance</p>
            <p className="text-3xl font-bold mt-2">
              {loadingBalance ? "Loading..." : `₹${balance}`}
            </p>
            <p className="text-green-600 mt-2">Live Account Balance</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p>Transactions</p>
            <p className="text-3xl font-bold mt-2">2,547</p>
            <p className="text-blue-600 mt-2">156 this week</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p>Documents</p>
            <p className="text-3xl font-bold mt-2">847</p>
            <p className="text-purple-600 mt-2">All secured</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
