import React, { useEffect, useState } from 'react';
import fetchUserData from '../helpers/fetchUserData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../helpers/logout'

const UserProfile = () => {
  const { userData, loading } = fetchUserData()
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  if (loading) return <div className='bg-black/50 text-white w-full p-2 flex justify-center gap-2'><button onClick={handleLogout} className='p-2 hover:bg-white hover:text-black rounded-sm'>This may take a while... Click to go back</button></div>  // Loading state
  if (!userData) return <div className='bg-red-800/80 w-full p-2 flex justify-center gap-2'><button onClick={handleLogout} className='p-2 hover:bg-white hover:text-black rounded-sm'>No user data found! Click to go back</button></div>  // No user data


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
    <div className='fixed bottom-0 w-full flex justify-between text-white bg-black'>
    <div className='flex align-middle gap-4 p-4'>
      {userData && userData.name ? <p>Welcome, {userData.name}</p> : <p>Welcome</p>}
      <p>Email: {userData.email}</p>
    </div>
    <div className='flex align-middle p-2'>
    <button onClick={handleLogout} className='hover:text-black hover:bg-white rounded-sm p-2'>Log out</button>
    </div>
    </div>
  )
}

export default UserProfile
