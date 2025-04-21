import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { IoSparklesOutline } from "react-icons/io5";
import { SiMarketo } from "react-icons/si";
import { FaSignsPost } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaSearchDollar } from "react-icons/fa";
import { PiLightningBold } from "react-icons/pi";
import { GiBrain } from "react-icons/gi";
import { LuMessagesSquare } from "react-icons/lu";
import { GrSatellite } from "react-icons/gr";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiNigeria } from "react-icons/gi";

import Homevideo from "../assets/home-video.mp4"

const Home = () => {
    return (
        <>
            <Navbar />
            <div className=" bg-black h-screen ">
                <div className="flex inset-0 -z-10 overflow-hidden">
                    <div className="absolute -z-10 inset-0 bg-black"></div>
                    <div className="absolute -z-9 top-36 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -z-9 bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
                    <div className="absolute -z-9 top-[40%] left-1/3 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "4s" }}></div>
                </div>
                <div className="absolute inset-0 -z-5">
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: "2.24227px", height: "3.15559px", top: "35.8193%", left: "54.2871%", animation: "14.4569s linear 6.52965s infinite normal none running floatParticle", }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '3.5452px', height: '4.41452px', top: '87.2023%', left: '25.1407%', animation: "18.1903s linear 8.54762s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.25555px', height: '2.37475px', top: '99.7318%', left: '87.3224%', animation: "18.1903s linear 8.81791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.25555px', height: '4.93153px', top: '95.7318%', left: '53.0101%', animation: "19.1903s linear 8.51791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.25555px', height: '4.93153px', top: '50.7318%', right: '19.0101%', animation: "19.1903s linear 8.51791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '4.45555px', height: '2.43153px', top: '18.7318%', left: '62.0101%', animation: "14.1903s linear 9.51791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.45555px', height: '4.83153px', top: '80.7318%', right: '28.0101%', animation: "15.6903s linear 4.51791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.45555px', height: '4.83153px', top: '80.7318%', left: '28.0101%', animation: "15.6903s linear 4.51791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.65555px', height: '2.83153px', top: '97.0318%', left: '16.0101%', animation: "19.6903s linear 9.71791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '3.25555px', height: '3.83153px', top: '80.0318%', left: '30.0101%', animation: "16.6903s linear 4.71791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '4.25555px', height: '4.83153px', top: '31.0318%', left: '47.1901%', animation: "16.6903s linear 0.71791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.5555px', height: '1.83153px', top: '89.0318%', left: '70.1901%', animation: "10.6903s linear 5.71791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.5555px', height: '2.04799px', top: '78.0318%', left: '35.1901%', animation: "18.6903s linear 2.71791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.21551px', height: '3.66676px', top: '13.0318%', left: '45.1901%', animation: "19.6903s linear 6.31791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.21551px', height: '2.96676px', top: '23.0318%', left: '66.1901%', animation: "10.6903s linear 1.81791s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '1.21551px', height: '3.6676px', top: '45.918%', left: '25.1901%', animation: "19.6903s linear 3.94468s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '4.21551px', height: '4.6676px', top: '95.918%', left: '2.62764%', animation: "15.6903s linear 6.94468s infinite normal none running floatParticle" }}></div>
                    <div className="absolute bg-white rounded-full opacity-30 " style={{ width: '2.21551px', height: '3.6676px', top: '35.918%', left: '54.1901%', animation: "14.6903s linear 6.94468s infinite normal none running floatParticle" }}></div>
                </div>
                <div className=' text-white relative h-auto z-10 mx-auto  top-52  text-left-center flex flex-col  justify-center items-center'>
                    <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8"><IoSparklesOutline className='mx-2' /><span>QuickGig — Freelance. Fast. Together.</span></div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight text-center">Hire fast. <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600'>Connect deeply.</span> Work smart.</h1>
                    <div className="">
                        <p className='mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto text-center'>QuickGig is the freelance marketplace to collaborate, connect, and grow. Need a quick fix or a fresh logo? Want to share ideas or trends? QuickGig is built for you.</p>
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <Link to="/role" className='text-white items-center  bg-gradient-to-r from-purple-600 to-pink-500  text-xl font-bold rounded-lg text-black px-6 py-3  relative transition-transform duration-300'><span>Start Hiring <FaArrowRightLong className='inline ' /> </span>
                                <span className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer'></span>
                            </Link>
                            <Link to="/" className=' py-3 px-6 items-center rounded-lg border border-gray-600 text-xl font-bold'>See MarketPlace<SiMarketo className='inline ms-2' /></Link>
                        </div>
                        <div className="flex justify-center items-center mt-8 space-x-4">
                            <div className="px-4 py-2 bg-purple-900/30 backdrop-blur-sm border flex items-center space-x-2 border-purple-800 rounded-full"> <FaSignsPost className='text-pink-500 font-bold text-xl' /><span className='font-semibold text-gray-300'>Post a Gig</span> </div>
                            <div className="px-4 py-2 bg-purple-900/30 backdrop-blur-sm border flex items-center space-x-2 border-purple-800 rounded-full"> <FaSearchDollar className='text-blue-500 font-bold text-xl' /><span className='font-semibold text-gray-300'>Find Work</span> </div>
                            <div className="px-4 py-2 bg-purple-900/30 backdrop-blur-sm border flex items-center space-x-2 border-purple-800 rounded-full"> <HiOutlineUserGroup className='text-yellow-500 font-bold text-xl' /><span className='font-semibold text-gray-300'>Join The Space</span> </div>
                        </div>
                    </div>


                </div>
                {/* <div className=" z-50">
                    <video src={Homevideo} autoPlay loop></video>
                </div> */}
            </div>
            <section className="bg-blue-950 h-auto py-24 bg-gradient-to-b from-black/40 to-purple-800/35">
                <div className=" flex justify-center items-center flex-col">
                    <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8"><IoSparklesOutline className='mx-2 text-pink-500 font-bold' /><span>Why QuickGig — Freelance. Fast. Together.</span>
                    </div>
                    <h1 className='text-5xl font-extrabold  text-white text-center '>Why Choose <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600'>QuickGig?</span></h1>
                    <p className='text-xl text-gray-200 text-center mt-5 max-w-3xl'>QuickGig is the freelance marketplace that brings Clients and Freelancers together not just to work—but to collaborate, connect, and grow. Need a quick fix or a fresh logo? Want to share ideas or trends? QuickGig is built for you.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 w-[80vw] mx-auto my-10">
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><PiLightningBold className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'> Fast Turnaround</h4>
                            <p className='text-gray-200 leading-7 mt-2'>Post your gig in just a few clicks and start receiving proposals within minutes. Whether it’s a quick task or a long-term project, get connected to eager freelancers ready to work—no waiting around.</p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><GiBrain className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'>The Space – Community Driven</h4>
                            <p className='text-gray-200 leading-7 mt-2'>Engage with fellow users in our open community chatroom. Ask questions, share updates, or just vibe with others in the QuickGig ecosystem. It's a space to connect, collaborate, and grow together.</p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><LuMessagesSquare className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'> Real-Time Messaging</h4>
                            <p className='text-gray-200 leading-7 mt-2'>Collaborate without delays using our built-in live chat system. Send instant messages, share files, and keep your projects moving forward with smooth and uninterrupted communication.</p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><GrSatellite className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'>Real-Time Messaging</h4>
                            <p className='text-gray-200 leading-7 mt-2'>Collaborate without delays using our built-in live chat system. Send instant messages, share files, and keep your projects moving forward with smooth and uninterrupted communication.</p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><FaMoneyBillTrendUp className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'>Simple & Secure Payments</h4>
                            <p className='text-gray-200 leading-7 mt-2'>Our payment system ensures safe and secure transactions for both clients and freelancers. Pay only when the job is done to your satisfaction, and withdraw earnings effortlessly.</p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className='text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center'><GiNigeria className="  rounded-lg  " /></div>
                        <div className="mt-4">
                            <h4 className='text-2xl font-semibold text-white'>Built for Nigeria</h4>
                            <p className='text-gray-200 leading-7 mt-2'>QuickGig is tailored for the Nigerian freelance market—local-friendly, culturally aware, and community-first. Whether you're a freelancer or a client, everything is built to work seamlessly for you.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-blue-950 h-auto py-24 bg-gradient-to-b from-black/40 to-purple-800/35'></section>
        </>
    )
}

export default Home
