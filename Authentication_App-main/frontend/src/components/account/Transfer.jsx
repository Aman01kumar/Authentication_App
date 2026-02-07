import { useState } from "react";
import { transferBalance } from "../../api/account.api";

const Transfer = ({ refresh }) => {
  const [form, setForm] = useState({
    to: "",
    amount: "",
  });

  const handleTransfer = async () => {
    try {

      const payload = {
        to: form.to,
        amount: Number(form.amount),
      };

      await transferBalance(payload);
      alert("Transfer Successful!");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Transfer Failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">
        Transfer Money
      </h2>

      <input
        placeholder="Recipient User ID"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) =>
          setForm({ ...form, to: e.target.value })
        }
      />

      <input
        placeholder="Amount"
        type="number"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <button
        onClick={handleTransfer}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Transfer
      </button>
    </div>
  );
};

export default Transfer;
