import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
