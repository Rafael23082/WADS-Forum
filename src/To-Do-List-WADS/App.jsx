import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { ToDoWrapper } from "./components/ToDoWrapper";
import { LandingPage } from "./components/LandingPage";
import Modal from "react-modal";

function App() {
    Modal.setAppElement("#root");
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/todo" element={<ToDoWrapper />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;