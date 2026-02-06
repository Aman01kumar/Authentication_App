import { useContext, useState } from "react";
import { loginUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Backend expects username + password
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // ✅ Submit Handler
  const submit = async (e) => {
    e.preventDefault();

    try {
      // API Call
      const res = await loginUser(form);

      console.log("Login Response:", res.data);

      // ✅ Token comes inside res.data.data.token
      const token = res?.data?.data?.token;

      if (!token) {
        alert("Token not received from backend!");
        return;
      }

      // ✅ Save token globally (AuthProvider handles localStorage)
      login(token);

      alert("Login Successful!");

      // ✅ Redirect
      navigate("/dashboard");
    } catch (err) {
      console.log("Login Failed:", err);

      alert(
        err.response?.data?.message ||
          "Login failed. Please check credentials."
      );
    }
  };

  return (
    // ✅ Full Page Background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 px-4">
      
      {/* ✅ Glass Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-10 border border-white/30">

        {/* ✅ Title */}
        <h2 className="text-4xl font-bold text-center text-white">
          Login
        </h2>

        <p className="text-center text-white/70 mt-2">
          Welcome back! Please enter your details.
        </p>

        {/* ✅ Form */}
        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">

          {/* Username */}
          <input
            type="email"
            value={form.username}
            placeholder="Enter Email"
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 
            outline-none focus:ring-2 focus:ring-white transition"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          {/* Password */}
          <input
            type="password"
            value={form.password}
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 
            outline-none focus:ring-2 focus:ring-white transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-purple-700 font-semibold text-lg
            hover:scale-[1.03] hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-white text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
