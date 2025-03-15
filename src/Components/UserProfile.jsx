import React from 'react'
import fetchUserData from '../helpers/fetchUserData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../helpers/logout'

const UserProfile = () => {
  const { userData, loading } = fetchUserData()
  const navigate = useNavigate()

  if (loading) return <div>Loading... <button onClick={handleLogout}>Logout</button></div>  // Loading state

  if (!userData) return <div>No user data found!
<button onClick={handleLogout}>Logout</button></div>  // No user data


  async function handleLogout() {
    try {
      //call function to log out of firebase, no need to call backend
      await logout()
      toast.success('User logged out successfully!', {
        position: 'top-center',
      })
      navigate('/login')
      console.log('User logged out successfully!')
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-center',
      })

      console.error('Error logging out:', error.message)
    }
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData.photoURL && <img src={userData.photoURL} alt="User Avatar" />} {/* Display user photo */}
      <p>Name: {userData.name}</p>
      {/* add conditional for non google users who use first name and lastname instead of name */}
      <p>Email: {userData.email}</p>
      {/* Add more fields as per your Firestore schema */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserProfile
