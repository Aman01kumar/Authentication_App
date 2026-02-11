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
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <Link to="/">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </Link>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h1>

            <form onSubmit={submit} className="mt-12 space-y-6">

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>

                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104z" />
                  </svg>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign in
                </button>
              </div>

              <p className="text-slate-900 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline ml-1 font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
