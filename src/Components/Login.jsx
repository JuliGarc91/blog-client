import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'

import SignInWithGoogle from './SignInWithGoogle'
import { auth } from '../helpers/firebase'

function Login() {
  const navigate = useNavigate()

  const [loginUser, setLoginNewUser] = useState({ password: '', email: '' })

  const handleChange = (e) => {
    setLoginNewUser({ ...loginUser, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = loginUser
    try {
      //sign in to firebase
      await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in Successfully')

      setLoginNewUser({ password: '', email: '' })

      toast.success('User logged in Successfully', {
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
    <>
    <div className='bottom-0 w-full fixed shadow-xl flex justify-center shadow-black p-4 gap-2 bg-black bg-cover bg-center h-content'>
      {/* <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2 bg-black/50 p-2 rounded-md'> */}
      <form onSubmit={handleSubmit} className='flex gap-2 bg-black/50 rounded-md'>
        <label htmlFor="email">
          Email Address:{' '}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={loginUser.email}
            onChange={handleChange}
            className='bg-white text-black p-1 rounded-sm'
          />
        </label>

        <label htmlFor="password">
          Password:{' '}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={loginUser.password}
            onChange={handleChange}
            className='bg-white text-black p-1 rounded-sm'
          />
        </label>

        <button type="submit" className='bg-zinc-950 border-1 border-zinc-500 p-1 rounded-sm'>Login</button>
        {/* <button className='bg-zinc-950 border-1 border-zinc-500 p-1 rounded-sm'><Link to="/register">Sign Up</Link></button> */}
        
      </form>
      <SignInWithGoogle />
      </div>
    </>
  )
}

export default Login
