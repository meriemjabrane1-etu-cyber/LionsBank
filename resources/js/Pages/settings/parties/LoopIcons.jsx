import { AllImages } from '../../../../images/icons/Icons';
import LogoLoop from '../../../components/LogoLoop';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Iconsloop() {
    const logos = AllImages.map((img, index) => ({
        src: img,
        alt: `logo-${index}`
    }));
     useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true
        });
      }, []);
    return (
        <div className="bg-white text-black  py-5 space-y-8 " style={{
      backgroundColor: '#ffffff',
      backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
      backgroundSize: '40px 100%'}} 
      data-aos="fade-up"        >

            <h3 className='px-10'>Ils nous font confiance</h3>

            <div className="w-full overflow-hidden ">

                <LogoLoop
                    logos={logos}
                    speed={80}
                    direction="left"
                    logoHeight={30}
                    gap={50}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff" />
            </div>

        </div>

    );
}