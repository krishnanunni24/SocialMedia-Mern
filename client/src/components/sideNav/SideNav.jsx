import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineLogout, MdSaveAlt } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ModalButton from "../users/createPost/ModalButton";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions";
import Modal from "../users/createPost/Modal";
import OffCanvasSearchNav from "./offCanvasSearch/offCanvasSearchNav";
import { useDisclosure } from "@mantine/hooks";

const SideNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  
  const toggleSidebar = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  function handleLogout() {
    dispatch(logout(navigate));
    navigate("/auth");
  }

  function ModalButtonOnclick() {
    setIsModalOpen(true);
  }

  const closeDrawer = ()=>{
    setIsSearchOpen(false)
    close()
  }

  const menus = [
    { name: "Home", link: "/", icon: HiOutlineHome },
    { name: "Create", link: null, icon: AiOutlinePlusSquare },
    { name: "Search", link: "/search", icon: BiSearch },
    { name: "Saved", link: "/saved", icon: MdSaveAlt },
    { name: "Logout", link: null, icon: MdOutlineLogout },
  ];

  return (
    <>
    <div>
      <div
        className={`text-black-100 fixed z-10 flex w-full border-t-2 bg-white  shadow-md duration-500 max-md:bottom-0 max-md:left-0 sm:flex-col md:sticky md:bottom-0
        md:top-0 md:min-h-screen md:w-16 md:border-e-2 md:py-10 
       ${isSearchOpen ? "" : "lg:w-72 lg:gap-5"}`}
      >
        <ProfileCard isSearchOpen={isSearchOpen} />
        <div className="flex w-full justify-between rounded-lg bg-white px-3 py-2 md:flex-col md:gap-5">
          {menus?.map((menu, i) =>
            menu?.name === "Create" ? (
              <div key={i} className="hover:bg-secondary hover:text-accent">
                <ModalButton
                  open={ModalButtonOnclick}
                  menu={menu}
                  isSearchOpen={isSearchOpen}
                />
              </div>
            ) : menu?.name === "Search" ? (
              <div onClick={toggleSidebar} key={i} className="hover:bg-secondary hover:text-accent">
                <ModalButton
                  menu={menu}
                  isSearchOpen={isSearchOpen}
                  open={open}
                />
              </div>
            ) : (
              <Link
                to={menu?.link}
                onClick={menu?.name === "Logout" && handleLogout}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center justify-center gap-3.5 p-2  text-sm font-medium hover:bg-secondary hover:text-accent md:justify-start`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  className={`hidden whitespace-pre md:block ${"overflow-hidden  md:opacity-100"}`}
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
     {isSearchOpen && (
      <OffCanvasSearchNav open={open} close={closeDrawer} opened={opened} setIsSearchOpen={setIsSearchOpen}/>
      )}
      </>
  );
};

export default SideNav;
