import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OverlayContent = ({ children, loading, hide_overlay }) => {
  return (
    <div className="absolute inset-0 m-auto flex justify-center">
      <div
        onClick={hide_overlay}
        className="absolute inset-0 m-auto bg-black bg-opacity-50 flex items-start justify-center z-10"
      ></div>

      <div className="relative z-20 p-6 w-[90%] h-fit bg-gray-200 shadow rounded-lg mt-48 flex flex-col gap-y-3">
        <button
          onClick={hide_overlay}
          className="absolute z-10 right-3 top-2 text-red-600"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {loading && (
          <div className="absolute inset-0 m-auto bg-white bg-opacity-50 flex items-center justify-center z-20">
            <img className="w-24" src="/images/spinner-loading.gif" alt="" />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default OverlayContent;
