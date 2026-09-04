import { Link } from 'react-router-dom';
import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@utils/provider/AuthProvider';

// components.
import ErrorDiv from '@components/ErrorDiv';

const SignUp = () => {
    const { signUpUser, session } = useAuth();
    const navigate = useNavigate()

    // navigate to the dashboard when we are already have a session.
    if(session) return navigate('/dashboard');

    // get form data and update supabase.
    const [error, handleSignUp, isPending] = useActionState(
        async (_prevState, formData) => {
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            try {
                const {
                    session, 
                    success, 
                    error: signUpError
                } = await signUpUser(name, email, password)

                if(signUpError) {
                    return signUpError;
                }

                if(success && session){
                    navigate('/dashboard')
                    return null
                }
            } catch (error) {
                console.log(error.message)
                return new Error(`Failed to signup!, Please try again...`)
            }

        }, null // initial error value
    )
  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
        <div className='my-6'>
            <h2 className='text-xl font-semibold'>Sign up to Noted App</h2>
        </div>
        <form action={handleSignUp} className='flex flex-col gap-9 min-h-72.5 h-full justify-between max-w-120'>
            <div className='flex flex-col gap-2'>
                <label for="name">
                    Name: 
                    <input type="text" name="name" id="name" placeholder='First Name | username'/>
                </label>
                <label for="email">
                    Email: 
                    <input type="text" name="email" id="email" placeholder='name@mail.com'/>
                </label>
                <label for="password">
                    Password: 
                    <input type="password" name="password" id="password" />
                </label>

                <div className='text-sm flex flex-row gap-1'>
                    <p>Already have an account?</p>
                    <Link to={'/signin'} className='text-blue-500 hover:cursor-pointer' >Sign in</Link>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <button type="submit" disabled={isPending}>{isPending ? 'Signing up...' : 'Sign up'}</button>
                <ErrorDiv error={error}/>
            </div>
        </form>
    </div>
  )
}

export default SignUp
