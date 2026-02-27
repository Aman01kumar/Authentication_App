import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAccount } from "../../api/account.api";

const LandingPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

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
              className="relative p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-md"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              {notifications.filter((n) => n.unread).length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <h3 className="font-bold text-lg">Notifications</h3>
                  <p className="text-sm text-indigo-100">
                    {notifications.filter((n) => n.unread).length} unread
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notif.unread ? "bg-indigo-50/50" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-900 font-medium">
                        {notif.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-2 pr-4 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200 hover:shadow-md"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {getInitials()}
              </div>

              {/* Name + Email */}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-500">{getEmail()}</p>
              </div>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <button
                  onClick={handleLogout}
                  className="w-full p-4 text-red-600 font-semibold hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {" "}
              Financial Hub
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Manage your finances with confidence. Transfer funds, track your
            balance, and organize your documents all in one secure place.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/balance")}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/transfer")}
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-200"
            >
              Make Transfer
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Balance */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <p className="text-sm text-gray-500">Total Balance</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loadingBalance ? "Loading..." : `₹${balance}`}
            </p>

            <p className="text-green-600 text-sm mt-2">
              Live Account Balance
            </p>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <p className="text-sm text-gray-500">Transactions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">2,547</p>
            <p className="text-blue-600 text-sm mt-2">156 this week</p>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <p className="text-sm text-gray-500">Documents</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">847</p>
            <p className="text-purple-600 text-sm mt-2">All secured</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
