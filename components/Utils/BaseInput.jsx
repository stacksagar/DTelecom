import React from "react";

const BaseInput = ({
  type = "text",
  placeholder = "",
  name = "",
  ...props
}) => {
  return (
    <input
      className="px-2 sm:px-4 py-2.5 rounded ring-1 focus:ring w-full"
      type={type}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default BaseInput;
