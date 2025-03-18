import { useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    return(
        <>
        <Navbar />
        <div className="bg-[#393E46] w-[100%] h-[87vh] flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-[#EEEEEE] font-bold text-[2.5rem] md:text-[3rem] w-[80%] md:w-[60%] text-center">A Simple To Do List That is Useful in Daily Life!</p>
            <p className="text-[#EEEEEE] w-[80%] md:w-[50%] text-center mt-[2em]">This is a website for my To-Do list for the forum task. To access it, please login using my binusian email with my NIM as my password. You can also sign up with your personal mail as well!!</p>
            <button className="bg-[#00ADB5] px-4 py-3 w-fit rounded-[10px] text-[#EEEEEE] font-semibold mt-[2em] hover:bg-[#008A92] duration-300 cursor-pointer" onClick={() => {navigate("/login")}}>To-Do List</button>
        </div>
        </>
    );
}