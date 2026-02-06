import { useState } from "react";
import { signupUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);

      alert("Signup successful! OTP sent.");

      navigate("/verify", { state: { username: form.username } });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

      <form onSubmit={submit} className="flex flex-col gap-4">

        <input
          placeholder="Email (Username)"
          className="p-3 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="First Name"
          className="p-3 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="Last Name"
          className="p-3 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-green-600 text-white py-3 rounded-xl">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
