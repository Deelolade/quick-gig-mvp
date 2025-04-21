import React from 'react'

const Footer = () => {
    const today = new Date();
    return (
        <>
            <footer className='pt-12 bg-black border-t border-white/10 bg-gradient-to-b from-black/40 to-purple-800/35'>
                <div className="w-[70vw]  mx-auto">
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
                        <ul className='text-gray-300 text-md mt-3'>
                            <li>Facebook</li>
                            <li>X</li>
                            <li>Instagram</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
                <div className=" flex justify-center items-center h-[8vh] border-t border-white/10 text-white text-lg  ">
                    <span>
                        &copy; {today.getFullYear()} All rights reserved.
                    </span>
                </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
