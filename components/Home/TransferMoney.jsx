import { onValue, ref, update } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";
import BaseInput from "../Utils/BaseInput";
import BaseButton from "../Utils/BaseButton";
import ServiceBox from "./ServiceBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import OverlayContent from "../Utils/OverlayContent";
import { useAuthContext } from "../../context/AuthContext";
import TostMessage from "../Utils/TostMessage";

const TransferMoney = () => {
  const { state } = useAuthContext();
  const [users, set_users] = useState([]);
  const [balance, set_balance] = useState(0);

  const [show_transfer_popup, set_show_transfer_popup] = useState(false);
  const [receiver_user, set_receiver_user] = useState({});
  const [receiver_email, set_receiver_email] = useState("");
  const [transfer_amount, set_transfer_amount] = useState("");

  const [start_transfering, set_start_transfering] = useState(false);

  function change_transfer_amount(e) {
    const transfer = Number(e.target.value);
    if (transfer <= balance) {
      set_transfer_amount(transfer);
    }
  }

  function change_receiver_email(e) {
    set_receiver_email(e?.target?.value);
  }

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const users = snapshot.val()?.users;
      set_users(users);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(users).indexOf(state?.user?.uid) > -1) {
      set_balance(users[state?.user?.uid]?.balance);
    }

    const all_users = Object.values(users || {}).map((val) => val);
    const filtered = all_users.filter((user) => user?.email === receiver_email);
    set_receiver_user(filtered[0]);
  }, [users, receiver_email]);

  function balance_transfer_handler() {
    if (receiver_user?.name && transfer_amount > 0) {
      set_start_transfering(true);
      Object.entries(users || {}).map(([key, val]) => {
        const check_email = val?.email;
        if (receiver_email === check_email) {
          update(ref(db, `/users/${state?.user?.uid}`), {
            balance: state?.user?.balance - transfer_amount,
          });

          update(ref(db, `/users/${key}`), {
            balance: val?.balance + transfer_amount,
          })
            .then(() => console.log("balance updated"))
            .catch((error) => console.log("error ", error))
            .finally(() => {
              set_start_transfering(false);
              set_show_transfer_popup(false);
              TostMessage(`successfully transferred ${transfer_amount}.tk`);
              set_receiver_user({});
              set_transfer_amount("");
            });
        }
      });
    } else {
      alert("something wrong!");
    }
  }

  return (
    <>
      {show_transfer_popup && (
        <OverlayContent
          loading={start_transfering}
          hide_overlay={() => set_show_transfer_popup(false)}
        >
          <h2 className="flex items-center gap-x-1 text-gray-700 font-semibold">
            <span>Available Balance</span>
            <b className="text-gray-900 font-extrabold"> {balance} </b>
            <span>.tk</span>
          </h2>
          <div className="space-y-2">
            <div className="relative">
              <BaseInput
                onChange={change_receiver_email}
                placeholder="Receiver email address"
                type="email"
                name="email_address"
              />

              {receiver_user?.name && (
                <div className="px-4 py-2 bg-green-600 text-white text-xs absolute inset-y-0 h-fit rounded right-2 my-auto">
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faCheckCircle} />{" "}
                  </span>
                  <span>{receiver_user?.name}</span>
                </div>
              )}
            </div>
            <BaseInput
              onChange={change_transfer_amount}
              placeholder="Transfer Amount"
              type="number"
              value={transfer_amount}
              name="transfer_amount"
            />
          </div>
          <button
            disabled={start_transfering}
            onClick={balance_transfer_handler}
            className="px-6 h-10 flex items-center justify-between bg-purple-600 text-white w-full focus:ring rounded shadow"
          >
            <span></span>
            <span>Transfer</span>
            <div>
              <FontAwesomeIcon icon={faPaperPlane} />{" "}
            </div>
          </button>
        </OverlayContent>
      )}

      <ServiceBox
        onClick={() => set_show_transfer_popup(true)}
        title="ট্রান্সফার মানি"
        image="https://cdn-icons-png.flaticon.com/512/7401/7401215.png"
      />
    </>
  );
};

export default TransferMoney;
