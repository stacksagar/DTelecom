// #CDA571

import React from "react";
import Landing from "../components/Home/Landing";
import ScreenLoading from "../components/Utils/ScreenLoading";

const Index = () => {
  return (
    <main className="w-full bg-gray-200">
      <div className="relative max-w-[450px] mx-auto bg-white">
        <Landing />
        {/* <ScreenLoading /> */}
      </div>
    </main>
  );
};

export default Index;
