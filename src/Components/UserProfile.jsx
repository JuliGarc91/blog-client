import React from 'react'
import fetchUserData from '../helpers/fetchUserData'

const UserProfile = () => {
  const { userData, loading } = fetchUserData()

  if (loading) return <div>Loading...</div>  // Loading state

  if (!userData) return <div>No user data found!</div>  // No user data

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Add more fields as per your Firestore schema */}
    </div>
  )
}

export default UserProfile
