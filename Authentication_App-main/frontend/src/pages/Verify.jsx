import { useState, useEffect } from "react";
import { verifyUser } from "../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/signup"); // Redirect if no email is found in state
    }
  }, [username, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyUser({ username, code });
      alert("Account Verified Successfully!");
      navigate("/login", { state: { username } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Verification for</p>
        <p className="text-lg font-semibold text-purple-600">{username}</p>
      </div>
      
      <input
        placeholder="Enter 6-digit OTP"
        className="w-full p-4 border-2 border-gray-100 rounded-xl text-center text-2xl tracking-[0.5em] font-bold focus:border-green-500 outline-none transition"
        value={code}
        maxLength={6}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <button 
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-xl disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Confirm Code"}
      </button>
    </form>
  );
};

export default VerifyForm;