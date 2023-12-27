
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, StepBackIcon } from 'lucide-react'
import { useGetProfileQuery, useLoginProfileMutation } from '../../services/profileApi'
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useEffect, useState } from "react"


const Login = () => {
    const navigate = useNavigate()
    const [loginProfile,{data:post}] = useLoginProfileMutation()
    let {data:posts,refetch} = useGetProfileQuery()

    const [error, setError] = useState(null);
    const [errorMesg, setErrorMsg] = useState(null);

    const handler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
    
        try {
            const res = await loginProfile({ username, password });
            switch (res.error?.data?.error) {
                case 'Username Not Found':
                    console.log('Username not found.');
                    setError('Username not found.');
                    setErrorMsg('Username not found.');
                    break;
                case 'password incorrect':
                    console.log('Password Incorrect.');
                    setError('Password Incorrect.');
                    setErrorMsg('Password Incorrect.');
                    break;
                default:
                    console.log('Login successful');
                    console.log('Response:', res);
                    refetch()
                    navigate('/');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setError(null);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [error]);

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
        <div className={`fixed top-5 left-0 right-0 w-[60%] m-auto transition-opacity duration-700 ease-in-out ${error ? 'opacity-90' : 'opacity-0'}`}>
            {/* Render your alert component here */}
            <Alert className="bg-red-500 text-white font-bold">
            <AlertTriangle className="h-10 w-10" color="white" />
            <div className={`ml-5 transition-opacity duration-800 ease-in-out ${error ? 'opacity-100' : 'opacity-0'}`}>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMesg}</AlertDescription>
            </div>
            </Alert>
            
        </div>
            <button onClick={() => navigate(`/`)} className='cursor-pointer bg-black 
            text-white font-bold p-1 px-2 m-2 rounded flex'>
            <StepBackIcon /> Back</button>
        <div className='h-[100%] w-[100%] flex justify-center items-center '>
            <form onSubmit={handler} className='w-[300px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                <h1 className='font-bold text-[25px] text-center my-2'>Login</h1>
                <Input type="text" required autoFocus placeholder="username" name="username" />
                <Input type="password" required  placeholder="Type a strong password here."  name="password" />
                <Button type='submit' className='font-bold' >Login</Button>
            </form>
        </div>
    </div>
  )
}

export default Login
