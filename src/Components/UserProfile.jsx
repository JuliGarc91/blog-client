import React from 'react'
import fetchUserData from '../helpers/fetchUserData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../helpers/logout'
import placeHolder from '../assets/placeholder.png'

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
    <div className='flex justify-between text-white bg-black/10'>
    <div className='bg-zinc-500/80 border-zinc-950 p-1'>
      {console.log(placeHolder)}
      {userData && userData.photoURL ? <img src={userData.photoURL} alt={'profile'} className=''/>: <img src={placeHolder} alt={'profile'}/>}
      <p>Welcome, {userData.name}</p>
      {/* add conditional for non google users who use first name and lastname instead of name */}
      <p>Email: {userData.email}</p>
      <button onClick={handleLogout} className=''>Log out</button>
    </div>
    {/* <div>
    <button onClick={handleLogout} className='bg-zinc-500/70 border-zinc-950 m-auto p-1'>Logout</button>
    </div> */}
    </div>
  )
}

export default UserProfile
