import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";
import Head from "next/head";

const Layout = ({ children }) => {
  const pathname_arr = useRouter().pathname.split("/");
  const title =
    pathname_arr[pathname_arr.length - 1]?.trim()?.toLocaleLowerCase() ===
    "admin"
      ? "Dashboard"
      : pathname_arr[pathname_arr.length - 1]?.trim();

  return (
    <>
      <Head>
        <title>Admin | {title?.split("-").join(" ")}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="flex p-0 m-0 justify-between w-full h-screen overflow-hidden">
        <Sidebar />
        {/* <!-- Content */}

        <div className="w-full h-screen overflow-auto">
          <Header title={title?.split("-").join(" ")} />
          <div className="x_container space-y-10 p-10">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
