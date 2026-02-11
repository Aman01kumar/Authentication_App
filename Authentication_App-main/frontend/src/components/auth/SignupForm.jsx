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
    <div className="bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[600px] w-full">
          <div className="p-8">
            <h1 className="text-slate-900 text-4xl font-semibold mb-10">Sign up</h1>
            
            <form onSubmit={submit} className="space-y-7">
              {/* Username Input */}
              <div>
                <label className="text-slate-900 text-base font-normal mb-3 block">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full text-slate-600 text-base bg-slate-50 border-0 px-5 py-4 rounded-xl outline-none focus:ring-0 placeholder-slate-400"
                  placeholder="Enter Username"
                  maxLength={50}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="text-slate-900 text-base font-normal mb-3 block">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full text-slate-600 text-base bg-slate-50 border-0 px-5 py-4 rounded-xl outline-none focus:ring-0 placeholder-slate-400"
                  placeholder="Enter Email"
                  maxLength={30}
                  minLength={3}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="text-slate-900 text-base font-normal mb-3 block">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full text-slate-600 text-base bg-slate-50 border-0 px-5 py-4 rounded-xl outline-none focus:ring-0 placeholder-slate-400"
                  placeholder="Enter Password"
                  minLength={6}
                />
              </div>

              {/* Submit Button */}
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full py-4 px-4 text-base font-medium tracking-wide rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer transition-colors"
                >
                  Sign up
                </button>
              </div>

              {/* Sign in Link */}
              <p className="text-slate-900 text-base !mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-normal">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;