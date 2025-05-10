import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import RoleSelection from './pages/RoleSelection'
import ClientRoutes from './routes/ClientRoutes'
import FreelancerRoutes from './routes/FreelancerRoutes'
import ClientSignUp from "./pages/ClientSignUp"
import FreelancerSignUp from "./pages/FreelancerSignUp"
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ChatRoom from './pages/ChatRoom'

const client = new QueryClient({
  defaultOptions: {
    refetchWindowsFocus: true
  }
})
const App = () => {
  const { currentUser } = useSelector((state)=> state.user);
  return (
    <QueryClientProvider client={client}>
    <Router>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/role" element={<RoleSelection/>}/>
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/signup/client" element={<ClientSignUp/>}/>
        <Route path="/signup/freelancer" element={<FreelancerSignUp/>}/>


        {currentUser?.role === "client" && <Route path='/*' element={<ClientRoutes/>}/> }
        {currentUser?.role === "freelancer" && <Route path='/*' element={<FreelancerRoutes/>}/> }
        
      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App