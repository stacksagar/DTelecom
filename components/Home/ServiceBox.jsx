import React from "react";

const ServiceBox = ({ title = "", image = "", ...props }) => {
  return (
    <div
      {...props}
      className="col-span-4 py-2 px-2 flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="bg-gray-300 py-3 px-5 shadow rounded-2xl">
        <img className="w-12" src={image} alt="" />
      </div>
      <h6 className="pt-2 font-medium leading-4 flex items-start justify-center text-lg h-10 text-center bn">
        {title}
      </h6>
    </div>
  );
};

export default ServiceBox;
