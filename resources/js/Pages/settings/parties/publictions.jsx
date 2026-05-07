import ImgC1 from '../../../../images/pexels-willianjusten-16471906.jpg';
import ImgC2 from '../../../../images/pexels-introspectivedsgn-7260951.jpg';
import ImgC3 from '../../../../images/pexels-kellerchewning-16532437.jpg';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function Publiction() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return (
        <div className="bg-white text-black px-10 pt-20 min-h-screen relative">
            <div className="absolute inset-0 flex justify-between gap-10 " >
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
            </div>

            <div className="flex justify-between ">
                <p data-aos="fade-right">
                    News & Expertise
                </p>

                <button data-aos='fade-left' className="bg-[#151515] text-white py-2 cursor-pointer px-5 rounded-[5px] rounded-br-[15px] flex items-center gap-5 ">
                    Read all articles
                    <div className='w-8 h-8 bg-green-500 rounded-[5px] rounded-br-[10px]'></div>
                </button>
            </div>

            <h3 className="text-6xl font-bold">
                Our latest <span className="text-green-500 ">publications</span>
            </h3>

            <div className='flex justify-center mt-14  gap-10' data-aos="fade-up">
                <div className='w-96 h-96 relative overflow-hidden group  rounded-lg '>
                    <img src={ImgC2} alt="#" className='h-full w-full rounded-lg transition-transform duration-500 ease-out group-hover:scale-110' />
                    <h4 className='absolute bottom-10 text-white font-bold text-2xl left-5 z-10'>Ensuring continuity...</h4>
                    <p className='absolute bottom-4 text-gray-500 font-bold text-lg left-5 z-10'>Read article</p>

                    <div className='h-2 absolute bottom-0 w-full bg-green-500 ' style={{ boxShadow: '0px 0px 80px 80px #22C55E ' }}></div>
                </div>

                <div className='w-96 h-96 relative overflow-hidden group  rounded-lg '>
                    <img src={ImgC3} alt="#" className='h-full w-full rounded-lg transition-transform duration-500 ease-out group-hover:scale-110' />
                    <h4 className='absolute bottom-10 text-white font-bold text-2xl left-5 z-10'>Ensuring continuity...</h4>
                    <p className='absolute bottom-4 text-gray-500 font-bold text-lg left-5 z-10'>Read article</p>

                    <div className='h-2 absolute bottom-0 w-full bg-green-500 ' style={{ boxShadow: '0px 0px 80px 80px #22C55E ' }}></div>
                </div>

                <div className='w-96 h-96 relative overflow-hidden group  rounded-lg '>
                    <img src={ImgC1} alt="#" className='h-full w-full rounded-lg transition-transform duration-500 ease-out group-hover:scale-110' />
                    <h4 className='absolute bottom-10 text-white font-bold text-2xl left-5 z-10'>Ensuring continuity...</h4>
                    <p className='absolute bottom-4 text-gray-500 font-bold text-lg left-5 z-10'>Read article</p>

                    <div className='h-2 absolute bottom-0 w-full bg-green-500 ' style={{ boxShadow: '0px 0px 80px 80px #22C55E ' }}></div>
                </div>
            </div>

        </div>
    )
}