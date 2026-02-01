import { useState } from "react";
import { transferBalance } from "../../api/account.api";

const Transfer = () => {
  const [form, setForm] = useState({ to: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transferBalance({
        to: form.to,
        amount: Number(form.amount)
      });
      alert("Transfer successful");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Recipient UserId" onChange={(e) => setForm({ ...form, to: e.target.value })} />
      <input placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <button>Transfer</button>
    </form>
  );
};

export default Transfer;
