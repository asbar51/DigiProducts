import { Link, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from "../ui/dropdown-menu";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog"
import { DollarSign,Settings, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useDeletePostMutation, useGetAllPostsQuery } from "../../services/postApi";
import { useEffect, useState } from "react";


const Course = ({thumbnail,title,createdAt,price,reviews,id,profileUsername,instructor}) => {
  const navigate = useNavigate()

  let {data:posts,refetch} = useGetAllPostsQuery()
  const [deletePost,{isLoading:isLoadingD,isError:isErrorD,error:errorD}] = useDeletePostMutation()

  const date = new Date(createdAt)
  const formattedDate = formatDistanceToNow(date, { addSuffix:true })
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      console.log('Post deleted successfully');
      refetch()
      
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};
  // console.log("_____________");
  // console.log("instructor: ", instructor)
  // console.log("profileUsername: ", profileUsername)
  return (
    <div>
      <Card className="w-[100%]  m-auto border-solid border-1 border-gray-600 rounded 
      shadow-lg shadow-gray-500/50">
        {
          (thumbnail?
          <img src={`http://localhost:3000/uploads/images/${thumbnail}`} onClick={()=> navigate(`/posts/${id}`)} className="w-full  h-[150px] object-fill"/>
          : null)
        }
        <CardHeader className="h-auto p-1">
          <CardDescription className='flex justify-between  text-[15px] font-bold'>
            <span className="hover:underline cursor-pointer">{instructor}</span>
            <span className='flex items-center text-black'> 5.0 <Star className="h-5" fill='black' strokeWidth={0} /> (75)</span>
          </CardDescription>
          <CardTitle onClick={()=> navigate(`/posts/${id}`)} className='cursor-pointer text-[18px] h-[50px] hover:underline'>{title}</CardTitle>
          <CardDescription onClick={()=> navigate(`/posts/${id}`)} className='cursor-pointer flex items-center text-[20px] font-bold'>
            <span>{price}</span>
            <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
          </CardDescription>
        </CardHeader>
        
        <CardFooter className="flex justify-between items-center h-5 px-1 mt-3 text-[13px]">
          <span>{formattedDate}</span>
        { 
      profileUsername == instructor ?
      <span>
        <DropdownMenu > 
          <DropdownMenuTrigger className="bg-white font-bold text-[15px] rounded-full px-1 py-1 
          cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 bg-white">
            <DropdownMenuItem className={`text-[16px] hover:bg-gray-300 cursor-pointer font-bold flex justify-center w-full`} onClick={() => navigate(`/update/${id}`)}>
              {/* <Link to={`/update/${id}`} > */}
                Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
               <AlertDialog>
                  {/* <DropdownMenuItem className={`cursor-pointer font-bold w-100`}> */}
                <AlertDialogTrigger className={`text-[16px] hover:bg-gray-300 cursor-pointer font-bold w-full`}>
                        Delete
                </AlertDialogTrigger>
                  {/* </DropdownMenuItem> */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[15px]">
                      This action will permanently delete your
                      post and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600" onClick={() => {
                        try {
                          handleDelete(id)
                          .then(() => {
                            console.log('Post is deleted successfully');
                            // location.assign('/')
                          })
                        } catch (error) {
                          console.error('Error deleting post:', error);
                        }
                      }}>Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                
          </DropdownMenuContent>
        </DropdownMenu>
      
      </span>
      :null
    } 
    </CardFooter>
        
    </Card>
      
    </div>
  )
}

export default Course