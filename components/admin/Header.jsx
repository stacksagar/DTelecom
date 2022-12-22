import React, { useState } from "react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faChevronDown,
  faBars,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faInternetExplorer } from "@fortawesome/free-brands-svg-icons";

import { useAuthContext } from "../../context/AuthContext";

const Header = ({ title = "Title" }) => {
  const { logout, state } = useAuthContext();

  const [open_profile_opt, set_opo] = useState(false);

  function logout_handler() {
    logout();
  }

  return (
    <header className="h-16 bg-white" style={{ zIndex: "98" }}>
      <div className="h-full flex items-center relative justify-between px-5 xl:px-10">
        <div className="text-xl font-semibold tracking-wide capitalize space-x-3">
          <button id="sidebar_toggler">
            <FontAwesomeIcon icon={faBars} />{" "}
          </button>
          <span className="hidden sm:inline-block">{title}</span>
        </div>

        <div className="flex items-center justify-center gap-x-3 sm:gap-x-4">
          {state?.authenticated ? (
            <div className="relative w-fit z-50">
              <button
                onClick={() => set_opo((p) => !p)}
                onBlur={() =>
                  setTimeout(() => {
                    set_opo(false);
                  }, 500)
                }
                type="button"
                className={`w-full p-2 rounded bg-gray-100 shadow border flex items-center justify-center gap-x-3`}
              >
                <span> {state?.user?.name} </span>

                <img
                  className="h-7 w-7 rounded-full"
                  src={state?.user?.photoURL}
                  alt=""
                />
                <FontAwesomeIcon
                  className={`text-sm text-gray-500 transition-all transform ${
                    open_profile_opt ? "-rotate-180" : "rotate-0"
                  }`}
                  icon={faChevronDown}
                />
              </button>

              <div
                className={`absolute w-full bg-white rounded shadow top-full right-0 transition-all origin-top transform ${
                  open_profile_opt ? "scale-y-100" : "scale-y-0"
                }`}
              >
                <button
                  onClick={logout_handler}
                  className="flex items-center gap-x-2 w-full  hover:bg-gray-100 p-3"
                >
                  <FontAwesomeIcon
                    className="text-base text-gray-500"
                    icon={faSignOut}
                  />
                  <span className="text-sm font-medium">Logout</span>
                  {state?.loading && (
                    <span className="block w-4 h-4 border border-black rounded-full border-t-transparent animate-spin ml-auto" />
                  )}
                </button>
                <Link href="/">
                  <a className="flex items-center gap-x-2 w-full  hover:bg-gray-100 p-3">
                    <FontAwesomeIcon
                      className="text-base text-gray-500"
                      icon={faInternetExplorer}
                    />
                    <span className="text-sm font-medium">Website</span>
                    {state?.loading && (
                      <span className="block w-4 h-4 border border-black rounded-full border-t-transparent animate-spin ml-auto" />
                    )}
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
