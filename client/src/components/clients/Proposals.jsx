import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientSideBar from './ClientSideBar'
import Modal from 'react-modal';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../redux/chat/chatSlice'
import {io} from "socket.io-client"


const Proposals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gigId } = useParams();
  const [proposals, setProposals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [sentInvites, setSentInvites] = useState({});
  const { currentUser } = useSelector(state => state.user)
  const socket = io('http://localhost:5500', {withCredentials:true})


  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true)
      try {
        console.log(currentUser)
        console.log(gigId)
        const res = await axios.get(`http://localhost:5500/api/proposals/client/${currentUser._id}`, {
          withCredentials: true,
        });
        setProposals(res.data);
        console.log(res.data)
        localStorage.setItem("cached_proposals", JSON.stringify(res.data))
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch proposals:', error);
        const cacheData = localStorage.getItem("cached_proposals")
        if (cacheData) {
          setProposals(JSON.parse(cacheData))
          setTimeout(() => {
            setLoading(false)
          }, 500)
          return;
        }
        setLoading(false)
      }
    };
    fetchProposals();
  }, []);
  const handleChatClick = (user) => {
      dispatch(addUser(user))
      navigate("/messages")
      socket.emit("chat_request", {
        from:currentUser,
        to: user._id
      })
      console.log("Client initiated chat with:", user._id);
      setSentInvites((prev) => ({...prev , [user._id]:true}))
    }
  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-[9999]">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <div className='flex justify-between  bg-gray-100 h-[100vh]'>
        <ClientSideBar />
        <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
          <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
            <h1 className='text-2xl font-semibold'>Proposals</h1>
            <div className="">
              <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
            </div>
          </nav>
          <section className='top-[8vh] relative p-8  bg-gray-100  mx-auto'>
            <div className="flex-1 p-8">
              {proposals.length > 0 && proposals ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal._id}
                      className="border p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={proposal.freelancerId?.profilePicture || 'https://via.placeholder.com/150'}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-lg font-semibold">
                            {proposal.freelancerId?.fullName || 'Unknown Freelancer'}
                          </h2>
                          <p className="text-gray-500 text-sm">{proposal.freelancerId?.email}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3">{proposal.proposalText}</p>

                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>Budget: ${proposal.budget}</span>
                        <span>Duration: {proposal.duration} days</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedProposal(proposal);
                          setIsOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
                : <div className="flex justify-center items-center h-[60vh]">
                  <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Proposals Yet</h2>
                    <p className="text-gray-500 mb-4">
                      You need to create a job before freelancers can send you proposals.
                    </p>
                    <Link
                      to="/post-gigs"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Create a Job
                    </Link>
                  </div>
                </div>}
            </div>
          </section>
        </div>
        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Proposal Details"
          className="bg-white w-[40vw] p-8 rounded-xl shadow-xl outline-none"
          overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        >
          {selectedProposal && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Proposal Details</h2>
              <p className="mb-2"><strong>Freelancer:</strong> {selectedProposal.freelancerId?.fullName}</p>
              <p className="mb-2"><strong>Email:</strong> {selectedProposal.freelancerId?.email}</p>
              <p className="mb-2"><strong>Budget:</strong> ${selectedProposal.budget}</p>
              <p className="mb-2"><strong>Duration:</strong> {selectedProposal.duration} days</p>
              <p className="mb-4"><strong>Proposal Text:</strong> {selectedProposal.proposalText}</p>

              <div className="flex w-auto justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => handleChatClick(selectedProposal.freelancerId)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}

export default Proposals
