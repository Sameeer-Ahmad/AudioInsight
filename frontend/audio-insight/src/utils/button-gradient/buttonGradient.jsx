import React from "react";
import { HoverBorderGradient } from "./hoverBorderGradient";

const ButtonGradient = ({ isLoading, onClick, children }) => {
  return (
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-[#881337] text-white font-bold dark:text-white flex items-center hover:bg-[#4c0519] px-6 py-2 "
        onClick={onClick}
        disabled={isLoading}
      >
        <span>{children}</span>
      </HoverBorderGradient>
    </div>
  );
};

export default ButtonGradient;
