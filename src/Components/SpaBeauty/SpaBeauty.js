import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './SpaBeauty.css'
const SpaBeauty = () => {
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },

        ],
    };


    return (
        <div className='Spa' >
            <div className='container'>
                <div className="row">

                    <div className='SpaExperts pt-2 px-4 pb-4'>
                        <div className='BeautySpa d-flex justify-content-between'>
                            <div>
                                <h4 className='mb-0'>Beauty & Spa</h4>
                                <p className='mb-4'>500 Experts</p>
                            </div>
                            <div className='see'>
                                See all
                            </div>
                        </div>
                        <Slider {...settings}>

                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg2.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>

                        </Slider>
                    </div>


                    <div className='SpaExperts mt-4 pt-2 px-4 pb-4'>
                        <div className='BeautySpa d-flex justify-content-between'>
                            <div>
                                <h4 className='mb-0'>Home & Decor</h4>
                                <p className='mb-4'>500 Experts</p>
                            </div>
                            <div className='see'>
                                See all
                            </div>
                        </div>
                        <Slider {...settings}>

                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg2.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>

                        </Slider>
                    </div>

                    <div className='SpaExperts mt-4 pt-2 px-4 pb-4'>
                        <div className='BeautySpa d-flex justify-content-between'>
                            <div>
                                <h4 className='mb-0'>Real Estate</h4>
                                <p className='mb-4'>500 Experts</p>
                            </div>
                            <div className='see'>
                                See all
                            </div>
                        </div>
                        <Slider {...settings}>

                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg2.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>

                        </Slider>
                    </div>

                    <div className='SpaExperts mt-4 pt-2 px-4 pb-4'>
                        <div className='BeautySpa d-flex justify-content-between'>
                            <div>
                                <h4 className='mb-0'>Jobs</h4>
                                <p className='mb-4'>500 Experts</p>
                            </div>
                            <div className='see'>
                                See all
                            </div>
                        </div>
                        <Slider {...settings}>

                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg2.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>
                            <div>
                                <img src="./spaImg1.png" alt="spa" />
                                <h4>Beauty Parlour</h4>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpaBeauty
