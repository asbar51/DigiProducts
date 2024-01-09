import React from 'react'
import { Button } from '../ui/button'
import { useGetOrdersQuery, useGetPostQuery, useOrderMutation } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import PaypalPayment from '../Payments/PaypalPayment'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { DollarSign } from 'lucide-react'

const CheckoutPage = () => {
    const {id,quantity, price} = useParams()
    const {data:post,isLoading,isError,error} = useGetPostQuery(id)
    const [order,{data:theOrdes}] = useOrderMutation()
    let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
    let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()


    // const sendOrder = async (id) => {
    //     if (post.instructor == profile?.profile?.username) {
    //         alert("you are the intructor")
    //     } else {
    //     console.log("order:",id);
    //     await order(id).then(async (resp) => {
    //       console.log("the order: ",resp)
    //       await refetchOrders()
    //       await refetchProfile()
    //     })}
    //   }
      console.log(post)

    //   _______________paypal conf :
    const initialOptions = {
        clientId: "AYqvllf1UJZtyqpkzmzELXnVSpzJoCCveFBw6-yBMk9ahKvvC0ojiG7wuvBLT17TZAHufpfCM83-bHbq",
        currency: "USD",
        intent: "capture",
    };
    
  return (
    <PayPalScriptProvider options={initialOptions}>
        <div className='w-full grid grid-cols-12  gap-10 my-10 mx-5'>
            <div className='col-span-7 col-start-2'>
                <div className=' border-gray-300 border-2 rounded h-[180px]'>
                    <h1 className='bg-gray-300 p-5 font-bold text-[18px] '>Billing information</h1>
                    <p className='p-3 text-gary-700 text-[18px] '>Your invoice will be issued according to the details listed here.</p>
                    <div className='flex items-center ml-3'>
                        <Avatar>
                            <AvatarImage src={`http://localhost:3000/uploads/images/${post?.Post?.profilePicture}`} /> :
                            {/* <AvatarFallback>{post.instructor[0].toUpperCase()}</AvatarFallback> */}
                        </Avatar>
                        <span className='font-bold p-3'>{post?.Post?.instructor}</span>
                    </div>
                </div>
                <div className='border-gray-300 border-2 rounded h-auto mt-3'>
                    <h1 className='bg-gray-300 p-5 font-bold text-[18px] '>Payment options</h1>
                    <div className='h-auto w-full px-2 mt-3'>
                        {/* <Button onClick={() => sendOrder(id)} className="bg-blue-400 font-bold text-[20px] w-full my-2">
                            Buy now
                        </Button> */}
                        {/* <PayPalButtons /> */}
                        <PaypalPayment id={id} quantity={quantity} price={price} />
                    </div>
                </div>
            </div>
            
            <div className='sticky top-5 max-h-[320px] rounded col-span-3  border-gray-300 border-2 '>
                <div className=''>
                    <div className='flex bg-gray-300 p-3 rounded'>
                        <img src={`http://localhost:3000/uploads/images/${post?.Post?.thumbnail}`} className='w-[40%] max-h-[70px]' alt="" />
                        <h1 className='w-auto ml-5 font-bold'>{post?.Post?.title}</h1>
                    </div>
                    <div className='flex justify-center gap-5 items-center gap-1 h-[70px] w-full'>
                        <p className='font-bold col-end-1 max-sm:col-start-1 ml-3'>Product price: </p> 
                        <div className='flex items-center'>
                        <p className='font-bold text-[20px]'>{price || 0}</p>
                        <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='flex justify-center gap-5 items-center gap-15 h-[70px] w-full'>
                            <p className='font-bold col-end-1 mx-3'>Quantity: </p> 
                            <p className='font-bold'>{quantity}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-center gap-5 items-center gap-1 h-[70px] w-full'>
                        <p className='font-bold max-sm:col-start-1 ml-3'>Total: </p> 
                        <div className='flex items-center'>
                        <p className='font-bold text-[20px]'>{price*quantity || 0}</p>
                        <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
     </PayPalScriptProvider>
  )
}

export default CheckoutPage