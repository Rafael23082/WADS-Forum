import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

export const ProfilePopUp = ({ isOpen, setIsOpen, userId }) => {
    const { user, setUser } = useContext(UserContext); 

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEscapeKey = (e) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const changeEmail = async(e) => {
        const newEmail = window.prompt("Enter you new email");
        if (isValidEmail(newEmail)){
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { email: newEmail });
        } else {
            alert("Invalid email or email change failed!");
        }
    }

    const changePassword = async(e) => {
        const newPassword = window.prompt("Enter you new password");
        if (newPassword.trim() !== ""){
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                password: newPassword
            });
        } else {
            alert("Password change failed!");
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#222831] p-[2em] rounded-[10px] w-[90%] max-w-[400px]">
                <FontAwesomeIcon
                    icon={faTimes}
                    className="text-[1.5rem] text-[#EEEEEE] right-6 top-4 absolute cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
                <p className="font-semibold text-[#EEEEEE] text-[2rem] text-center">Profile</p>
                <div className="rounded-full bg-white w-[20%] aspect-[1/1] my-[1em] mx-auto"></div>
                <div className="flex justify-center items-center mt-[1em]">
                    <p className="text-[#EEEEEE] text-center w-[90%]">Email: {user?.email}</p>
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300 ml-[1em]" onClick={() => {
                        changeEmail();
                    }}/>
                </div>
                <div className="flex justify-center items-center mt-[0.5em]">
                    <p className="text-[#EEEEEE] text-center w-[90%]">Password: {"*".repeat(user?.password?.length || 0)}</p>
                    <FontAwesomeIcon icon= {faEdit} className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300 ml-[1em]" onClick={() => {
                            changePassword();
                        }}/>
                </div>
            </div>
        </div>
    );
};