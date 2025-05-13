import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaInstagram, FaSearchDollar ,FaFacebookSquare } from "react-icons/fa";


const Footer = () => {
    const today = new Date();
    return (
        <>
            <footer className='pt-12 px-6 bg-black border-t mx-auto border-white/10 bg-gradient-to-b from-black/40 to-purple-800/35'>
                <div className="max-w-6xl  mx-auto">
                <div className="grid lg:flex justify-between lg:grid-cols-4  mt-5 mb-8 gap-7">
                    <div className="">
                        <h5 className='text-gray-300 text-2xl font-bold '>Quick-Gig</h5>
                        <p className='w-[300px] text-gray-300 text-[15px] pt-4 font-semibold'>Connecting talented Freelancers and Clients for fast and efficient project delivery.</p>
                    </div>
                    <div className="">
                        <h5 className='text-gray-300 text-xl font-bold'>Company</h5>
                        <ul className='text-gray-400 text-[15px] mt-3 font-semibold '>
                            <li className='hover:text-white leading-7'>About Us</li>
                            <li className='hover:text-white leading-7'>Careers</li>
                            <li className='hover:text-white leading-7'>Blog</li>
                            <li className='hover:text-white leading-7'>Contact</li>
                        </ul>
                    </div>
                    <div className="">
                        <h5 className='text-gray-300 text-xl font-bold'>Support</h5>
                        <ul className='text-gray-400 text-[15px] mt-3 font-semibold'>
                            <li className='hover:text-white leading-7'>Help Center</li>
                            <li className='hover:text-white leading-7'>Terms & Conditions</li>
                            <li className='hover:text-white leading-7'>Privacy policy</li>
                            <li className='hover:text-white leading-7'>Report a problem</li>
                        </ul>
                    </div>
                    <div className="">
                        <h5 className='text-gray-300 text-xl font-bold'>Follow Us</h5>
                        <ul className='text-gray-300 text-3xl mt-3 flex  gap-3 font-bold'>
                            <li className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-sm"><FaFacebookSquare className=" text-gray-500 hover:text-blue-500"/></li>
                            <li className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-sm"><FaInstagram className="text-gray-500 hover:text-red-500"/></li>
                            <li className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-sm"><BsTwitterX className="text-gray-500 hover:text-black "/></li>
                            <li className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-sm"><FaLinkedin className="text-gray-500 hover:text-blue-600"/></li>
                        </ul>
                    </div>
                </div>
                <div className=" flex justify-center items-center h-[8vh] border-t border-white/10 text-white text-lg  ">
                    <span className='font-semibold'>
                        &copy; {today.getFullYear()} All rights reserved.
                    </span>
                </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
