import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Bg_hero from "../../../../images/pexels-introspectivedsgn-6016962.jpg";
import './cotechniques.css';

export default function Techniques() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const slideHeight = container.clientHeight;
            const index = Math.round(scrollTop / slideHeight);
            setActiveIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const slides = [
        {
            id: 1,
            title: "Retail and Corporate Banking",
            description: "Provision of secure and reliable banking services for individuals, businesses, and large-scale financial operations across diverse sectors.",
        },
        {
            id: 2,
            title: "Digital Banking Solutions",
            description: "Design and delivery of modern digital platforms ensuring seamless transactions, secure access, and optimized customer experience.",
        },
        {
            id: 3,
            title: "Investment and Asset Management",
            description: "Strategic management of assets and investments with a focus on growth, risk control, and long-term financial performance.",
        },
        {
            id: 4,
            title: "Risk and Compliance",
            description: "Implementation of advanced regulatory frameworks ensuring compliance, security, and integrity across all financial operations.",
        },
        {
            id: 5,
            title: "Financial Advisory Services",
            description: "Expert advisory supporting complex financial projects with tailored solutions, strategic planning, and continuous guidance.",
        },
    ];

    const menuItems = [
        "Retail Banking",
        "Digital Banking",
        "Investment Services",
        "Risk & Compliance",
        "Financial Advisory",
    ];

    const scrollToSlide = (index) => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollTo({
            top: index * container.clientHeight,
            behavior: "smooth",
        });
    };

    return (
        <div
            className="bg-white text-black px-10 pt-5 pb-34"
            style={{
                backgroundColor: '#ffffff',
                backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 100%',
            }}
        >
            <div
                data-aos="fade-up" >

                <div className="space-y-5" data-aos="fade-right">
                    <p>Integrated multi-technical capabilities</p>
                    <h3 className="text-5xl font-bold">
                        Our <span className="text-[#22C55E]">Expertise</span>
                    </h3>
                    <p className="text-gray-500">
                        PEM AFRICA mobilizes all <br />
                        the necessary technical disciplines <br />
                        for the delivery and long-term sustainability of complex infrastructures.
                    </p>
                </div>

                <div className="flex mt-10 space-x-20 " >
                    {/* Left menu — highlight active item */}
                    <ul className="space-y-10 font-bold text-4xl">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => scrollToSlide(index)}
                                className="cursor-pointer transition-colors duration-300"
                                style={{
                                    color: activeIndex === index ? '#22C55E' : '#9CA3AF',
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* Right scrollable slides */}
                    <div
                        ref={scrollRef}
                        className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory no-scrollbar space-y-8"
                    >
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                className="snap-start h-screen flex flex-col justify-center space-y-8 px-8"
                            >
                                <h3 className="text-4xl font-black">{slide.title}</h3>
                                <p className="w-[75%]">{slide.description}</p>
                                <img src={Bg_hero} alt="#" className="w-[500px] h-[500px]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}