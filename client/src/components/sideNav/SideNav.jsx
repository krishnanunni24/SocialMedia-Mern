import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineLogout, MdSaveAlt } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ModalButton from "../users/createPost/ModalButton";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions"
import Modal from "../users/createPost/Modal";

const SideNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout(navigate));
    navigate("/auth")
  }

  function ModalButtonOnclick() {
    setIsModalOpen(true);
  }

  const menus = [
    { name: "Home", link: "/", icon: HiOutlineHome },
    { name: "Create", link: null, icon: AiOutlinePlusSquare },
    { name: "Search", link: "/search", icon: BiSearch },
    { name: "Saved", link: "/saved", icon: MdSaveAlt },
    { name: "Logout", link: null, icon: MdOutlineLogout },
  ];

  return (
    <div>
      <div
        className="bg-white z-10 md:sticky md:top-0 md:bottom-0 shadow-md border-t-2  max-md:left-0 max-md:bottom-0 md:border-e-2 fixed w-full md:min-h-screen flex
        lg:gap-5 md:py-10 lg:w-72 sm:flex-col md:w-16 
        duration-500 text-black-100"
      >
        <ProfileCard />
        <div className="flex justify-between w-full py-2 md:flex-col md:gap-5 bg-white px-3 rounded-lg">
          {menus?.map((menu, i) =>
            menu?.name === "Create" ? (
              <div key={i} className="hover:bg-secondary hover:text-accent">
                <ModalButton onClick={ModalButtonOnclick} menu={menu} />
              </div>
              
            ) : (
              <Link
                to={menu?.link}
                onClick={menu?.name === "Logout" && handleLogout}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex justify-center md:justify-start items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary hover:text-accent`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  className={`hidden md:block whitespace-pre ${"md:opacity-100  overflow-hidden"}`}
                >
                  {menu?.name}
                </h2>
              </Link>
            )
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default SideNav;
