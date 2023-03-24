import { useEffect, useState } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import { useSelector } from "react-redux";
import AddProfile from "./components/Profile/AddProfile";
import AddEmergency from "./components/Profile/AddEmergency";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard/>: <Login/>}/> */}
        <Route path="/addprofile" element={<AddProfile />} />
        <Route path="/addemergency" element={<AddEmergency />} />
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
