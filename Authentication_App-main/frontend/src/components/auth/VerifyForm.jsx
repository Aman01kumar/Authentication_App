import { useState, useEffect, useContext } from "react";
import { verifyUser, resendOTP } from "../../api/auth.api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const VerifyForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

    const { login } = useContext(AuthContext);


  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) navigate("/signup");
  }, [email, navigate]);

  useEffect(() => {

    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const submit = async (e) => {

    e.preventDefault();

    if (code.length !== 6) {
      return alert("Enter valid 6-digit OTP");
    }

    setLoading(true);

    try {

      const res = await verifyUser({ email, code });
      const token = res?.data?.data?.token;

      if (!token) {
        alert("Token not received from backend!");
        return;
      }

      //  Auto Login: Save token in AuthContext + LocalStorage
      login(token);

      alert("Account Verified & Logged In Successfully!");

      // Redirect directly to Dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {

    if (timer > 0) return;

    setResendLoading(true);

    try {
      await resendOTP({ email });

      alert("New OTP sent successfully!");
      setTimer(60);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

    {/* Card */}
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-3">
        Verify OTP
      </h1>

      {/* Subtext */}
      <p className="text-center text-sm text-slate-600 mb-8">
        Enter the 6-digit code sent to <br />
        <span className="font-semibold text-slate-800">{email}</span>
      </p>

      {/* OTP Form */}
      <form onSubmit={submit} className="space-y-6">

        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            OTP Code
          </label>

          <input
            type="text"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="w-full text-center text-2xl font-semibold
            rounded-xl bg-slate-50 border border-slate-200 px-4 py-3
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none
            placeholder:tracking-normal tracking-[0.35em]"
          />
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg
            hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>

        {/* Resend OTP Section */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-slate-500">
              Resend OTP in{" "}
              <span className="font-semibold text-blue-600">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-blue-600 font-medium hover:underline disabled:opacity-60"
            >
              {resendLoading ? "Sending OTP..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Links */}
        <p className="text-center text-sm text-slate-600">
          Wrong email?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup again
          </Link>
        </p>

        <p className="text-center text-sm text-slate-600">
          Already verified?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default VerifyForm;
