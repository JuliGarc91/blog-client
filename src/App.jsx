import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { auth } from './helpers/firebase'

import Login from './Components/Login'
import SignUp from './Components/Register'
// import Profile from './Components/Profile'
import Test from './Components/Test'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import UserProfile from './Components/UserProfile'

function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div className='bg-[url(https://res.cloudinary.com/dzlpzgzkw/image/upload/v1742151043/DR-landscape_cz3rmm.jpg)] bg-cover bg-center bg-fixed text-white h-screen'>
      <Routes
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/test" element={user ? <Test /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
