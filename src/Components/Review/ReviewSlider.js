import React from 'react'
import Slider from "react-slick";
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegStar } from "react-icons/fa6";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ReviewSlider = () => {
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
    return (
        <div className='container' style={{ paddingTop: '20px' }}>
            <div className='review' >
                <div style={{ textAlign: 'center', marginBottom: '60px' }} >
                    <h3 className='checkHead'>Check Out</h3>
                    <h1 className='checkReview mb-0'>Recent Review</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="295" height="18" viewBox="0 0 295 18" fill="none">
                        <path d="M284.801 0.285843L0.837891 17.9655H285.35C294.146 17.9655 297.554 6.52394 290.192 1.71093C288.595 0.667175 286.704 0.16731 284.801 0.285843Z" fill="#74CC7E" />
                    </svg>
                </div>

                <Slider {...settings} >
                    <div>
                        <section className='slider-content my-2 ' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />





                                    <div style={{ marginLeft: '10px' }} className='slider-font'>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive'>
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className='slider-content my-2 ' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />

                                    <div style={{ marginLeft: '10px' }}>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive'>
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className='slider-content my-2' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />

                                    <div style={{ marginLeft: '10px' }} className='slider-font'>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive'>
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className='slider-content my-2' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />

                                    <div style={{ marginLeft: '10px' }} className='slider-font'>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive'>
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className='slider-content my-2' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />

                                    <div style={{ marginLeft: '10px' }} className='slider-font'>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive' >
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className='slider-content my-2' >
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <img src='./reviewGirl.png' alt='' />

                                    <div style={{ marginLeft: '10px' }} className='slider-font'>
                                        <h5>Steffenina Seth</h5>
                                        <p>Lorem ipsum</p>
                                    </div>
                                </div>

                                <div className='starGive'>
                                    3.6  <FaRegStar style={{ color: '#F7BE16' }} />
                                </div>
                            </div>

                            <div >
                                <p className='text-slider'>Lorem ipsum Lorem ipsum Lorem ipsum
                                    Lorem ipsum Lorem ipsum ..</p>
                            </div>
                        </section>
                    </div>
                </Slider>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="91" height="25" viewBox="0 0 91 25" fill="none">
                        <circle opacity="0.5" cx="9.87597" cy="12.0496" r="9.87597" fill="#00818A" />
                        <circle cx="45.5002" cy="12.4023" r="12.345" fill="#00818A" />
                        <circle opacity="0.5" cx="81.124" cy="12.0496" r="9.87597" fill="#00818A" />
                    </svg>
                </div>
            </div>
        </div>
    );

}

export default ReviewSlider
