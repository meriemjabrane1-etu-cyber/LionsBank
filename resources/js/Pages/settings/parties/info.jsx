import LogoLoop from '../../../components/LogoLoop';
import { AllImages } from '../../../../images/icons/Icons';
import IBM from '../../../../images/pexels-oussama-laabidate-109306894-20521950.jpg';
import AOS from "aos";
import "aos/dist/aos.css";
import { Grands } from "./grands";
import { useEffect } from "react";




export const Info = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);
    const logos = AllImages.map((img, index) => ({
        src: img,
        alt: `logo-${index}`
    }));
    return (
        <div className="px-10 relative min-h-screen bg-white text-black" >
            <div className="absolute inset-0 flex justify-between gap-10 " >
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
                <div className="w-[1px] h-full bg-gray-500 opacity-30"></div>
            </div>

            <div className="pt-60 flex justify-between pb-50 " data-aos="fade-left">
                <div className='w-[50%] space-y-5'>
                    <p>Regulatory requirements</p>
                    <h3 className="text-7xl font-bold">
                        Compliance<br /> and  equipment <br /><span className="text-[#22C55E]">certifications</span>
                    </h3>

                    <LogoLoop
                        logos={logos}
                        speed={80}
                        direction="left"
                        logoHeight={100}
                        gap={100}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        className='overflow-hidden mt-14'
                    />
                </div>

                <div className='relative w-[50%]' data-aos="fade-right">
                    <div className='bg-green-600 w-56 h-56 rounded-lg absolute top-[-100px] right-0 '></div>
                    <img src={IBM} alt="#" className='h-[500px] w-[75%] rounded-lg  absolute  right-10 ' />
                </div>
            </div>

            <Grands />
        </div>
    )
}