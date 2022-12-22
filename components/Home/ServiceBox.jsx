import React from "react";

const ServiceBox = ({ title = "", image = "" }) => {
  return (
    <a
      href="##"
      className="col-span-4 py-2 px-2 flex flex-col items-center justify-center"
    >
      <div className="bg-gray-300 p-2 shadow rounded-lg">
        <img className="w-14" src={image} alt="" />
      </div>
      <h6 className="font-medium text-lg p-2 text-center">{title}</h6>
    </a>
  );
};

export default ServiceBox;
