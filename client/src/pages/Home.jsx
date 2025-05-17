import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IoSparklesOutline } from "react-icons/io5";
import { SiMarketo } from "react-icons/si";
import { FaSignsPost, FaMoneyBillTrendUp, FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiLightningBold } from "react-icons/pi";
import { GiBrain } from "react-icons/gi";
import { LuMessagesSquare } from "react-icons/lu";
import { GrSatellite } from "react-icons/gr";
import { GiNigeria } from "react-icons/gi";
import { FaSearchDollar } from "react-icons/fa";
import Homevideo from "../assets/home-video.mp4";
import Footer from "../components/Footer";

const Home = () => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
    const { ref: refOne, inView: inviewOne } = useInView({ triggerOnce: false, threshold: 0.2 });
    const { ref: refTwo, inView: inviewTwo } = useInView({ triggerOnce: false, threshold: 0.2 });
    const { ref: refThree, inView: inviewThree } = useInView({ triggerOnce: false, threshold: 0.2 });

    return (
        <>
            <Navbar />
            <div className=" bg-black  h-auto  md:p-5 max-w-full">
                <div className=" bg-black min-h-screen mx-auto max-w-6xl  overflow-hidden py-28">
                    <div className="flex inset-0 -z-10 overflow-hidden">
                        <div className="absolute -z-10 inset-0 bg-red-300"></div>
                        <div className="absolute -z-9 top-36 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                        <div
                            className="absolute -z-9 top-[120vh] left-5 md:top-[90vh] md:left-[30%] lg:left-4 w-52 h-52 md:w-96 md:h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
                            style={{ animationDelay: "2s" }}
                        ></div>
                        <div
                            className=" hidden md:block absolute -z-9 md:top-[40%] md:left-2.5 lg:left-1/3 w-5 md:w-96 md:h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
                            style={{ animationDelay: "4s" }}
                        ></div>
                    </div>
                    <div className="absolute inset-0 -z-5 ">
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.24227px",
                                height: "3.15559px",
                                top: "35.8193%",
                                left: "54.2871%",
                                animation:
                                    "14.4569s linear 6.52965s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.24227px",
                                height: "5.15559px",
                                top: "87.8193%",
                                left: "92.2871%",
                                animation:
                                    "14.4569s linear 6.52965s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.24227px",
                                height: "3.15559px",
                                top: "35.8193%",
                                left: "54.2871%",
                                animation:
                                    "14.4569s linear 6.52965s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "3.5452px",
                                height: "4.41452px",
                                top: "87.2023%",
                                left: "25.1407%",
                                animation:
                                    "18.1903s linear 8.54762s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.25555px",
                                height: "2.37475px",
                                top: "99.7318%",
                                left: "87.3224%",
                                animation:
                                    "18.1903s linear 8.81791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.25555px",
                                height: "4.93153px",
                                top: "95.7318%",
                                left: "53.0101%",
                                animation:
                                    "19.1903s linear 8.51791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.25555px",
                                height: "4.93153px",
                                top: "50.7318%",
                                right: "19.0101%",
                                animation:
                                    "19.1903s linear 8.51791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "4.45555px",
                                height: "2.43153px",
                                top: "18.7318%",
                                left: "62.0101%",
                                animation:
                                    "14.1903s linear 9.51791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.45555px",
                                height: "4.83153px",
                                top: "80.7318%",
                                right: "28.0101%",
                                animation:
                                    "15.6903s linear 4.51791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.45555px",
                                height: "4.83153px",
                                top: "80.7318%",
                                left: "28.0101%",
                                animation:
                                    "15.6903s linear 4.51791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.65555px",
                                height: "2.83153px",
                                top: "97.0318%",
                                left: "16.0101%",
                                animation:
                                    "19.6903s linear 9.71791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "3.25555px",
                                height: "3.83153px",
                                top: "80.0318%",
                                left: "30.0101%",
                                animation:
                                    "16.6903s linear 4.71791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "4.25555px",
                                height: "4.83153px",
                                top: "31.0318%",
                                left: "47.1901%",
                                animation:
                                    "16.6903s linear 0.71791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.5555px",
                                height: "1.83153px",
                                top: "89.0318%",
                                left: "70.1901%",
                                animation:
                                    "10.6903s linear 5.71791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.5555px",
                                height: "2.04799px",
                                top: "78.0318%",
                                left: "35.1901%",
                                animation:
                                    "18.6903s linear 2.71791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.21551px",
                                height: "3.66676px",
                                top: "13.0318%",
                                left: "45.1901%",
                                animation:
                                    "19.6903s linear 6.31791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.21551px",
                                height: "2.96676px",
                                top: "23.0318%",
                                left: "66.1901%",
                                animation:
                                    "10.6903s linear 1.81791s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "1.21551px",
                                height: "3.6676px",
                                top: "45.918%",
                                left: "25.1901%",
                                animation:
                                    "19.6903s linear 3.94468s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "4.21551px",
                                height: "4.6676px",
                                top: "95.918%",
                                left: "2.62764%",
                                animation:
                                    "15.6903s linear 6.94468s infinite normal none running floatParticle",
                            }}
                        ></div>
                        <div
                            className="absolute bg-white rounded-full opacity-30 "
                            style={{
                                width: "2.21551px",
                                height: "3.6676px",
                                top: "35.918%",
                                left: "54.1901%",
                                animation:
                                    "14.6903s linear 6.94468s infinite normal none running floatParticle",
                            }}
                        ></div>
                    </div>
                    <div className="flex flex-col">
                        <motion.div
                            ref={refOne}
                            initial={{ opacity: 1, y: 20 }}
                            animate={inviewOne ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className=" text-white relative  z-10 mx-auto  text-left-center flex flex-col  justify-center items-center ">
                            <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8 whitespace-nowrap max-w-full">
                                <IoSparklesOutline className="mx-2 text-pink-500 font-bold" />
                                <span className="text-[13px] md:text-sm">QuickGig — Freelance. Fast. Together.</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight text-center">
                                Hire fast.{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                                    Connect deeply.
                                </span>{" "}
                                Work smart.
                            </h1>
                            <div className="">
                                <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto text-center">
                                    QuickGig is the freelance marketplace to collaborate, connect, and
                                    grow. Need a quick fix or a fresh logo? Want to share ideas or
                                    trends? QuickGig is built for you.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                    <Link
                                        to="/role"
                                        className="text-white items-center  bg-gradient-to-r from-purple-600 to-pink-500  text-xl font-bold rounded-lg  px-6 py-3  relative transition-transform duration-300"
                                    >
                                        <span>
                                            Start Hiring <FaArrowRightLong className="inline " />{" "}
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
                                    </Link>
                                    <Link
                                        to="/role"
                                        className=" py-3 px-6 items-center rounded-lg border border-gray-600 text-xl font-bold"
                                    >
                                        See ChatRooms
                                        <SiMarketo className="inline ms-2" />
                                    </Link>
                                </div>
                                <div className="grid  grid-cols-2 md:grid-cols-3 mt-8 gap-x-4 ">
                                    <div className="px-4 py-2 min-h-[48px] bg-purple-900/30 backdrop-blur-sm border justify-center flex items-center space-x-2 border-purple-800 rounded-full">
                                        {" "}
                                        <FaSignsPost className="text-pink-500 font-bold  text-xl" />
                                        <span className="font-semibold text-[15px] text-gray-300 whitespace-nowrap">
                                            Post a Gig
                                        </span>{" "}
                                    </div>
                                    <div className="px-4 py-2 min-h-[48px] bg-purple-900/30 backdrop-blur-sm border flex  justify-center items-center space-x-2 border-purple-800 rounded-full">
                                        {" "}
                                        <FaSearchDollar className="text-blue-500 font-bold text-xl" />
                                        <span className="font-semibold text-[15px] text-gray-300 whitespace-nowrap">
                                            Find Work
                                        </span>{" "}
                                    </div>
                                    <div className="col-span-2 md:col-span-1 flex justify-center md:justify-normal">
                                        <div className="md:w-full mt-3 md:mt-0 px-4 py-2 min-h-[48px] bg-purple-900/30 backdrop-blur-sm border flex justify-center items-center space-x-2 border-purple-800 rounded-full">
                                            {" "}
                                            <HiOutlineUserGroup className="text-yellow-500 font-bold text-xl" />
                                            <span className="font-semibold text-[15px] text-gray-300 whitespace-nowrap">
                                                Join The Space
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative z-20 md:w-[700px] lg:w-[100%] mx-auto max-w-full">
                            <div className="right-2 absolute z-20 top-12   animate-float  " style={{ animationDelay: "1.2s", animationDuration: "4s" }}>
                                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-lg shadow-lg rotate-6">
                                    <div className="bg-gray-900 p-3 rounded-md ">
                                        <IoSparklesOutline className=" text-pink-500 text-2xl z-30" />
                                    </div>
                                </div>
                            </div>
                            <div className="-bottom-0 left-1 absolute  animate-float z-20 " style={{ animationDelay: "1.2s", animationDuration: "4s" }}>
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-1 rounded-lg shadow-lg rotate-6">
                                    <div className="bg-gray-900 p-3 rounded-md ">
                                        <PiLightningBold className=" text-blue-500 text-2xl z-30" />
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                ref={refOne}
                                initial={{ opacity: 0, y: 0 }}
                                animate={inviewOne ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className=" z-10 mt-12 flex relative justify-center mx-auto">
                                <video src={Homevideo} className="max-w-6xl rounded-2xl z-50 lg:h-[100%] w-[90%] h-96 md:w-[700px] lg:w-[85%] mx-auto" autoPlay loop playsInline muted></video>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-blue-950 h-auto py-24 bg-gradient-to-b  mx-auto from-black/40 to-purple-800/35">
                <motion.div
                    ref={refTwo}
                    initial={{ opacity: 0, y: 0 }}
                    animate={inviewTwo ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className=" flex justify-center items-center flex-col">
                    <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8  whitespace-nowrap max-w-full">
                        <IoSparklesOutline className="mx-2 text-pink-500 font-bold" />
                        <span className="text-[13px] md:text-sm">Why QuickGig — Freelance. Fast. Together.</span>
                    </div>
                    <h1 className=" text-2xl md:text-5xl font-extrabold  text-white text-center ">
                        Why Choose{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                            QuickGig?
                        </span>
                    </h1>
                    <p className="text-sm px-2 md:text-lg text-gray-200 text-center mt-5 max-w-3xl">
                        QuickGig is the freelance marketplace that brings Clients and
                        Freelancers together not just to work—but to collaborate, connect,
                        and grow. Need a quick fix or a fresh logo? Want to share ideas or
                        trends? QuickGig is built for you.
                    </p>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 0 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="grid grid-cols-1 max-w-6xl gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 w-[95vw] mx-auto my-10">
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <PiLightningBold className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                {" "}
                                Fast Turnaround
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                Post your gig in just a few clicks and start receiving proposals
                                within minutes. Whether it’s a quick task or a long-term
                                project, get connected to eager freelancers ready to work—no
                                waiting around.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <GiBrain className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                The Space – Community Driven
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                Engage with fellow users in our open community chatroom. Ask
                                questions, share updates, or just vibe with others in the
                                QuickGig ecosystem. It's a space to connect, collaborate, and
                                grow together.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <LuMessagesSquare className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                {" "}
                                Real-Time Messaging
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                Collaborate without delays using our built-in live chat system.
                                Send instant messages, share files, and keep your projects
                                moving forward with smooth and uninterrupted communication.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <GrSatellite className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                Real-Time Messaging
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                Collaborate without delays using our built-in live chat system.
                                Send instant messages, share files, and keep your projects
                                moving forward with smooth and uninterrupted communication.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <FaMoneyBillTrendUp className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                Simple & Secure Payments
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                Our payment system ensures safe and secure transactions for both
                                clients and freelancers. Pay only when the job is done to your
                                satisfaction, and withdraw earnings effortlessly.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0">
                        <div className="text-purple-500 font-bold text-3xl bg-purple-950  h-12 w-12 rounded-lg flex items-center justify-center">
                            <GiNigeria className="  rounded-lg  " />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-semibold text-white">
                                Built for Nigeria
                            </h4>
                            <p className="text-gray-200 leading-7 mt-2">
                                QuickGig is tailored for the Nigerian freelance
                                market—local-friendly, culturally aware, and community-first.
                                Whether you're a freelancer or a client, everything is built to
                                work seamlessly for you.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
            <section className="bg-blue-950  h-auto py-24 bg-gradient-to-tr mx-auto overflow-hidden from-black/40 via-purple-600/30  to-purple-800/35">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative max-w-6xl mx-auto ">
                    <div className=" flex justify-center items-center flex-col mb-8">
                        <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8 whitespace-nowrap max-w-full">
                            <IoSparklesOutline className="mx-2 text-pink-500 font-bold" />
                            <span className="text-[13px] md:text-sm">QuickGig — Freelance. Fast. Together.</span>
                        </div>
                        <h1 className="text-2xl md:text-5xl font-extrabold  text-white text-center ">
                            How {" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                                QuickGig?
                            </span> Works
                        </h1>
                        <p className="text-sm md:text-lg text-gray-200 text-center mt-5 max-w-3xl">
                            QuickGig is the freelance marketplace that brings Clients and
                            Freelancers together not just to work.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12  ">
                        {/* <div className="w-full absolute top-1/2 h-[3px] bg-purple-900/60 backdrop-blur-sm " /> */}
                        <div className="text-center ">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full mx-auto bg-purple-500 bg-gradient-to-br via-blue-600/30 to-blue-600/60 text-center flex items-center justify-center text-white text-xl font-bold ">
                                    1
                                </div>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse"> </span>
                            </div>
                            <h4 className="text-white text-2xl font-bold my-5 ">Hire fast.</h4>
                            <p className=" text-gray-400 text-sm md:text-lg p-2 md:p-0">Post your gig in just a few clicks and start receiving proposals within minutes.</p>
                        </div>
                        <div className="text-center ">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full mx-auto bg-purple-500 bg-gradient-to-br via-blue-600/30 to-blue-600/60 text-center flex items-center justify-center text-white text-xl font-bold ">
                                    2
                                </div>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse"> </span>
                            </div>
                            <h4 className="text-white text-2xl font-bold my-5">Work Smart.</h4>
                            <p className=" text-gray-400 text-sm md:text-lg p-2 md:p-0"> Ask questions, share updates, or just vibe with others in the QuickGig ecosystem.</p>
                        </div>
                        <div className="text-center ">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full mx-auto bg-purple-500 bg-gradient-to-br via-blue-600/30 to-blue-600/60 text-center flex items-center justify-center text-white text-xl font-bold ">
                                    3
                                </div>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse"> </span>
                            </div>
                            <h4 className="text-white text-2xl font-bold my-5">Get gigs done.</h4>
                            <p className=" text-gray-400 text-sm md:text-lg  p-2 md:p-0">Send instant messages, share files, and keep your projects moving forward with smooth communication.</p>
                        </div>
                    </div>
                    <div className="flex mt-16 mx-auto justify-center ">
                        <button className="flex items-center  px-7 py-3 text-xl font-semibold rounded-md text-white bg-blue-800 bg-gradient-to-r from-purple-600  via-blue-500 to-blue-600 opacity-90 hover:opacity-100">
                            Get Started <FaArrowRightLong className="ms-3" />
                        </button>
                    </div>
                </motion.div>
            </section>
            <section className="bg-blue-950 h-auto py-16 bg-gradient-to-t">
                <motion.div
                    ref={refThree}
                    initial={{ opacity: 0, y: 100 }}
                    animate={inviewThree ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="my-24 flex justify-center items-center flex-col">
                    <div className="inline-flex items-center px-4 py-2 text-white bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8 whitespace-nowrap max-w-full">
                            <IoSparklesOutline className="mx-2 text-pink-500 font-bold" />
                            <span className="text-[13px] md:text-sm">QuickGig — Freelance. Fast. Together.</span>
                        </div>
                    <h1 className="md:text-5xl text-xl   font-bold text-white leading-tight text-center">
                        Get Started With{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                            Quick-Gig
                        </span>{" "}
                        Today.
                    </h1>
                    <p className="mt-6  text-sm p-2 md:text-lg text-gray-300 max-w-4xl mx-auto text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                        iure quod assumenda aliquam voluptates sed reiciendis eligendi
                        repudiandae corporis labore.
                    </p>
                    <div className="flex mt-5">
                        <button className="flex items-center  px-7 py-3 text-xl font-semibold rounded-md text-white bg-blue-800 bg-gradient-to-r from-purple-600  via-blue-500 to-blue-600 opacity-90 hover:opacity-100">
                            Get Started <FaArrowRightLong className="ms-3" />
                        </button>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
