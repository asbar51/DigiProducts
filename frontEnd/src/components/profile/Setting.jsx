
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { Toaster } from "../ui/toaster"
import { useNavigate, useParams } from 'react-router-dom'
import { Home, LucideLoader2, StepBackIcon } from 'lucide-react'
import { useAddProfileAvatarMutation, useGetProfileQuery, useUpdateProfileMutation } from '../../services/profileApi'
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"

const Setting = () => {
    const [username,setUsername] = useState('')
    const [usernameOrg,setUsernameORG] = useState('')
    const [email,setEmail] = useState('') 

    const [image, setImage] = useState(null);
    const { toast } = useToast()
    
    const navigate = useNavigate()
    const [addProfileAvatar,{data:avatar}] = useAddProfileAvatarMutation()
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

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
    
            try {
            const response = await addProfileAvatar(formData);
            console.log('avatar uploaded successfully:', response.data);
            if (response.data.success == true) refetch()
    
            // Set the uploaded image path for display
            } catch (error) {
            console.error('Error uploading avatar:', error);
            }
        } else alert('choose the image')
    };

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
        <div className='Path flex items-center gap-3 my-5'>
            <h1 className='font-bold text-center text-[25px] underline flex items-center 
            gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
                <Home />
                {/* Home   */}
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px] underline flex items-center cursor-pointer 
            gap-2 ' onClick={() => navigate(`/profile`)} >
                Profile
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px] underline flex items-center 
            gap-2 ' >
                Setting
            </h1>
        </div>
        <div className='h-[100%] w-[100%] flex justify-center items-center '>
            <div className='w-[400px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>

                <h1 className='font-bold text-[25px] text-center my-2'>Update</h1>
                <div className='fileUpload_test'>
                    <Input type="file" onChange={handleFileChange} />
                    <Button className='bg-blue-500 hover:bg-blue-400 rounded my-2 p-2 text-white font-bold' onClick={handleUpload}>Upload Avatar</Button>
                </div>
                <form onSubmit={handler} className=" grid gap-5">
                    <label htmlFor="username" className="font-bold">Username: </label>
                    <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} required autoFocus placeholder="username" name="username" />
                    <label htmlFor="email" className="font-bold">Email: </label>
                    <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Type your email here."  name="email" />
                    <Button type='submit' className='font-bold' >Update</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Setting