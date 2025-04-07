import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import FreelancerProfile from '../components/freelancers/FreelancerProfile'
import BrowseGigs from '../components/freelancers/BrowseGigs'
import FreelancersDashboard from '../components/freelancers/FreelancersDashboard'
import { useSelector } from 'react-redux'


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
            <Route path="post-gigs" element={<BrowseGigs />} />
        </Routes>
    )
}

export default FreelancerRoutes
