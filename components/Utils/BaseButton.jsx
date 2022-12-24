import React from "react";

const BaseButton = ({
  type = "button",
  children,
  onClick,
  loading,
  ...props
}) => {
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      {...props}
      className="px-4 py-2.5 text-center text-sm text-white bg-purple-600 w-full rounded focus:ring flex items-center justify-between"
      type={type}
    >
      <span className="block w-6"></span>

      <span>{children}</span>

      {loading ? (
        <span className="block w-6 h-6 border-[3px] border-t-transparent animate-spin rounded-full"></span>
      ) : (
        <span className="block w-6"></span>
      )}
    </button>
  );
};

export default BaseButton;
