import React, { useEffect } from "react";
import ScreenLoading from "./ScreenLoading";
import router from "next/router";

import { useAuthContext } from "context/AuthContext";
const Layout = ({ children, screen_loading, authPage }) => {
  const { state } = useAuthContext();

  useEffect(() => {
    if (!authPage && !state?.user?.email) {
      router.push("/login");
    }
    if (authPage && state?.user?.email) {
      router.push("/");
    }
  }, [state]);

  if (!authPage && !state?.user?.email) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-200">
      <div className="relative w-full md:max-w-[450px] min-h-screen mx-auto bg-white">
        {screen_loading && <ScreenLoading />}
        {children}
      </div>
    </main>
  );
};

export default Layout;
