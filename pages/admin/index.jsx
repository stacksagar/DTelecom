import {
  faIdCard,
  faMoneyBill,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Layout from "../../components/admin/Layout";

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
          total={`৳` + 55?.toLocaleString("en")}
        />

        <div className="col-span-full mt-10">
          <h3 className="text-lg bg-green-600 tracking-wider text-white font-semibold w-fit p-2 rounded shadow">
            NID Details
          </h3>
        </div>
        <Item
          Icon={faIdCard}
          text="Today NID Created!"
          total={55?.toLocaleString()}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
