import React from 'react'
import { Button } from '../ui/button'
import { useGetOrdersQuery, useGetPostQuery, useOrderMutation } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const CheckoutPage = () => {
    const {id} = useParams()
    const {data:post,isLoading,isError,error} = useGetPostQuery(id)
    const [order,{data:theOrdes}] = useOrderMutation()
    let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
    let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()


    const sendOrder = async (id) => {
        if (post.instructor == profile?.profile?.username) {
          alert("you are the intructor")
          
        } else {
        console.log("order:",id);
        await order(id).then(async (resp) => {
          console.log("the order: ",resp)
          await refetchOrders()
          await refetchProfile()
        })}
      }
      console.log(post)
  return (
    <div className='w-full flex justify-center gap-10 my-10 mx-5'>
        <div className='border-gray-300 border-2 rounded w-[700px] h-[180px]'>
            <h1 className='bg-gray-300 p-5 font-bold text-[18px] '>Billing information</h1>
            <p className='p-3 text-gary-700 text-[18px] '>Your invoice will be issued according to the details listed here.</p>
            <div className='flex items-center ml-3'>
                <Avatar>
                    <AvatarImage src={`http://localhost:3000/uploads/images/${post.avatar}`} /> :
                    {/* <AvatarFallback>{post.instructor[0].toUpperCase()}</AvatarFallback> */}
                </Avatar>
                <span className='font-bold p-3'>{post.Post.instructor}</span>
            </div>
        </div>
        <div className=' rounded w-[250px] border-gray-300 border-2 '>
            <div className='relative h-[300px]'>
                <div className='flex bg-gray-300 p-3 rounded'>
                    <img src={`http://localhost:3000/uploads/images/${post.Post.thumbnail}`} className='w-[40%]' alt="" />
                    <h1 className='w-auto ml-5 font-bold'>{post.Post.title}</h1>
                </div>
                <div className='absolute bottom-1 w-full px-2'>
                    <Button onClick={() => sendOrder(id)} className="bg-blue-400 font-bold text-[20px] w-full my-2">
                        Buy now
                    </Button>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default CheckoutPage