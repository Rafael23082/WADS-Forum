import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const navigate = useNavigate();
    return(
        <>
        <div className="w-[100%] h-[13vh] bg-[#222831] flex items-center justify-center md:justify-start min-h-[50px]">
            <p className="text-[#EEEEEE] text-[1.4rem] pl-[1em] text-center md:text-start md:pl-[2em] w-fit w-[80%] md:w-[70%]">2702255981 - Rafael Anderson</p>
            <div className="hidden md:flex w-[30%] justify-end gap-[2em] pr-[2em]">
                <button className="bg-[#00ADB5] px-4 py-2 w-fit rounded-[10px] text-[#EEEEEE] font-semibold hover:bg-[#008A92] duration-300 cursor-pointer" onClick={() => {navigate("/login")}}>Login</button>
                <button className="bg-[#00ADB5] px-4 py-2 w-fit rounded-[10px] text-[#EEEEEE] font-semibold hover:bg-[#008A92] duration-300 cursor-pointer" onClick={() => {navigate("/signup")}}>Sign Up</button>
            </div>
            <div className="flex justify-end w-[20%] md:hidden items-center">
                <FontAwesomeIcon icon={faBars} size="xl" className={`text-white cursor-pointer pr-[1em] fixed ${menuIsOpen ? "invisible": ""}`} onClick={() => {setMenuIsOpen(!menuIsOpen)}} />
                <FontAwesomeIcon icon={faTimes} size="xl" className={`text-white cursor-pointer pr-[1em] fixed  ${menuIsOpen ? "": "invisible"}`} onClick={() => {setMenuIsOpen(!menuIsOpen)}} />
            </div>
        </div>
        <ul className={`bg-[#222831] text-[#EEEEEE] w-[100%] pl-[2em] fixed md:hidden overflow-hidden transform-transition ease-in-out duration-100 ${menuIsOpen ? "h-fit pb-[1em]": "h-[0px]"}`}>
            <li className="cursor-pointer w-fit hover:text-[#00ADB5] duration-300" onClick={() => {navigate("/login")}}>Login</li>
            <li className="pt-[1em] cursor-pointer w-fit hover:text-[#00ADB5] duration-300" onClick={() => {navigate("/signup")}}>Sign Up</li>
        </ul>
       </>
    );
}