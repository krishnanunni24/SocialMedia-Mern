import React from "react";

const ModalButton = ({ menu, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex justify-center md:justify-start items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary hover:text-accent"
    >
      <div>{React.createElement(menu?.icon, { size: "20" })}</div>

      <h2
        className={`hidden lg:block whitespace-pre ${"md:opacity-100  overflow-hidden"}`}
      >
        {menu?.name}
      </h2>
    </button>
  );
};

export default ModalButton;
