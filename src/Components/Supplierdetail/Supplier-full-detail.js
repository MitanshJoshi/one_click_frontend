import React, { useState } from 'react';
import "./supplier-full-detail.css"
import SecondNavbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import ReviewList from '../Review-list/ReviewList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Supplier_full_detail = ({onShoesChange}) => {
    console.log(onShoesChange);
const [id , setid]=useState("")
   
    const navigate=useNavigate()
    const handleinquiry=()=>{
        navigate("/inquiryform", { state: { id: id, startUpId: onShoesChange.shoes.startup._id} })
    }

    const Array = [
        { img: "./shoes.png" },
        { img: "./shoes.png" },
        { img: "./shoes.png" }
    ]

    const [startup ,setstarup]=useState("")
    // console.log(startup);
    const [more ,setmore]=useState([])
    

    useEffect(() => {
        setstarup(onShoesChange.shoes.startup)
        setmore(onShoesChange.shoes.otherProducts)
        setid(onShoesChange._id)
    }, [onShoesChange])
    

    return (
        <div>
            <SecondNavbar />
            <section className='mt-5'>
                <div className="container">
                    <div>
                        <div className="row">
                            <div className="col-4">
                                <div>
                                    <div>
                                        <div className="supplier-full-detail">
                                            <div>
                                                <div className="about-supplier-title-photo">
                                                    <img src="./supplier-1.png" alt="" className='img-fluid' />
                                                </div>
                                                <div className='supplier-follow-buttons mt-3'>
                                                    <button>Follow</button>
                                                </div>
                                                <div className='supplier-details-info mt-4'>
                                                    <div className='mb-3'>
                                                        <h4>Tab Sport</h4>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Phone Number</h6>
                                                        <p className='mb-0'>{startup.contactNumber}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Email Id</h6>
                                                        <p className='mb-0'>{startup.email}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Name</h6>
                                                        <p className='mb-0'>{startup.contactPerson}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Address</h6>
                                                        <p className='mb-0'>{startup.address}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>State</h6>
                                                        <p className='mb-0'>{startup.state}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Pincode</h6>
                                                        <p className='mb-0'>{startup.pincode}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Category</h6>
                                                        <p className='mb-0'>{startup.categoryName}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Address</h6>
                                                        <p className='mb-0'>jhj</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Subcategory</h6>
                                                        <p className='mb-0'>{startup.subcategoryName}</p>
                                                    </div>
                                                    {/* <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Incubation Center</h6>
                                                        <p className='mb-0'>Ahmedabad</p>
                                                    </div> */}
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Incubation Center City</h6>
                                                        <p className='mb-0'>{startup.inqubationCenterCity}</p>
                                                    </div>
                                                    <div className='detail-about-supplier-button mt-4'>
                                                        <button className='mt-3' onClick={handleinquiry}>INQUIRY NOW</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <div>
                                    <div className="supplier-product-description">
                                        <h4 className='mb-3 '>Product Description</h4>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    </div>
                                    <div>
                                        <div className='supplier-more-product mt-5 mb-3'>
                                            <h4 >More from this seller</h4>
                                        </div>
                                        <div>
                                            <Swiper
                                                slidesPerView={3.5}
                                                spaceBetween={20}
                                                freeMode={true}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                className="mySwiper"
                                            >
                                                {more && more.map((e) => {
                                                    return (
                                                        <>
                                                            <SwiperSlide style={{ height: "350px" }}>
                                                                <div>
                                                                    <div className="shoes-detail-box">
                                                                        <div className='shoes-detail-head'>
                                                                            <p className='mb-0'>RFQ</p>
                                                                            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                                                                        </div>
                                                                        <div className='shoes-image-box'>
                                                                            <img src="./shoes.png" alt="" className='img-fluid' />
                                                                        </div>
                                                                        <div className='shoes-detail-content'>
                                                                            <div className='shoes-detail-title'>
                                                                                <h6 className='mb-1' style={{ fontWeight: "600" }}>{e.shoesname}</h6>
                                                                                {/* description  */}
                                                                                <span>{e.description}</span>
                                                                            </div>
                                                                            <div className='shoes-detail-location'>
                                                                                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: "10px", color: "#74CC7E" }} />
                                                                                <p className='mb-0 ms-1'>Ahmedabad</p>
                                                                            </div>
                                                                            <div className='shoes-price d-flex align-items-center '>
                                                                                <span>₹</span><p className='mb-0'>{e.productprice}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        </>
                                                    )
                                                })}
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <div className='review-list-title'>
                                        <h3>Awards</h3>
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <div className="row">
                                                {Array.map((e) => {
                                                    return (
                                                        <>
                                                            <div className="col-3">
                                                                <div className='overflow-content-hide'>
                                                                    <div className='awards-relative'>
                                                                        <img src="./awards.png" alt="" className='w-100' />
                                                                    </div>
                                                                    <h6 className='mt-2 ms-1'>Bharat Ratna-
                                                                        1 st degree of <br />
                                                                        honour.</h6>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div>
                                    <div className='review-list-title'>
                                        <h3>Certificate</h3>
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <div className="row">
                                                {Array.map((e) => {
                                                    return (
                                                        <>
                                                            <div className="col-3">
                                                                <div className='overflow-content-hide'>
                                                                    <div className='awards-relative'>
                                                                        <img src="./awards.png" alt="" className='w-100' />
                                                                    </div>
                                                                    <h6 className='mt-2 ms-1'>Bharat Ratna-
                                                                        1 st degree of <br />
                                                                        honour.</h6>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                            <div className='review-list-title d-flex justify-content-between mb-4 mt-4'>
                                <h3>Users Review On This Supplier</h3>
                                <a href="">View more</a>
                            </div>
                                <ReviewList/>
                                <ReviewList/>
                                <ReviewList/>
                                <ReviewList/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Supplier_full_detail;




