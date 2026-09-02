import React from 'react'
import { useAuth } from '@utils/provider/AuthProvider'
import { useNavigate } from 'react-router-dom'


// todo: build a toast for alerts so we can use it as a toast notification that has a timeout on it's display prop.

const signOutButton = () => {
    const {signOut} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const {error} = await signOut();
            if(!error) navigate('/login')
        } catch (error) {
            return error.message
        }
    }
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default signOutButton
