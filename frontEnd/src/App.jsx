import CreateStepOne from "./components/posts/Create";
import Navebare from "./components/Navebare";
import PostDetails from "./components/posts/PostDetails";
import Update from "./components/posts/Update";
import Posts from "./components/posts/Posts";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from "./components/profile/SignUp";
import Login from "./components/profile/LogIn";
import Profile from "./components/profile/Profile";


export default function App() {
  return (
    <BrowserRouter>
    <Navebare />
    <Routes>
      <Route path="/" element={<Posts/>}/>
      <Route path="/create" element={<CreateStepOne/>}/>
      <Route path="/update/:id" element={<Update/>}/>
      <Route path="/posts/:id" element={<PostDetails/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profile/sign_up" element={<SignUp/>}/>
      <Route path="/profile/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}