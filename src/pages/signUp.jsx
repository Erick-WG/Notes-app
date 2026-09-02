import { Link } from 'react-router-dom';
import React, { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/provider/AuthProvider';

const signUp = () => {
    const {signUpUser} = useAuth();
    const navigate = useNavigate()

    // get form data and update supabase.
    const [error, handleSignUp, isPending] = useActionState(
        async (_prevState, formData) => {
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            try {
                const {data, success, error: signUpError} = await signUpUser(name, email, password)

                if(signUpError) {
                    return signUpError;
                }

                if(success && data?.session){
                    navigate('/')
                }
            } catch (error) {
                return new Error(`Failed to signup!, Please try again...`)
            }

        }, null // initial error value
    )
  return (
    <div>
        <form action={handleSignUp}>
            <label for="name">
                <input type="text" name="name" id="name" />
            </label>
            <label for="email">
                <input type="text" name="email" id="email" />
            </label>
            <label for="password">
                <input type="password" name="password" id="password" />
            </label>

            <div>
                <p>Already have an account?</p>
                <Link to={'/login'}>Login</Link>
            </div>

            <button type="submit" disabled={isPending}>{isPending ? 'Signing up...' : 'Sign up'}</button>
            <ErrorDiv error={error}/>
        </form>
    </div>
  )
}

export default signUp
