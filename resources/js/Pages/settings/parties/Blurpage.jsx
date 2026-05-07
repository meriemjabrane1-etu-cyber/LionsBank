import GlobePulse from '@/components/ui/cobe-globe-pulse'
import ImageCard1 from '../../../../imagescards/TqKB2MXB9Ypk8MU21Qy95lO7kDI.avif';
import ImageCard2 from '../../../../imagescards/SbvtsdLqs8wlwLGNAb9QYezt97U.avif';
import ImageCard3 from '../../../../imagescards/pexels-saikat-das-298756534-13970482.jpg';
import ImageCard5 from '../../../../imagescards/goCcUZZcEdTaxyRTDIj931OoyFU.avif';
import ImageCard4 from '../../../../imagescards/pexels-sedanur-kunuk-78972032-35289992.jpg';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";



export default function Blur() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);
    return (
        <div className="relative min-h-screen bg-[#191919] pb-34"
        >
            <div className="absolute inset-0 flex justify-between " data-aos="fade-up">
                <div className="w-[1px] h-full bg-white opacity-10"></div>
                <div className="w-[1px] h-full bg-white opacity-10"></div>
                <div className="w-[1px] h-full bg-white opacity-10"></div>
                <div className="w-[1px] h-full bg-white opacity-10"></div>
            </div>

            <div className="flex justify-center relative" data-aos="fade-up">
                <div className="bg-[#22C55E] h-[1px] w-[60%] absolute top-[-40px]" style={{
                    boxShadow: '0 -20px 100px 100px #22C55E'
                }}>

                </div>
                <div className="bg-[#22C55E] h-[5vh] w-[95%]  " style={{
                    boxShadow: '0 0px 100px 100px #22C55E'

                }}></div>

            </div>

            <div className="flex justify-between mt-96 pt-24 px-10" data-aos="fade-up">
                <p >
                    Présence internationale
                </p>
                <div>
                    <h3 className="text-7xl font-bold "><span className="text-[#22C55E] pe-5"> +5M</span>M2</h3>
                    <p className="text-end text-[#a7a3a2] text-lg">Facilities surface areas</p>
                    <p className="text-[#a7a3a2] text-lg">technical systems managed and maintained.</p>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen' data-aos="fade-up">
                <GlobePulse />
            </div>

            <div className='px-10 mt-26 flex justify-between items-center' data-aos="fade-up">
                <h3 className='text-4xl font-bold'>Let’s mobilize this <span className='text-[#22C55E]'>expertise</span><br />in support of your project</h3>
                <div className='flex space-x-10'>
                    <div className='flex items-center gap-4 '>
                        <p>Submit a project</p>
                        <div className='w-9 h-9 bg-[#22C55E] rounded-lg rounded-br-[15px]'></div>
                    </div>

                    <div className='flex items-center gap-4 bg-[#22C55E] px-5 py-1 rounded-[5px] rounded-br-[15px] '>
                        <p>Contact us</p>
                        <div className='w-9 h-9 bg-black rounded-[5px] rounded-br-[15px]'></div>
                    </div>
                </div>
            </div>

            <div className='pt-28' data-aos="fade-up">
                <p className='text-center'>Our achievements</p>
                <h3 className='text-center text-7xl font-bold'>Reference <span className='text-[#22C55E]'>projects</span></h3>
            </div>

            {/* cards */}

            <div className='pt-14 px-10'>
                <div className='flex items-end  gap-10'>
                    <div className='w-[50%]  bg-[#2c2c2cc6] space-y-3 px-5 py-5 rounded-[5px]'>
                        <div className=' w-full overflow-hidden'>
                            <img className='h-[600px] rounded-lg object-cover transition duration-500 cursor-pointer hover:scale-110' src={ImageCard1} alt="#" />

                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold text-2xl'>Le capitole</p>
                            <p className='text-gray-500'>Immobile tertiarie</p>
                        </div>
                        <p className='text-gray-500'>Nexity</p>
                    </div>

                    <div className='w-[50%]  bg-[#2c2c2cc6] space-y-3 px-5 py-5 rounded-[5px]'>
                        <div className=' w-full overflow-hidden'>
                            <img className='h-[400px]  rounded-lg object-cover transition duration-500 cursor-pointer hover:scale-110' src={ImageCard2} alt="#" />

                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold text-2xl'>Le capitole</p>
                            <p className='text-gray-500'>Immobile tertiarie</p>
                        </div>
                        <p className='text-gray-500'>Nexity</p>
                    </div>
                </div>

                <div className='w-full mt-10  bg-[#2c2c2cc6] space-y-3 px-5 py-5 rounded-[5px]'>
                    <div className=' w-full overflow-hidden'>
                        <img className='h-[800px] w-full rounded-lg object-cover transition duration-500 cursor-pointer hover:scale-110' src={ImageCard3} alt="#" />

                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold text-2xl'>Le capitole</p>
                        <p className='text-gray-500'>Immobile tertiarie</p>
                    </div>
                    <p className='text-gray-500'>Nexity</p>
                </div>

                <div className='flex items-end  gap-10 mt-10'>

                    <div className='w-[40%]  bg-[#2c2c2cc6] space-y-3 px-5 py-5 rounded-[5px]'>
                        <div className=' w-full overflow-hidden'>
                            <img className='h-[600px] w-full rounded-lg object-cover transition duration-500 cursor-pointer hover:scale-110' src={ImageCard4} alt="#" />

                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold text-2xl'>Le capitole</p>
                            <p className='text-gray-500'>Immobile tertiarie</p>
                        </div>
                        <p className='text-gray-500'>Nexity</p>
                    </div>
                    <div className='w-[55%]  bg-[#2c2c2cc6] space-y-3 px-5 py-5 rounded-[5px]'>
                        <div className=' w-full overflow-hidden'>
                            <img className='h-[400px] w-full  rounded-lg object-cover transition duration-500 cursor-pointer hover:scale-110' src={ImageCard5} alt="#" />

                        </div>
                        <div className='flex justify-between'>
                            <p className='font-bold text-2xl'>Le capitole</p>
                            <p className='text-gray-500'>Immobile tertiarie</p>
                        </div>
                        <p className='text-gray-500'>Nexity</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center  space-x-10 mt-20'>
                <div className='flex items-center gap-4 bg-[#22C55E] px-5 py-1 rounded-[5px] rounded-br-[15px] '>
                    <p>Contact us</p>
                    <div className='w-9 h-9 bg-black rounded-[5px] rounded-br-[15px]'></div>
                </div>
                <div className='flex items-center gap-4  '>
                    <p>Submit your project</p>
                    <div className='w-9 h-9 bg-[#22C55E] rounded-lg rounded-br-[15px]'></div>
                </div>
            </div>



        </div>
    )
}