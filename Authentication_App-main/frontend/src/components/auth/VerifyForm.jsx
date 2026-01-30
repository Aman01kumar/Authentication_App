import { useState } from "react";
import { verifyAccount } from "../../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const username = location.state?.username;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyAccount({ username, code });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        placeholder="6-digit code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button>Verify</button>
    </form>
  );
};

export default VerifyForm;
