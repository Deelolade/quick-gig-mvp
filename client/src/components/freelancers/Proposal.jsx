import React, { useState, useEffect } from 'react'
import FreelancerSideBar from '../freelancers/FreelancerSideBar'
import { useSelector } from 'react-redux';
import axios from 'axios';
import BottomMenu from './BottomMenu';


const Proposals = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(state => state.user)


  // Replace this with actual current user ID from your auth state/store
  const freelancerId = currentUser._id;

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/proposals/${currentUser._id}`,
          { withCredentials: true }
        );
        setProposals(res.data);
        console.log(res.data);
        localStorage.setItem("cached_proposal", JSON.stringify(res.data))
      } catch (err) {
        setError("Failed to load proposals");
        const cachedData = localStorage.getItem("cached_proposal")
        if(cachedData){
          setProposals(JSON.parse(cachedData))
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [freelancerId]);


  return (
    <>
    <div className='lg:flex lg:justify-between  '>
      <FreelancerSideBar />
      <div className="dashboard lg:w-[85%] bg-gray-100 min-h-screen">
          <nav className='h-[8vh] w-full lg:w-[85vw] py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20'>
            <h1 className='md:text-xl font-semibold'>Proposals</h1>
            <button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition'>Refer a Client</button>
          </nav>
        <div className="max-w-4xl mx-auto p-4 top-[10vh] relative ">
          <h1 className="text-3xl font-semibold mb-4">Your Sent Proposals</h1>
          {error  && <p className="text-red-500">{error}</p>}
          {proposals.length === 0 ||loading && <p>You haven't sent any proposals yet.</p>}
          <div className="pb-40 lg:pb-0">
          <ul className="space-y-4">
            {proposals.map((proposal) => (
              <li
                key={proposal._id}
                className="border rounded-md p-4 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-1">{proposal.gigId?.title || 'Untitled Gig'}</h2>
                <p className="mb-2 text-gray-700">{proposal.proposalText}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Budget: ${proposal.budget}</span>
                  <span>Duration: {proposal.duration} days</span>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Sent on: {new Date(proposal.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
        </div>
      </div>
    <BottomMenu/>
    </>
  )
}

export default Proposals
