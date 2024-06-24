import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import './Review.css';
import { FaRegStar } from 'react-icons/fa6';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewSlider = () => {
    const sliderRef = useRef(null);
    const [activeCircle, setActiveCircle] = useState(1); // 0: left, 1: middle, 2: right

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Large devices (desktops, 992px and up)
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, // Medium devices (tablets, 768px and up)
                settings: {
                    slidesToShow: 1.5,
                },
            },
            {
                breakpoint: 576, // Small devices (landscape phones, 576px and up)
                settings: {
                    slidesToShow: 1,
                    dots: false, // Hide dots on small screens
                },
            },
        ],
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
        setActiveCircle(0);
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
        setActiveCircle(2);
    };

    const handleMiddle = () => {
        if(activeCircle==2)
            {
                sliderRef.current.slickPrev();
            }
        if(activeCircle==0)
            {
                sliderRef.current.slickNext();
            }
        setActiveCircle(1);
    };

    const getCircleStyle = (index) => {
        return activeCircle === index ? { opacity: 1, r: 12.345 } : { opacity: 0.5, r: 9.87597 };
    };

    return (
        <div className='container' style={{ paddingTop: '20px' }}>
            <div className='review'>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h3 className='checkHead'>Check Out</h3>
                    <h1 className='checkReview mb-0'>Recent Review</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="295" height="18" viewBox="0 0 295 18" fill="none">
                        <path d="M284.801 0.285843L0.837891 17.9655H285.35C294.146 17.9655 297.554 6.52394 290.192 1.71093C288.595 0.667175 286.704 0.16731 284.801 0.285843Z" fill="#74CC7E" />
                    </svg>
                </div>

                <Slider ref={sliderRef} {...settings}>
                    {/* Review Items */}
                    {[...Array(6)].map((_, index) => (
                        <div key={index}>
                            <section className='slider-content my-2'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center'>
                                        <img src='./reviewGirl.png' alt='' />
                                        <div style={{ marginLeft: '10px' }} className='slider-font'>
                                            <h5>Steffenina Seth</h5>
                                            <p>Lorem ipsum</p>
                                        </div>
                                    </div>
                                    <div className='starGive'>
                                        3.6 <FaRegStar style={{ color: '#F7BE16' }} />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ..</p>
                                </div>
                            </section>
                        </div>
                    ))}
                </Slider>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="28" viewBox="0 0 91 25" fill="none">
                        <circle
                            cx="9.87597"
                            cy="12.0496"
                            {...getCircleStyle(0)}
                            fill="#00818A"
                            onClick={handlePrev}
                        />
                        <circle
                            cx="45.5002"
                            cy="12.4023"
                            {...getCircleStyle(1)}
                            fill="#00818A"
                            onClick={handleMiddle}
                        />
                        <circle
                            cx="81.124"
                            cy="12.0496"
                            {...getCircleStyle(2)}
                            fill="#00818A"
                            onClick={handleNext}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ReviewSlider;
