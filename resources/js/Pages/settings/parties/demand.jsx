import ImgContact from '../../../../images/pexels-aybike-ozturk-42035594-27045538.jpg';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';


export default function ContactSection() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center pt-50 pb-14 bg-[#030a06] overflow-hidden">
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-3xl text-white px-6 " data-aos='fade-up' >

                {/* Titles */}
                <p className=" mb-3 text-center">Get in touch</p>

                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight text-center">
                    Let’s start your <br />
                    next <span className='text-green-500'>technical</span> project
                </h2>

                {/* Form */}
                <div className="space-y-5">

                    {/* Row inputs */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='w-full flex-col items-start space-y-5'>
                            <label className='text-lg font-bold'>Full name*</label>
                            <input
                                type="text"
                                placeholder="Your first and last name"
                                className="w-full  border border-gray-400/40 px-4 py-3 rounded-lg 
              outline-none text-white placeholder-gray-300
              focus:border-green-500 focus:bg-transparent transition"
                            />
                        </div>

                        <div className='w-full flex-col items-start space-y-5'>
                            <label className=' text-lg font-bold'>Professional email</label>

                            <input
                                type="email"
                                placeholder="your.email@gmail.com"
                                className="w-full  border border-gray-400/40 px-4 py-3 rounded-lg 
              outline-none text-white placeholder-gray-300
              focus:border-green-500 focus:bg-transparent transition"
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <label className='text-lg font-bold'>Subject</label>
                    <input
                        type="text"
                        placeholder="Type of project or need (maintenance, installation, audit…)"
                        className="w-full  border border-gray-400/40 px-4 py-3 rounded-lg 
            outline-none text-white placeholder-gray-300
            focus:border-green-500 focus:bg-transparent transition"
                    />

                    {/* Textarea */}
                    <label className=' text-lg font-bold'>Project details</label>
                    <textarea
                        rows="5"
                        placeholder="Briefly describe your site, technical constraints, and deadlines"
                        className="w-full border border-gray-400/40 px-4 py-3 rounded-lg 
            outline-none text-white placeholder-gray-300 resize-none
            focus:border-green-500 focus:bg-transparent transition"
                    ></textarea>

                    {/* Button */}
                    <div className="flex justify-start">
                        <button
                            className="px-6 py-3 text-black hover:text-white rounded-[5px] rounded-br-[15px] bg-gray-600 hover:bg-green-600 
              transition duration-500 font-semibold"
                        >
                            Send request
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
