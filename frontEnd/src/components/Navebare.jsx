
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteProfileMutation, useGetProfileQuery } from '../services/profileApi'
import { DollarSignIcon, LogOut, LucideLoader2, SettingsIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { useEffect, useState } from 'react'

const Navebare = () => {
  const navigate = useNavigate()
  let [deleteProfile,{data:profileD,}] = useDeleteProfileMutation()

  const [MyProfile,setMyProfile] = useState(null)
  let {data:profile,isLoading,isError,error,refetch} = useGetProfileQuery()
  
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
    <div className='w-[100vw] h-[50px] bg-gray-900 flex justify-between px-5 items-center'>
        <h1 className='text-white font-bold text-[25px] cursor-pointer' onClick={() => navigate('/')}>Streamara</h1>
        <div>
          {
            MyProfile? 
            <div className=''>
              {/* <h1 className='font-bold'></h1>  */}
            <DropdownMenu >
            <DropdownMenuTrigger className="w-[30px] h-[30px] rounded-full cursor-pointer bg-white 
              flex items-center justify-center font-bold">{MyProfile[0].toUpperCase()}</DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={'/profile'} className={`flex font-bold w-100`}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </Link>
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
              <Button onClick={() => navigate('/profile/login')} variant="outline" className='text-[15px] font-bold h-8 mr-2'>Login</Button>
              <Button onClick={() => navigate('/profile/sign_up')} variant="outline" className='text-[15px] font-bold h-8'>Sign up</Button>
            </div>
          }
        </div>
    </div>
  )
}

export default Navebare