import { useState } from "react";
import { signupUser } from "../../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);

      alert("Signup successful! OTP sent.");

      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
    
    {/* Card Container */}
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">
        Sign up
      </h1>

      <form onSubmit={submit} className="space-y-6">

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Username
          </label>
          <input
            type="text"
            required
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            placeholder="Enter username"
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-700
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

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
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Enter password"
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-700
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg
            hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Sign up
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default SignupForm;