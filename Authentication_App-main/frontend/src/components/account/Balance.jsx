import { useEffect, useState } from "react";
import { getAccount } from "../../api/account.api";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccount().then(res => setBalance(res.data.data.balance));
  }, []);

  return <h3>Balance: ₹{balance}</h3>;
};

export default Balance;
