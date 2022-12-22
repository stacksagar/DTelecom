import React from "react";

import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-9">
      <h1 className="text-xl text-white text-center">PolliTelecom</h1>
      <div className="absolute top-5 right-5">
        <button className="text-white text-sm">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <span className="w-5 h-5 p-2 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs absolute -top-2 -right-3">
          56
        </span>
      </div>
    </header>
  );
};

export default Header;
