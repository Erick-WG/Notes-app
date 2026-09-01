import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../supabase';


// creating context data, making it available globally.
const AuthContext = createContext()

// helper functions.

export const AuthProvider = ({children}) => {
    // session object from supabase, undefined by default.
    const [session, setSession] = useState(undefined);

    // checking for a session token on first render.
    useEffect(()=>{
        getSession()

        // actively listen for auth state changes (login/out)
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])
    
    const getSession = async () => {
        try {
            const {data, error} = await supabase.auth.getSession();
            if(error) throw new Error(`Failed to get session data!`)

            // update session data
            setSession(data.session);
            return data.session
        } catch (error) {
            return error
        }
    }

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
