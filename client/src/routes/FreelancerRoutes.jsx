import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import FreelancerProfile from '../components/freelancers/FreelancerProfile'
import BrowseGigs from '../components/freelancers/BrowseGigs'
import FreelancersDashboard from '../components/freelancers/FreelancersDashboard'
import { useSelector } from 'react-redux'
import Earning from '../components/freelancers/Earning'
import Contracts from '../components/clients/Contracts'
import Messages from '../components/freelancers/Messages'
import Proposal from '../components/freelancers/Proposal'


const FreelancerRoutes = () => {
  const navigate = useNavigate
    const { currentUser } = useSelector((state) => state.user)

    if (currentUser?.role !== "freelancer") {
        return navigate('/')
    }
    return (
        <Routes>
            <Route path="dashboard" element={<FreelancersDashboard />} />
            <Route path="profile" element={<FreelancerProfile />} />
            <Route path="browse-gigs" element={<BrowseGigs />} />
            <Route path="earnings" element={<Earning />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="messages" element={<Messages/>} />
            <Route path="proposals" element={<Proposal />} />
        </Routes>
    )
}

export default FreelancerRoutes
