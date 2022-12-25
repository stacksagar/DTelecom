import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import BalanceArea from "./BalanceArea";

import Header from "./Header";
import ServiceBox from "./ServiceBox";
import TransferMoney from "./TransferMoney";

const Landing = () => {
  const { logout } = useAuthContext();

  function logout_handler() {
    logout();
  }

  return (
    <>
      <Header />
      <section className="bg-white">
        <div className="flex items-center justify-between px-6 py-6">
          <h3 className="text-lg font-bold bn">সার্ভিস সমূহ</h3>
          <BalanceArea />
        </div>

        <div className="grid grid-cols-12">
          <ServiceBox
            title="অ্যাড মানি"
            image="https://cdn-icons-png.flaticon.com/512/3687/3687106.png"
          />

          <TransferMoney />

          <ServiceBox
            title="ক্যাশ আউট"
            image="https://cdn-icons-png.flaticon.com/512/8818/8818337.png"
          />
          <ServiceBox
            title="ফ্রেক্সিলোড"
            image="https://cdn-icons-png.flaticon.com/512/2005/2005851.png"
          />
          <ServiceBox
            title="স্পেশাল অফার"
            image="https://cdn-icons-png.flaticon.com/512/8829/8829209.png"
          />
          <ServiceBox
            title="লেনদেন ইতিহাস"
            image="https://cdn-icons-png.flaticon.com/512/7052/7052015.png"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="flex items-center justify-between px-6 py-6">
          <h3 className="text-lg font-bold">অন্যান্য</h3>
        </div>

        <div className="grid grid-cols-12">
          <ServiceBox
            title="হোয়াটসঅ্যাপ গ্রুপ"
            image="https://cdn-icons-png.flaticon.com/512/1384/1384055.png"
          />
          <ServiceBox
            title="টেলিগ্রাম গ্রুপ"
            image="https://cdn-icons-png.flaticon.com/512/1603/1603076.png"
          />
          <ServiceBox
            title="কিভাবে কাজ করে?"
            image="https://cdn-icons-png.flaticon.com/512/3730/3730052.png"
          />
          <ServiceBox
            title="পাসওয়ার্ড পরিবর্তন"
            image="https://cdn-icons-png.flaticon.com/512/5617/5617976.png"
          />
          <ServiceBox
            title="প্রোফাইল"
            image="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
          />
          <ServiceBox
            onClick={logout_handler}
            title="লগআউট"
            image="https://cdn-icons-png.flaticon.com/512/4436/4436954.png"
          />
        </div>
      </section>
    </>
  );
};

export default Landing;
