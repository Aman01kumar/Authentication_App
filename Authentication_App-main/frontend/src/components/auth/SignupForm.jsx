import { useState } from "react";
import { signup } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      navigate("/verify", { state: { username: form.username } });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <button disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
    </form>
  );
};

export default SignupForm;
