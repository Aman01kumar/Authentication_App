import { useContext, useState } from "react";
import { loginUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    login(res.data.data.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
