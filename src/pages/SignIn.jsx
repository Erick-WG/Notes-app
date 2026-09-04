import { Link } from 'react-router-dom';
import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@utils/provider/AuthProvider';

// components.
import ErrorDiv from '@components/ErrorDiv';

const SignIn = () => {
    const { signInUser, session } = useAuth();
    const navigate = useNavigate();

    // navigate to the dashboard when we are already have a session.
    if(session) return navigate('/dashboard');

    // get form data and update supabase.
    const [error, handleSignIn, isPending] = useActionState(
        async (_prevState, formData) => {
            const email = formData.get('email');
            const password = formData.get('password');

            try {
                const {
                    session, 
                    success, 
                    error: signInError
                } = await signInUser(email, password)

                if(signInError) {
                    return signInError;
                }

                if(success && session){
                    navigate('/dashboard');
                    return null;
                }
            } catch (error) {
                return new Error(`Failed to signIn!, Please try again...`)
            }

        }, null // initial error value
    )
  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
        <div className='my-6'>
            <h2 className='text-xl font-semibold'>Sign in to Noted App</h2>
        </div>
        <form action={handleSignIn} className='flex flex-col gap-9 min-h-72.5 h-full justify-between max-w-120'>
            <div className='flex flex-col gap-2'>
                <label for="email">
                    Email: 
                    <input type="text" name="email" id="email" placeholder='First Name | username'/>
                </label>
                <label for="password">
                    Password: 
                    <input type="password" name="password" id="password" />
                </label>

                <div className='text-sm flex flex-row gap-1'>
                    <p>Don't have an account yet?</p>
                    <Link to={'/signup'} className='text-blue-500 hover:cursor-pointer' >Sign Up</Link>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <button type="submit" disabled={isPending}>{isPending ? 'Signing in...' : 'Sign in'}</button>
                <ErrorDiv error={error}/>
            </div>
        </form>
    </div>
  )
}

export default SignIn
