import { Routes, Route, useNavigate } from 'react-router-dom'
import ClientDashboard from "../components/clients/ClientDashboard"
import ClientProfile from "../components/clients/ClientProfile"
import ClientGigs from "../components/clients/PostGig"
import BrowseFreelancers from '../components/clients/BrowseFreelancers'
import Proposals from '../components/clients/Proposals'
import Messages from '../components/clients/Messages'
import Contracts from '../components/clients/Contracts'
import Payments from '../components/clients/Payments'
import { useSelector } from "react-redux"

const ClientRoutes = () => {
    const navigate = useNavigate
    const { currentUser } = useSelector((state) => state.user)

    if (currentUser?.role !== "client") {
        return navigate('/')
    }
    return (
        <Routes>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="post-gigs" element={<ClientGigs />} />
            <Route path="browse" element={<BrowseFreelancers />} />
            <Route path="proposals" element={<Proposals/>} />
            <Route path="messages" element={<Messages/>} />
            <Route path="contracts" element={<Contracts/>} />
            <Route path="payments" element={<Payments/>} />
            
        </Routes>
    )
}

export default ClientRoutes
