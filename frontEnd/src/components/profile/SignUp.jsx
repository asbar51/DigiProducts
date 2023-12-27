
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { useNavigate, useParams } from 'react-router-dom'
import { StepBackIcon } from 'lucide-react'
import { useAddProfileMutation, useGetProfileQuery } from '../../services/profileApi'

const SignUp = () => {
    const navigate = useNavigate()
    const [addProfile,{data:post}] = useAddProfileMutation()
    // let {data:posts,refetch} = useGetProfileQuery()


    const handler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const createdAt = new Date()
        try {
            await addProfile({
                username,
                email,
                password,
                createdAt:createdAt.toLocaleString('en-US', { timeZoneName: 'short' })
            }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err.message))
            console.log('profile is created successfully')
            // await refetch()
            navigate('/profile/login')
        } catch (error) {
            console.error('Error deleting profile:', error);
        }}

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
            <button onClick={() => navigate(`/`)} className='cursor-pointer bg-black 
            text-white font-bold p-1 px-2 m-2 rounded flex'>
            <StepBackIcon /> Back</button>
        <div className='h-[100%] w-[100%] flex justify-center items-center '>
            <form onSubmit={handler} className='w-[300px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                <h1 className='font-bold text-[25px] text-center my-2'>Sign up</h1>
                <Input type="text" required autoFocus placeholder="username" name="username" />
                <Input type="email" required placeholder="Type your email here."  name="email" />
                <Input type="password" required  placeholder="Type a strong password here."  name="password" />
                <Button type='submit' className='font-bold' >Sign up</Button>
            </form>
        </div>
    </div>
  )
}

export default SignUp