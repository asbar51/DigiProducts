
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { useNavigate, useParams } from 'react-router-dom'
import { LucideLoader2, StepBackIcon } from 'lucide-react'
import { useGetProfileQuery, useUpdateProfileMutation } from '../../services/profileApi'
import { useEffect, useState } from "react"

const Profile = () => {
    const [username,setUsername] = useState('')
    const [usernameOrg,setUsernameORG] = useState('')
    const [email,setEmail] = useState('')

    const navigate = useNavigate()
    const [updateProfile,{data:prof}] = useUpdateProfileMutation()
    let {data:profile,isLoading,isError,error,refetch} = useGetProfileQuery()

    useEffect(() => {
        if (profile) {
            setUsernameORG(profile.profile.username)

            setUsername(profile.profile.username)
            setEmail(profile.profile.email)
        }
    
      
    }, [profile])

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
          </div>}

    const handler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        try {
            await updateProfile({usernameOrg,body: { username, email }})
            .then((res) => {
                // if ()
                console.log('profile is updated successfully')
                console.log(res)
            }).catch((err) => console.log(err.message))
            await refetch()
            navigate('/')
        } catch (error) {
            console.error('Error in updating profile:', error);
        }}

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
        
        <div className='h-[100%] w-[100%] flex justify-center items-center '>
            <form onSubmit={handler} className='w-[300px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                <h1 className='font-bold text-[25px] text-center my-2'>Update</h1>
                <Input type="text" onChange={(e) => setUsername(e.target.value)} value={username} required autoFocus placeholder="username" name="username" />
                <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Type your email here."  name="email" />
                <Button type='submit' className='font-bold' >Update</Button>
            </form>
        </div>
    </div>
  )
}

export default Profile