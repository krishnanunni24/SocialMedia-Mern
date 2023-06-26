import React, { useState } from "react";
import { MdOutlineDashboard ,MdOutlineReportGmailerrorred,MdOutlineLogout} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../actions/AuthActions";

 function SideNav() {
   const menus = [
      { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
      { name: "Manage Users", link: "/users", icon: AiOutlineUser },
      { name: "Reported Posts", link: "/reports", icon: MdOutlineReportGmailerrorred },
      { name: "Logout", link:null, icon: MdOutlineLogout, margin: true },
      
    ];
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout=()=>{
      dispatch(adminLogout())
      console.log("hello")
      navigate("/")
    }

    return (
      
      <div
        className="bg-white z-10 md:sticky md:top-0 md:bottom-0 shadow-md border-t-2  max-md:left-0 max-md:bottom-0 md:border-e-2 fixed w-full md:min-h-screen flex
        lg:gap-5 md:py-10 lg:w-72 sm:flex-col md:w-16 
        duration-500 text-black-100"
      >
        
        <div className="flex justify-between w-full py-2 md:flex-col md:gap-5 bg-white px-3 rounded-lg">
          {menus?.map((menu, i) => (
            <Link
                to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              }group flex justify-center md:justify-start items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary hover:text-accent`}
              onClick={menu?.name === "Logout" ? handleLogout : null}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
              
                className={`hidden md:block whitespace-pre ${"md:opacity-100  overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
            
            </Link>
          ))}
        </div>
      </div>
    );
}

export default SideNav;
