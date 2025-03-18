import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditTaskPopUp } from "./EditTaskPopUp";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export const TaskContainer = ({ showingCompleted, tasks, userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(null);

    const changeStatus = async (taskId, completed) => {
        try {
            const taskRef = doc(db, "users", userId, "tasks", taskId);
            await updateDoc(taskRef, { completed: !completed });
        } catch (error) {
            console.error("Error updating task: ", error);
            alert("Failed to update task. Please try again.");
        }
    };
    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "users", userId, "tasks", taskId));
        } catch (error) {
            console.error("Error deleting task: ", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                {tasks
                    .filter((task) => task.completed === showingCompleted)
                    .map((task) => (
                        <div key={task.id} className="bg-[#393E46] p-[1em] rounded-[10px]">
                            <div className="flex gap-[10px]">
                                <input type="checkbox" className="cursor-pointer" onChange={() => changeStatus(task.id, task.completed)} checked={task.completed}/>
                                <p>{task.task}</p>
                            </div>
                            <div className="flex gap-[20px] mt-[0.5em]">
                                <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300" onClick={() => {
                                        setIsOpen(true);
                                        setUpdatedTask(task);
                                    }}/>
                                <FontAwesomeIcon className="cursor-pointer text-red-500 hover:text-red-700 duration-300" icon={faTrash} onClick={() => deleteTask(task.id)} />
                            </div>
                        </div>
                    ))}
            </div>
            {isOpen && updatedTask && (
                <EditTaskPopUp isOpen={isOpen} updatingTask={updatedTask} setIsOpen={setIsOpen} userId={userId} />
            )}
        </>
    );
};