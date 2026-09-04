import React from 'react'
import { useAuth } from '@utils/provider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'


// todo: build a toast for alerts so we can use it as a toast notification that has a timeout on it's display prop.

const SignOutButton = () => {
    const {signOutUser} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const {error} = await signOutUser();
            if(!error) return navigate('/signin')
        } catch (error) {
            return error.message
        }
    }
    
  return (
    <button onClick={handleLogout} className='flex flex-row gap-1.5 items-center justify-center bg-error/20 hover:bg-error/30 text-error font-semibold px-6 py-4 border border-error rounded-lg hover:cursor-pointer'>
      Logout
      <LogOut size={20}/>
    </button>
  )
}

export default SignOutButton
