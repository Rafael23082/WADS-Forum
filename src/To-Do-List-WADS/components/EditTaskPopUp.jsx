import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const EditTaskPopUp = ({ isOpen, updatingTask, setIsOpen, userId }) => {
    const [updatedTaskText, setUpdatedTaskText] = useState(updatingTask.task);

    const updateTask = async () => {
        if (!updatedTaskText.trim()) {
            alert("Task cannot be empty!");
            return;
        }

        try {
            const taskRef = doc(db, "users", userId, "tasks", updatingTask.id);
            await updateDoc(taskRef, { task: updatedTaskText });
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating task: ", error);
            alert("Failed to update task. Please try again.");
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-[#222831] p-[2em] rounded-[10px]">
                    <input type="text" value={updatedTaskText} onChange={(e) => setUpdatedTaskText(e.target.value)} className="bg-gray-200 rounded-[10px] pl-[1em] py-2 w-full text-black" />
                    <div className="flex gap-[20px] mt-[1em]">
                        <button lassName="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer" onClick={updateTask}>Update</button>
                        <button className="bg-red-500 px-5 py-2 rounded-[10px] w-fit hover:bg-red-700 duration-300 cursor-pointer" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    );
};