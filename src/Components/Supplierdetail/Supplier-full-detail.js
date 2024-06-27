import React, { useState, useEffect } from 'react';
import "./supplier-full-detail.css"
import SecondNavbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ReviewList from '../Review-list/ReviewList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Supplier_full_detail = ({ onShoesChange }) => {
    const [id, setId] = useState("");
    const [startupId, setStartupId] = useState(onShoesChange.shoes.startup._id);
    const [startup, setStartup] = useState({});
    const [more, setMore] = useState([]);

    const navigate = useNavigate();

    const handleInquiry = () => {
        navigate("/inquiryform", { state: { id: id, startUpId: startupId } });
    };

    useEffect(() => {
        const fetchStartupDetails = async () => {
            try {
                const response = await axios.get(`https://oneclick-sfu6.onrender.com/api/startup/displaydetail?startupId=${startupId}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    }
                });
                const startupData = response.data.data[0];
                setStartup(startupData);
                setMore(startupData.product);
                setId(onShoesChange._id);
            } catch (error) {
                console.error('Error fetching startup details:', error);
            }
        };
        
        fetchStartupDetails();
    }, [startupId, onShoesChange]);

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
                                                        <h4>{startup.startupName}</h4>
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
                                                        <p className='mb-0'>{startup.category && startup.category[0] && startup.category[0].name}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Subcategory</h6>
                                                        <p className='mb-0'>{startup.subcategory && startup.subcategory[0] && startup.subcategory[0].name}</p>
                                                    </div>
                                                    <div className='mb-2 d-flex justify-content-between'>
                                                        <h6 className='mb-0'>Incubation Center City</h6>
                                                        <p className='mb-0'>{startup.inqubationCenterCity}</p>
                                                    </div>
                                                    <div className='detail-about-supplier-button mt-4'>
                                                        <button className='mt-3' onClick={handleInquiry}>INQUIRY NOW</button>
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
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                    </div>
                                    <div>
                                        <div className='supplier-more-product mt-5 mb-3'>
                                            <h4>More from this seller</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {more && more.map((e) => (
                                                <div key={e._id}>
                                                    <div className="shoes-detail-box">
                                                        <div className='shoes-detail-head'>
                                                            <p className='mb-0'></p>
                                                            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                                                        </div>
                                                        <div className='shoes-image-box'>
                                                            <img src={`${e.productPhotos[0]}`} alt="" className='img-fluid w-full h-40 object-cover rounded-md' />
                                                        </div>
                                                        <div className='shoes-detail-content'>
                                                            <div className='shoes-detail-title'>
                                                                <h6 className='mb-1' style={{ fontWeight: "600" }}>{e.productName}</h6>
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
                                            ))}
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
                                                {startup.award && startup.award.map((e) => (
                                                    <div className="col-3" key={e._id}>
                                                        <div className='overflow-content-hide'>
                                                            <div className='awards-relative'>
                                                                <img src={`${e.photos}`} alt="" className='w-100' />
                                                            </div>
                                                            <h6 className='mt-2 ms-1'>{e.achievementName} - {e.competitionName}</h6>
                                                        </div>
                                                    </div>
                                                ))}
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
                                                {startup.certificate && startup.certificate.map((e) => (
                                                    <div className="col-3" key={e._id}>
                                                        <div className='overflow-content-hide'>
                                                            <div className='awards-relative'>
                                                                <img src={`${e.photos}`} alt="" className='w-100' />
                                                            </div>
                                                            <h6 className='mt-2 ms-1'>{e.certificateName} - {e.competitionName}</h6>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className='review-list-title'>
                                    <h3>Review</h3>
                                </div>
                                <div>
                                    <ReviewList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Supplier_full_detail;
