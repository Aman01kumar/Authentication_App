import { useState, useEffect } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(6278);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const recentTransactions = [
    { id: 1, type: "credit", amount: 500, desc: "Salary Deposit", date: "Feb 5, 2026" },
    { id: 2, type: "debit", amount: 150, desc: "Grocery Shopping", date: "Feb 4, 2026" },
    { id: 3, type: "credit", amount: 200, desc: "Refund", date: "Feb 3, 2026" },
    { id: 4, type: "debit", amount: 80, desc: "Electricity Bill", date: "Feb 2, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-indigo-100 text-sm mb-2 font-medium">Total Balance</p>
                {loading ? (
                  <div className="h-16 w-48 bg-white/20 rounded-lg animate-pulse"></div>
                ) : (
                  <h1 className="text-6xl font-bold mb-2">₹ {balance.toLocaleString()}</h1>
                )}
                <p className="text-indigo-100 text-sm">Available for transfer</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-indigo-100 text-xs mb-1">This Month</p>
                <p className="text-2xl font-bold">+₹2,450</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-indigo-100 text-xs mb-1">Expenses</p>
                <p className="text-2xl font-bold">-₹1,230</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-indigo-100 text-xs mb-1">Saved</p>
                <p className="text-2xl font-bold">₹1,220</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    txn.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {txn.type === 'credit' ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{txn.desc}</p>
                    <p className="text-sm text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${
                  txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Balance;