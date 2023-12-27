import React, { useEffect, useState } from 'react'
import { useGetPostQuery } from '../../services/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBigLeft, ArrowLeft, ArrowRight, ArrowUpRight, DollarSign, FastForward, FileVideo, ForwardIcon, Home, LucideLoader2, LucideShoppingCart, LucideStepForward, MoreVertical, ShoppingCart, SkipForward, Star, StarIcon, StepBackIcon, StepForward, TimerIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDistanceToNow } from "date-fns"


const PostDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data:post,isLoading,isError,error} = useGetPostQuery(id)

  const [QuantityNumber,setQuantityNumber] = useState(1)

  if (isLoading) {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
        <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
      </div>}

  if (isError) {
      return <div className='border-4 border-red-700 bg-white text-red-800'>
          <strong>{error}</strong>
      </div>
  }
  console.log('the page:',post);
  return (
    <div className='w-[90%]  m-auto'>
      <div className='Path flex items-center gap-3 my-5'>
        <h1 className='font-bold text-center text-[25px] underline flex items-center 
          gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
            <Home />
            {/* Home   */}
        </h1>
        <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
        <h1 className='font-bold text-center text-[25px] underline flex items-center 
          gap-2 ' >
            Course
        </h1>
      </div>
      <div className='flex gap-4'>
        <div className='w-[80%] '>
          <img src={`http://localhost:3000/uploads/images/${post.thumbnail}`} className="w-full  h-auto object-fill"/>
        </div>
        <div className='w-[40%] h-auto border-[1px] border-gray-300 flex  flex-col p-5'>
          <div className='gap-5 h-auto py-3'>
            <h1 className='font-bold text-[25px] my-1'>{post.title}</h1>
            <div className='flex gap-1'>
            <p className='font-bold'>Reviews: 5.0 </p> <Star fill='black' />
            </div>
          </div>
          <hr />
          <div className='grid grid-cols-4 items-center gap-1 h-[70px] w-full'>
            <p className='font-bold col-start-2'>Price : </p> 
            <div className='flex items-center'>
              <p className='font-bold text-[20px]'>{post.price || 0}</p>
              <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
            </div>
          </div>
          <hr />
          <div>
            <div className='grid grid-cols-4 items-center gap-15 h-[70px] w-full'>
              <p className='font-bold col-start-2'>Quantity : </p> 
              <div className='flex items-center '>
                {<Button className="bg-null hover:bg-null font-bold text-[25px] text-black" onClick={() => setQuantityNumber(QuantityNumber+1)}>+</Button>}
                {QuantityNumber}
                {<Button className="bg-null hover:bg-null font-bold text-[25px] text-black" onClick={() => { if (QuantityNumber>1) setQuantityNumber(QuantityNumber-1)}}>-</Button>}
              </div>
            </div>
            <div className='grid grid-cols-4 justify-around items-center  h-[70px] w-full'>
              <p className='font-bold col-start-2'>Stock : </p> 
              <div className='flex items-center '>
                ({post.stock})
              </div>
            </div>
            <Button className="bg-blue-400 font-bold text-[20px] w-full my-2">
              Buy now
            </Button>
            <Button className="bg-blue-200 font-bold text-blue-800 text-[20px] w-full gap-3 hover:text-white">
              <LucideShoppingCart />
              Add to card
            </Button>
          </div>
        </div>
      </div>
      <div className='w-[65%] h-auto bg-gray-200 p-3 my-3 rounded-lg'>
        <small className='flex font-bold items-end'>date : {formatDistanceToNow(new Date(post.createdAt), { addSuffix:true })} </small>
        <h1 className='font-bold text-[20px] mt-3'>Product details</h1>
        <p>
          {post.description}
        </p> <br />
      </div>
      <div className='w-[65%] h-auto bg-gray-200 p-3 my-3 rounded-lg'>
        <h1 className='font-bold text-[20px] mt-3'>Reviews :</h1>
        <p>
        <small className='flex font-bold items-end'>date : {formatDistanceToNow(new Date(post.createdAt), { addSuffix:true })} </small>
          the Review message
        </p> <br />
      </div>
    </div>
  )
}

export default PostDetails