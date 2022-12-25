import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
const BalanceArea = () => {
  const { state } = useAuthContext();
  const [balance_loading, set_bl] = useState(false);
  const [show_balance, set_show_balance] = useState(false);
  const [user_balance, set_user_balance] = useState(0);

  function balance_check() {
    set_show_balance((p) => !p);
    set_bl(true);
    onValue(ref(db), (snapshot) => {
      const users = snapshot?.val()?.users;
      const keys = Object.keys(users || {});
      if (keys?.includes(state?.user?.uid)) {
        const user = users[state?.user?.uid];
        set_user_balance(user?.balance);
      }
      set_bl(false);
    });
  }

  return (
    <button
      onClick={balance_check}
      className="bg-gradient-to-r from-rose-600 to-rose-500 text-white font-medium px-6 h-9 flex items-center justify-center rounded-full focus:ring"
    >
      {balance_loading ? (
        <span>
          <img className="w-9" src="/images/balance-loading.gif" alt="" />
        </span>
      ) : (
        <>
          {show_balance ? (
            <span>{user_balance} .TK</span>
          ) : (
            <span>ব্যালেন্স</span>
          )}
        </>
      )}
    </button>
  );
};

export default BalanceArea;
