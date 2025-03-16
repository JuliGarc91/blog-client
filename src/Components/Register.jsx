import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth, db } from '../helpers/firebase'

function Register() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    photo:'',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = newUser

      // createUser in firebase
      await createUserWithEmailAndPassword(auth, email, password)
      const { currentUser } = auth

      // store user in the Firestore DB
      if (currentUser.uid) {
        const { email, firstName, lastName, password } = newUser
        await setDoc(doc(db, 'Users', currentUser.uid), {
          email,
          firstName,
          lastName,
          photo: '',
        })
        console.log(auth, email, password)

        //Login
        await signInWithEmailAndPassword(auth, email, password)
      }
      console.log('User Registered Successfully!!')
      setNewUser({
        email,
        firstName,
        lastName,
        photo: '',
      })

      //Display success alert
      toast.success('User Registered Successfully!!', {
        position: 'top-center',
      })

      navigate('/profile')
    } catch (error) {
      console.log(error.message)

      toast.error(error.message, {
        position: 'bottom-center',
      })
    }
  }
  return (
    <div className='shadow-xl shadow-black m-auto rounded-xl w-[50vh] grid justify-items-center p-4 bg-[url(https://res.cloudinary.com/dzlpzgzkw/image/upload/v1742151539/subway_z4fswl.jpg)] bg-cover bg-center h-content text-white'>
      <form onSubmit={handleRegister} className='grid grid-cols-1 gap-2'>
          <label htmlFor="firstName">
            First Name:{' '}
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={newUser.firstName}
              onChange={handleChange}
              className='bg-white text-black p-1 rounded-sm'
              required
            />
          </label>

          <label htmlFor="lastName">
            Last Name:{' '}
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={newUser.lastName}
              onChange={handleChange}
              className='bg-white text-black p-1 rounded-sm'
            />
          </label>

          <label htmlFor="email">
            Email Address:{' '}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleChange}
              className='bg-white text-black p-1 rounded-sm'
              required
            />
          </label>

          <label htmlFor="password">
            Password:{' '}
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className='bg-white text-black p-1 rounded-sm'
              required
            />
          </label>
          <button type="submit" className='bg-zinc-950 border-1 border-zinc-500 p-1 rounded-sm'>
            Sign Up
          </button>
          <p className='text-center'>
            Already registered? 
          </p>
          <button className='bg-zinc-950 p-1 border-1 border-zinc-500 rounded-sm'><Link to="/login">Login</Link></button>
      </form>
    </div>
  )
}

export default Register
