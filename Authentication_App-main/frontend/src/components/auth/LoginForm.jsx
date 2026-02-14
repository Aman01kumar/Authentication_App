import { useContext, useState } from "react";
import { loginUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {

      const res = await loginUser(form);

      console.log("Login Response:", res.data);

      const token = res?.data?.data?.token;

      if (!token) {
        alert("Token not received from backend!");
        return;
      }

      login(token);

      alert("Login Successful!");
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
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

    {/* Card Container */}
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">
        Sign in
      </h1>

      <form onSubmit={submit} className="space-y-6">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Enter email"
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-700
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="Enter password"
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 pr-12 text-slate-700
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            {/* Eye Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-600 transition"
              viewBox="0 0 24 24"
              onClick={() => setShowPassword(!showPassword)}
            >
              <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg
            hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Sign in
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default LoginForm;
