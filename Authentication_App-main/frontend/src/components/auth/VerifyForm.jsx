import { useState, useEffect } from "react";
import { verifyUser, resendOTP } from "../../api/auth.api";
import { useLocation, useNavigate, Link } from "react-router-dom";



const VerifyForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

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

      await verifyUser({ email, code });

      alert("Account Verified Successfully!");
      navigate("/login");
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
    <div className="lg:min-h-screen flex flex-col items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        <div>
          <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 leading-tight">
            Verify Your Account Securely
          </h1>

          <p className="text-[15px] mt-6 text-slate-600 leading-relaxed">
            We have sent a 6-digit OTP verification code to your email.
            Please enter the code below to activate your account.
          </p>

          <p className="text-[15px] mt-6 lg:mt-12 text-slate-600">
            Wrong email?
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Signup again
            </Link>
          </p>
        </div>

        <form
          onSubmit={submit}
          className="max-w-md lg:ml-auto w-full bg-white shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-slate-900 text-3xl font-semibold mb-2">
            Verify OTP
          </h2>

          <p className="text-sm text-slate-500 mb-8">
            OTP sent to:{" "}
            <span className="font-medium text-slate-800">{email}</span>
          </p>

          <label className="text-sm text-slate-900 font-medium mb-2 block">
            Enter OTP Code
          </label>

          <input
            type="text"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="bg-slate-100 w-full text-center tracking-[0.4em] text-xl font-bold text-slate-900 px-4 py-3 rounded-md border border-gray-200 focus:border-blue-600 outline-none"
          />

          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP available in{" "}
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

          <p className="text-sm text-slate-600 mt-6 text-center">
            Already verified?
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
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
