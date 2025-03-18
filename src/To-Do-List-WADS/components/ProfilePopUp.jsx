import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./UserContext";
import { doc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const ProfilePopUp = ({ isOpen, setIsOpen }) => {
    const { user, setUser } = useContext(UserContext);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setIsOpen]);

    const getUserDocRef = async (userID) => {
        const q = query(collection(db, "users"), where("id", "==", userID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("User document not found");
        }

        const userDoc = querySnapshot.docs[0];
        return doc(db, "users", userDoc.id);
    };

    const changeEmail = async () => {
        const newEmail = window.prompt("Enter your new email:");
        if (!newEmail || newEmail.trim() === "") {
            alert("Email cannot be empty!");
            return;
        }

        if (!isValidEmail(newEmail)) {
            alert("Please enter a valid email!");
            return;
        }

        try {
            const userRef = await getUserDocRef(user.id);
            await updateDoc(userRef, { email: newEmail });

            setUser({ ...user, email: newEmail });
            alert("Email updated successfully!");
        } catch (error) {
            console.error("Error updating email:", error);
            alert("Failed to update email. Please try again.");
        }
    };

    const changePassword = async () => {
        const newPassword = window.prompt("Enter your new password:");
        if (!newPassword || newPassword.trim() === "") {
            alert("Password cannot be empty!");
            return;
        }

        try {
            const userRef = await getUserDocRef(user.id);
            await updateDoc(userRef, { password: newPassword });

            setUser({ ...user, password: newPassword });
            alert("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Please try again.");
        }
    };

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
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300 ml-[1em]"
                        onClick={changeEmail}
                    />
                </div>
                <div className="flex justify-center items-center mt-[0.5em]">
                    <p className="text-[#EEEEEE] text-center w-[90%]">Password: {"*".repeat(user?.password?.length || 0)}</p>
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300 ml-[1em]"
                        onClick={changePassword}
                    />
                </div>
            </div>
        </div>
    );
};