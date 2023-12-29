
import { Button } from './ui/button'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDeleteProfileMutation, useGetProfileQuery } from '../services/profileApi'
import { BellRing, Coins, DollarSignIcon, LogOut, LucideLoader2, Search, SettingsIcon, ShoppingCart, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useGetFromCartQuery } from '../services/postApi'

const Navebare = () => {
  const navigate = useNavigate()
  let [deleteProfile,{data:profileD,}] = useDeleteProfileMutation()

  const [MyProfile,setMyProfile] = useState(null)
  let {data:profile,isLoading,isError,error,refetch} = useGetProfileQuery()
  let {data:cart,refetch:refetchCart} = useGetFromCartQuery()
  
  useEffect(() => {
    if (profile  && profile !== "logout" ) {
      setMyProfile(profile.profile.username)
      console.log("profile logout : ",profile)
    } else {
      console.log("profile: ",profile)
      setMyProfile(null)
    }
  }, [profile])
  
  if (isLoading) {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
        <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
      </div>}

  // if (isError) {
  //     return <div className='border-4 border-red-700 bg-white text-red-800'>
  //         <strong>{error}</strong>
  //     </div>
  // }

  const logout = async (event) => {
    event.preventDefault()
    try {
      deleteProfile(MyProfile).then(async (res) => {
        console.log('Logout successfully');
        console.log('respond: ',res);
        await refetchCart();
        refetch().then(()=> {
          navigate('/')
          console.log("profiiiile: ", profile);
        })
        
      })
    } catch (error) {
        console.error('Error deleting post:', error);
    }
  }

  return (
    <div>
    <div className='w-[100%] h-[50px] bg-blue-700 flex justify-between px-5 items-center'>
        <div className='flex items-center'>
          <h1 className='text-white font-bold text-[25px] mr-20 cursor-pointer' onClick={() => navigate('/')}>Streamara</h1>
          <Input type='search' placeholder='Find digital Products' name="search" className='rounded-none border-[2px] h-[30px] w-[400px]'/><Search className=" bg-black cursor-pointer text-white mr-2 h-[30px] w-[35px] p-1"/>
        </div>
        <div className='flex gap-10'>
          <div className='flex gap-5'>
            <BellRing className='cursor-pointer' fill='white' stroke='white' />
            <ShoppingCart onClick={() => navigate('/profile/cart')} className='cursor-pointer' fill='white' stroke='white' />
            <p className='font-bold text-white'>Orders</p>
          </div>
          
          {
            MyProfile? 
            <div className=''>
              {/* <h1 className='font-bold'></h1>  */}
            <DropdownMenu >
            <DropdownMenuTrigger className="w-[30px] h-[30px] rounded-full cursor-pointer bg-white 
              flex items-center justify-center font-bold">
                <Avatar>
                  {profile?.profile?.profilePicture !="img" && profile?.profile?.profilePicture !="undefined"?
                  <AvatarImage src={`http://localhost:3000/uploads/images/${profile?.profile?.profilePicture}`} /> :
                  <AvatarFallback>{MyProfile[0].toUpperCase()}</AvatarFallback>}
                </Avatar>

              </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 bg-white">
            <DropdownMenuItem className={`font-bold w-100`}>
                <Link to={'/profile'} className={`flex font-bold w-100`}>
                  <User className="mr-2 h-4 w-4" />
                    My profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={'/profile/setting'} className={`flex font-bold w-100`}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className={`font-bold w-100`}>
                <Coins className="mr-2 h-4 w-4" />
                  Become a seller
              </DropdownMenuItem>

              <DropdownMenuItem className={`font-bold w-100`}>
                <DollarSignIcon className="mr-2 h-4 w-4" />
                  Paiments
              </DropdownMenuItem>
              
              <DropdownMenuItem variant="outline" onClick={logout} className={`cursor-pointer font-bold w-100`}>
                <LogOut className="mr-2 h-4 w-4" />
                logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            </div> 
              :
            <div> 
              <Button onClick={() => navigate('/login')} variant="outline" className='text-[15px] font-bold h-8 mr-2'>
                Login</Button>
              <Button onClick={() => navigate('/sign_up')} variant="outline" className='text-[15px] font-bold h-8'>Sign up</Button>
            </div>
          }
        </div>
    </div>
    <Outlet />
    </div>
  )
}

export default Navebare