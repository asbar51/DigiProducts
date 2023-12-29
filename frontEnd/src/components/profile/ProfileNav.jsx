import { Home } from 'lucide-react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ProfileAvatar from './ProfileAvatar'

const ProfileNav = () => {
    const navigate = useNavigate()
  return (
    <div className='w-[90%]  m-auto h-[100vh]'>
        <div className='Path flex items-center gap-3 my-5'>
            <h1 className='font-bold text-center text-[25px] underline flex items-center 
            gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
                <Home />
                {/* Home   */}
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px] underline flex items-center 
            gap-2 ' >
                Profile
            </h1>
        </div>
        <div className='p-5 m-auto w-[40%] max-[500px]:w-[100%] '>
            <h1 className='font-bold text-[18px]'>Profile Options:</h1>
            <hr className='my-2'/>
            <div className='flex flex-col gap-3  ml-2'>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/setting')}>Setting</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/store')}>My Products</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/orders')}>Orders</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/cart')}>My cart</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/notifications')}>Notifications</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/logout')}>Logout</span>
            </div>
        </div>
        <div>
        
        </div>
    </div>
  )
}

export default ProfileNav