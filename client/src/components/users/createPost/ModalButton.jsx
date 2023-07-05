import React from "react";

const ModalButton = ({ menu, isSearchOpen ,open}) => {
  return (
    <button
      onClick={open}
      >
        <div
      className="group flex justify-center md:justify-start items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary hover:text-accent"
>
      <div>{React.createElement(menu?.icon, { size: "20" })}</div>

      <h2
        className={`hidden ${isSearchOpen ? "": "lg:block"} whitespace-pre ${"md:opacity-100  overflow-hidden"}`}
        >
        {menu?.name}
      </h2>
        </div>
    </button>
  );
};

export default ModalButton;
