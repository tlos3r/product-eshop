import "./slide.scss";
import { sliderData } from "./slide-data";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useState } from "react";
const Slide = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoSlide = true;
    let slideInterval;
    let intervalTime = 5000;
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };
    useEffect(() => {
        setCurrentSlide(0);
    }, []);
    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    useEffect(() => {
        if (autoSlide) auto();
        return () => clearInterval(slideInterval);
    }, [currentSlide, autoSlide, slideInterval]);
    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide;
                return (
                    <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                        {index === currentSlide && (
                            <>
                                <img src={image} alt="eShop" />
                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    <a href="#product" className="flex px-3 py-2 bg-blue-600 rounded-md">
                                        Mua ngay !
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default Slide;
