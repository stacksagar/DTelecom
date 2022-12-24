import React from "react";

const ServiceBox = ({ title = "", image = "", ...props }) => {
  return (
    <a
      {...props}
      href="##"
      className="col-span-4 py-2 px-2 flex flex-col items-center justify-center"
    >
      <div className="bg-gray-300 py-3 px-5 shadow rounded-2xl">
        <img className="w-12" src={image} alt="" />
      </div>
      <h6 className="pt-2 font-medium leading-4 flex items-start justify-center text-lg h-10 text-center">
        {title}
      </h6>
    </a>
  );
};

export default ServiceBox;
