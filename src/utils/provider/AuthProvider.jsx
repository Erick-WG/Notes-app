import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../supabase';


// creating context data, making it available globally.
const AuthContext = createContext()

// helper functions.

export const AuthProvider = ({children}) => {
    // session object from supabase, undefined by default.
    const [session, setSession] = useState(undefined);
    const user = session?.user ?? 'guest'

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
            return new Error(`Failed to get session data!`)
        }
    }


    // auth functions.
    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {{success: boolean, session: object} | {success: boolean, error?: string}} returns successful signup status and an error if something goes wrong, if signup successfull we update the app's session data with the current user's session data.
     */
    const signInUser = async (email, password) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error){
            return {success: false, error: new Error(`Failed to sign in user!`)}
        }

        if(data){
            setSession(data.session)
            return {success: true, session: data.session}
        }
    }

    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {password} password 
     * @returns {{success: boolean, session: object} | {success: boolean, error: string}} returns an object containing the user's data and signup status
     */
    const signUpUser = async (name, email, password) => {
        try {
            const {data, error} = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password,
                options: {
                    data: {
                        name
                    }
                }
            })

            if (error) throw new Error(`Failed to sign up user!`)

            setSession(data.session)
            return {success: true, data: data.session}
        } catch (error) {
            console.log(error)
            return {success: false, error: new Error(`Failed to sign up user!`)}
        }
    }

    /**
     * 
     * @returns {{success: boolean, error?: string}} On successful logout, update the session data.
     */
    const signOutUser = async () => {
        try {
            const {error} = await supabase.auth.signOut();

            if(error) throw new Error(`Failed to logout!`)

            // setSession(null)
            return {success: true}
        } catch (error) {
            return {success: false, error: new Error(`Failed to logout!`)}
        }
    }

  return (
    <AuthContext.Provider value={{ session, user, signUpUser, signInUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
