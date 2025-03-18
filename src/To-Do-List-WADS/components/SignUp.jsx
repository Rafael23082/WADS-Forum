import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "./UserContext";

export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext); 

    const updateText = (value, emailText) => {
        if (emailText) {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const verifyUser = async () => {
        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        try {
            const usersCollection = collection(db, "users");

            const q = query(usersCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("User with this email already exists!");
                return;
            }

            const userData = {
                id: Date.now().toString(),
                email: email,
                password: password, 
                tasks: [], 
            };

            const docRef = await addDoc(usersCollection, userData);

            setUser({ id: docRef.id, ...userData });
            navigate("/todo"); 
        } catch (error) {
            console.error("Error adding user: ", error);
            alert("Failed to register user. Please try again.");
        }
    };

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#393E46]">
            <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer absolute top-0 left-0 m-[2em] text-[#EEEEEE]" onClick={() => navigate("/")}>Home</button>
            <div className="w-[95%] md:w-[70%] h-[70vh] bg-[#222831] rounded-[20px] flex flex-col items-center justify-center min-h-[500px]">
                <p className="text-[#EEEEEE] font-medium text-[1.5rem]">User Sign Up</p>
                <input type="text" placeholder="Email" onChange={(e) => updateText(e.target.value, true)} className="bg-[#EEEEEE] py-[0.5em] mt-[2em] w-[70%] md:w-[40%] rounded-[10px] pl-[1em]" />
                <input type="password" placeholder="Password" onChange={(e) => updateText(e.target.value, false)} className="bg-[#EEEEEE] py-[0.5em] mt-[1em] w-[70%] md:w-[40%] rounded-[10px] pl-[1em]"/>
                <p className="text-[#00ADB5] mt-[1em] text-center cursor-pointer hover:underline" onClick={() => navigate("/login")} >Already have an account? Log In.</p>
                <button className="bg-[#00ADB5] px-4 py-3 w-fit rounded-[10px] text-[#EEEEEE] font-semibold mt-[1em] hover:bg-[#008A92] duration-300 cursor-pointer" onClick={verifyUser} >Sign Up</button>
            </div>
        </div>
    );
};