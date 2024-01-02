import { Home, LucideLoader2 } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Course from '../posts/Course'
import { useGetStoreQuery } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { Button } from '../ui/button'

const StoreProducts = () => {
    let ID = 1
    const {username} = useParams()
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error} = useGetStoreQuery(username)
    let {data:profile} = useGetProfileQuery()

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
    </div>}

    // if (isError) {
    //     return <div className='border-4 border-red-700 bg-white text-red-800'>
    //         <strong>{error}</strong>
    //     </div>
    // }

    console.log("posts:",posts);

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
        <div className='Path flex items-center gap-3 my-5'>
            <h1 className='font-bold text-center text-[25px] underline flex items-center 
            gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
                <Home />
                {/* Home   */}
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px]  flex items-center  
            gap-2 '>
                {username}
            </h1>
            
        </div>
        <div className='p-5 m-auto w-[100%] max-[500px]:w-[100%] '>
            <div className='w-full pb-5 my-3 rounded-full pt-3 bg-blue-300 text-center'>
                <img src={`http://localhost:3000/uploads/images/${posts.avatar}`} className="w-[110px] border-4 border-blue-500 h-[100px] m-auto rounded-full object-fill"/>
                <h1 className='font-bold'>{username.toUpperCase()}</h1>
            </div>
            <div className='flex gap-2'>
                {/* <h1 className='font-bold text-[18px] bg-gray-300 w-[70px] px-2 rounded'>Sales </h1> */}
                <h1 className='font-bold text-[18px] bg-gray-300 w-[100px] px-2 rounded'>My store </h1>
            </div>
            <hr className='my-2'/>
            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
            {   
                    posts!="logout" ? posts.AllPosts.map(p => (
                        <Course id={p._id} thumbnail={p.thumbnail} price={p.price} instructor={p.instructor} profileUsername={profile?.profile?.username} title={p.title} createdAt={p.createdAt} key={ID++} />
                        
                    ))
                    :
                    <div>
                        <span className='font-bold'>Login first : </span><Button onClick={() => navigate('/login')} variant="outline" className='text-[15px] font-bold h-8 mr-2'>Login</Button>
                    </div>
            }
            </div>
        </div>
    </div>
  )
}

export default StoreProducts