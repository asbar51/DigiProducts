import React, { useEffect, useState } from 'react'
// import { useGetAllPostsQuery } from '../services/postApi'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
import { postApi, useDeletePostMutation, useGetAllPostsQuery } from '../../services/postApi'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from "../ui/skeleton"
import { Home, LucideLoader2, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Course from './Course'
import { useGetProfileQuery } from '../../services/profileApi'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination"


const Posts = () => {
    let ID = 1
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error} = useGetAllPostsQuery()

    const [MyProfile,setMyProfile] = useState(null)
    let {data:profile} = useGetProfileQuery()

    useEffect(() => {
        if (profile && profile !== "logout" ) {
            if (profile?.profile.role == 'instructor') setMyProfile(profile.profile.username)
            // setMyProfile(profile)    
            console.log("profile role : ",profile?.profile.role)
        } else {
            setMyProfile(null)    
            console.log('there is no profile ')
        }
  
    }, [profile])

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
    </div>}

    if (isError) {
        return <div className='border-4 border-red-700 bg-white text-red-800'>
            <strong>{error}</strong>
        </div>
    }

    console.log("posts",posts);

    return (
        <div>
        <div className='w-[90%] m-auto'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='font-bold text-center text-[25px] flex items-center 
                 gap-2 ' >
                     {MyProfile?"Hey, "+MyProfile[0].toUpperCase()+MyProfile.slice(1):<span className='gap-2 flex items-center underline'> <Home /> Home</span>}
                </h1>
                <Button onClick={() => navigate(`/create`)} className='justify-self-end w-[70px] h-9 text-white p-2 font-bold'><Plus className='text-white m-1' /> Add</Button>
            </div>
            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {   
                    posts.map(p => (
                        <Course id={p._id} inCart={profile?.profile?.addToCart} thumbnail={p.thumbnail} price={p.price}
                            instructor={p.instructor} sellerAvatar={p.profilePicture} profileUsername={profile?.profile?.username} title={p.title}
                            createdAt={p.createdAt} key={ID++} />
                        
                    ))
                }
            </div>
            <Pagination className={"my-5"}>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#" >
                        2
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default Posts




