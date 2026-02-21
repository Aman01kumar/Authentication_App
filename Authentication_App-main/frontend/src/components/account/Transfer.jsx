import { useState } from "react";
import { transferBalance } from "../../api/account.api";

const Transfer = () => {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!recipientId || !amount) {
      return alert("Fill all fields");
    }

    try {
      setLoading(true);

      await transferBalance({
        to: recipientId,
        amount: Number(amount),
      });

      alert("✅ Transfer Successful!");

      setRecipientId("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer Failed");
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Transfer Money
          </h1>
          <p className="text-gray-600">
            Send money quickly and securely
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              New Transfer
            </h2>

            <form onSubmit={handleTransfer} className="space-y-5">

              <input
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder="Recipient User ID"
                className="w-full p-3 border rounded-xl"
              />

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-3 border rounded-xl"
              />

              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className="py-2 bg-gray-100 hover:bg-indigo-100 rounded-lg text-sm font-semibold"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                {loading ? "Processing..." : "Transfer Now"}
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Transfer Benefits
            </h3>
            <ul className="space-y-3">
              <li>⚡ Instant Transfer</li>
              <li>🔒 Secure & Encrypted</li>
              <li>✅ No Hidden Fees</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Transfer;
