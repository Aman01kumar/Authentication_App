import { useState } from "react";
import { verifyUser } from "../../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;

  const [code, setCode] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await verifyUser({ username, code });

      alert("Account Verified Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        Verify OTP
      </h2>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          placeholder="Enter OTP Code"
          className="p-3 border rounded-xl"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="bg-purple-600 text-white py-3 rounded-xl">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyForm;
