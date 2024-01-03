import { Home, LogIn, LogOut, LucideLoader2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Course from '../posts/Course'
import { useGetFromCartQuery, useGetOrdersQuery } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { Button } from '../ui/button'

const MyOrders = () => {
    let ID = 1
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error} = useGetOrdersQuery()
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

    console.log("orders :",posts);

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
        <div className='Path flex items-center gap-3 my-5'>
            <h1 className='font-bold text-center text-[25px] hover:underline flex items-center 
            gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
                <Home />
                {/* Home   */}
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px] hover:underline flex items-center cursor-pointer 
            gap-2 ' onClick={() => navigate(`/profile`)} >
                Profile
            </h1>
            <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
            <h1 className='font-bold text-center text-[25px]  flex items-center 
            gap-2 ' >
                orders
            </h1>
        </div>
        <div className='p-5 m-auto w-[100%] max-[500px]:w-[100%] '>
            <h1 className='font-bold text-[18px]'>Products in orders :</h1>
            <hr className='my-2'/>
            <div className='w-[60%] mx-auto'>
            {   
                    posts!="logout" ? posts.map(p => (
                        <div className='flex justify-between pb-5 border-b-2 items-center w-full my-5 ' key={ID++}>
                            <div className='flex gap-5'>
                            <img src={`http://localhost:3000/uploads/images/${p.thumbnail}`} onClick={()=> navigate(`/posts/${p.id}`)} className="w-[60px]  h-[60px] cursor-pointer object-fill"/>
                            <div>
                                <h1 className='font-bold'>{p.title}</h1>
                                <span className='font-bold '>{p.price}$</span>
                            </div>
                            </div>
                            <span className='font-bold text-green-500'>ordered</span>
                        </div>
                        // <Course id={p._id} inCart={profile?.profile?.addToCart} thumbnail={p.thumbnail} price={p.price} instructor={p.instructor} profileUsername={profile?.profile?.username} title={p.title} createdAt={p.createdAt} key={ID++} />
                        
                    ))
                    :
                    <div className='m-auto col-span-5'>
                        <span className='font-bold mx-10 text-[25px]'>Login first : </span><Button onClick={() => navigate('/login')} variant="outline" className='text-[25px] p-5 font-bold h-8 mr-2'>
                            <LogIn className='mx-2'/>
                            Login</Button>
                    </div>
            }
            </div>
        </div>
    </div>
  )
}

export default MyOrders