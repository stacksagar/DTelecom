import {
  faIdCard,
  faMoneyBill,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";
import { db } from "../../firebase";

function Item({ Icon, text, total }) {
  return (
    <div className="bg-white shadow border rounded px-4 py-8">
      <div className="flex items-center">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-cyan-900 rounded-lg shadow-md shadow-gray-300">
          <FontAwesomeIcon icon={Icon} />
        </div>
        <div className="flex-shrink-0 ml-3">
          <span className="text-2xl font-bold leading-none text-gray-900">
            {total}
          </span>
          <h3 className="text-base font-normal text-gray-500">{text}</h3>
        </div>
        <div className="flex flex-1 justify-end items-center ml-5 pb-4 w-0 text-base font-bold text-green-500">
          +{0.03}%
        </div>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [today_pending_deposit, set_today_pd] = useState(0);
  const [today_deposited, set_today_deposied] = useState(0);
  const [total_deposited, set_td] = useState(0);
  const [total_pending_deposit, set_tpd] = useState(0);
  const [users_available_balance, set_users_available_balance] = useState(0);

  const [total_users, set_tu] = useState(0);
  const [today_registered_users, set_tru] = useState(0);

  const [toady_create, set_today_created] = useState(0);
  const [total_created, set_total_created] = useState(0);
  const [this_month_created, set_this_month_created] = useState(0);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      const users = data?.users;

      const all_users = Object.values(users || {});
      set_tu(all_users?.length);
      let today_registered = 0;
      all_users?.map((user) => {
        if (
          new Date(user?.createdAt).toDateString() === new Date().toDateString()
        ) {
          today_registered++;
        }
      });
      set_tru(today_registered);

      all_users?.map((user) => {
        set_users_available_balance((p) => p + user?.balance || 0);
      });

      // Withdraw Calculation
      {
        let total_nid = 0;
        let today_nid = 0;
        let this_month = 0;

        const users_nid = Object.values(all_users || {})
          .filter((user) => typeof user?.nid === "object")
          .map((user) => Object.values(user?.nid || {}));

        users_nid?.map((nids) => {
          total_nid += nids?.length;

          nids?.map((nid) => {
            const nid_date = nid?.date;
            if (
              new Date(nid_date).toDateString() === new Date().toDateString()
            ) {
              today_nid++;
            }

            if (new Date(nid_date).getMonth() === new Date().getMonth()) {
              this_month++;
            }
          });
        });

        set_total_created(total_nid);
        set_today_created(today_nid);
        set_this_month_created(this_month);
      }

      // Deposit Calculation
      {
        const users_deposits = Object.values(all_users || {})
          .filter((user) => typeof user?.deposits !== "string")
          .map((user) => user?.deposits);

        let today_deposited = 0;
        let today_pending_deposit = 0;
        let total_deposited = 0;
        let total_pending_deposited = 0;

        for (let i = 0; i < users_deposits?.length; i++) {
          Object.values(users_deposits[i] || {}).map((d) => {
            if (
              new Date(d?.date).toDateString() === new Date().toDateString()
            ) {
              switch (d?.status) {
                case "success":
                  today_deposited += Number(d?.amount);
                  break;

                case "pending":
                  today_pending_deposit += Number(d?.amount);
                  break;
              }
            }

            switch (d?.status) {
              case "success":
                total_deposited += Number(d?.amount);
                break;

              case "pending":
                total_pending_deposited += Number(d?.amount);
                break;
            }
          });
        }
        set_today_pd(today_pending_deposit);
        set_today_deposied(today_deposited);
        set_td(total_deposited);
        set_tpd(total_pending_deposited);
      }
    });
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 mb-6 w-full sm:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-full">
          <h3 className="text-lg bg-green-600 tracking-wider text-white font-semibold w-fit p-2 rounded shadow">
            Deposit Details
          </h3>
        </div>
        <Item
          Icon={faMoneyBillTrendUp}
          text="Users Available Balance"
          total={`৳` + users_available_balance?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBillTrendUp}
          text="Today deposited"
          total={`৳` + today_deposited?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBillTrendUp}
          text="Today pending deposit"
          total={`৳` + today_pending_deposit?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBillTrendUp}
          text="Total deposited"
          total={`৳` + total_deposited?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBillTrendUp}
          text="Total pending deposit"
          total={`৳` + total_pending_deposit?.toLocaleString("en")}
        />

        {/* <div className="col-span-full mt-10">
          <h3 className="text-lg bg-green-600 tracking-wider text-white font-semibold w-fit p-2 rounded shadow">
            Withdraw Details
          </h3>
        </div>
        <Item
          Icon={faMoneyBill}
          text="Today withdraw"
          total={`৳` + today_withdraw?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBill}
          text="Today pending withdraw"
          total={`৳` + today_pending_withdraw?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBill}
          text="Total withdraw"
          total={`৳` + total_withdraw?.toLocaleString("en")}
        />

        <Item
          Icon={faMoneyBill}
          text="Total pending withdraw"
          total={`৳` + total_pending_withdraw?.toLocaleString("en")}
        /> */}

        <div className="col-span-full mt-10">
          <h3 className="text-lg bg-green-600 tracking-wider text-white font-semibold w-fit p-2 rounded shadow">
            NID Details
          </h3>
        </div>
        <Item
          Icon={faIdCard}
          text="Today NID Created!"
          total={toady_create?.toLocaleString()}
        />
        <Item
          Icon={faIdCard}
          text="Total NID Created"
          total={total_created?.toLocaleString()}
        />

        <Item
          Icon={faIdCard}
          text={`In ${new Date().toLocaleString("default", {
            month: "long",
          })} Created!`}
          total={this_month_created?.toLocaleString()}
        />

        <div className="col-span-full mt-10">
          <h3 className="text-lg bg-green-600 tracking-wider text-white font-semibold w-fit p-2 rounded shadow">
            Users Details
          </h3>
        </div>
        <Item
          Icon={faUser}
          text="Today's registered users!"
          total={today_registered_users?.toLocaleString()}
        />
        <Item
          Icon={faUsers}
          text="Total users"
          total={total_users?.toLocaleString()}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
