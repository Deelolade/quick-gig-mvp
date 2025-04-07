import { Routes, Route, useNavigate } from 'react-router-dom'
import ClientDashboard from "../components/clients/ClientDashboard"
import ClientProfile from "../components/clients/ClientProfile"
import ClientGigs from "../components/clients/PostGig"
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
        </Routes>
    )
}

export default ClientRoutes
