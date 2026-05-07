import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
// import { AllImages} from '../../../../images/icons/Icons';
import { AllImages } from "../../../../images/icons/Icons";

export const Grands = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);
    return (
        <div className="pb-28">
    <div className="text-center space-y-5" data-aos="fade-up">
        <p>Manufacturing partners</p>
        <h3 className="font-bold text-6xl leading-16">
            The quality of the <br />
            world’s <span className="text-green-600 ">leading</span> manufacturers
        </h3>
    </div>

    <div className="mt-30 space-y-10 pb-10" data-aos="fade-up">
        <div className="flex justify-center items-center gap-24">

            {AllImages.slice(0, 4).map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`logo-${index}`}
                    className="h-14 "
                />
            ))}

        </div>

        <div className="flex justify-center items-center gap-24">

            {AllImages.slice(3, 5).map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`logo-${index}`}
                    className="h-14"
                />
            ))}

        </div>

        <div className="flex justify-center items-center gap-24">

            {AllImages.slice(0, 2).map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`logo-${index}`}
                    className="h-14"
                />
            ))}

        </div>

    </div>
</div>
    )
}