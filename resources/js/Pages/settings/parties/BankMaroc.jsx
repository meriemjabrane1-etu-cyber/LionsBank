"use client"
import BgImage2 from "../../../../images/pexels-introspectivedsgn-6016962.jpg";
import Iconsloop from './LoopIcons';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUpModule from "react-countup";


export default function BankMaroc() {
  const CountUp = CountUpModule.default;


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);






  return (
    <div
      className="px-10 py-5"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '40px 100%'
      }}
    >

      <div className="flex">
        {/* LEFT SECTION */}
        <section className="text-black space-y-10 w-[70%]" data-aos="fade-right" >

          <div  >
            <p className="text-sm">Déploiement Afrique</p>

            <h3 className="text-5xl font-bold leading-tight">
              Structured engineering <br />
              for the challenges of the <br />
              <span className="text-[#22C55E]">region</span> across the <br />
              African continent
            </h3>
          </div>

          <div className="flex items-center gap-14">

            <div>
              <p className="text-5xl font-bold text-[#22C55E]">
                <CountUp start={0} end={23} duration={5} enableScrollSpy scrollSpyOnce />+
              </p>
              <p className="text-2xl font-bold">
                Année <br /> d'expertise
              </p>
            </div>


            <p className="w-[50%] text-gray-500">
              LionsBank delivers secure and reliable financial services across the
              African continent. We support large-scale projects requiring strong
              regulatory compliance, advanced financial expertise, and continuous
              service excellence.
            </p>


          </div>
        </section>

        {/* RIGHT IMAGE */}
        <div
          className="h-[500px]  w-[400px] bg-cover bg-center rounded-lg relative right-28"
          style={{ backgroundImage: `url(${BgImage2})` }}
          data-aos="fade-left"
        >
          <div className="w-[250px] h-[250px] bg-[#22C55E] relative flex justify-center ps-8 flex-col gap-5 rounded-lg top-44 right-[-250px] z-30 ">
            <p className="text-3xl font-bold">LionsBank</p>
            <p>
              Trusted banking solutions <br />
              for the financial needs <br />
              of the African continent
            </p>
          </div>
        </div>
      </div>

      <Iconsloop />
    </div>
  );
}