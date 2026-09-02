import { Link } from 'react-router-dom';
import React, { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/provider/AuthProvider';

const signIn = () => {
    const {signInUser} = useAuth();
    const navigate = useNavigate()

    // get form data and update supabase.
    const [error, handleSignIn, isPending] = useActionState(
        async (_prevState, formData) => {
            const email = formData.get('email');
            const password = formData.get('password');

            try {
                const {
                    data, 
                    success, 
                    error: signInError
                } = await signInUser(email, password)

                if(signInError) {
                    return signInError;
                }

                if(success && data?.session){
                    navigate('/')
                }
            } catch (error) {
                return new Error(`Failed to signIn!, Please try again...`)
            }

        }, null // initial error value
    )
  return (
    <div>
        <form action={handleSignIn}>
            <label for="email">
                <input type="text" name="email" id="email" />
            </label>
            <label for="password">
                <input type="password" name="password" id="password" />
            </label>

            <div>
                <p>Don't have an account yet?</p>
                <Link to={'/login'}>Signup</Link>
            </div>

            <button type="submit" disabled={isPending}>{isPending ? 'Signing up...' : 'Sign up'}</button>
            <ErrorDiv error={error}/>
        </form>
    </div>
  )
}

export default signIn
