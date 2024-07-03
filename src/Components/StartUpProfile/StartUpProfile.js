import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPhoneVolume, faMessage, faShareNodes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./startupprofile.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../BASE_URL';

const StartUpProfile = ({ onBackButtonClick }) => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [startupData, setStartupData] = useState(null);
    const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));

    useEffect(() => {
        const fetchStartupData = async () => {
            const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
            try {
                const response = await fetch(
                    `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch startup data");
                }

                const responseData = await response.json();
                console.log('responseData', responseData);
                
                if (responseData.code === 200 && responseData.data.length > 0) {
                    setStartupData(responseData.data[0]);
                } else {
                    throw new Error("No startup data found");
                }
            } catch (error) {
                console.error("Error fetching startup data:", error);
                // Handle error (e.g., show a toast message)
                toast.error("Failed to fetch startup data", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });
            }
        };

        fetchStartupData();
    }, [_id]);

    const handleWishlist = () => {
        onBackButtonClick();
    };

    const handleNavigateInquiry = () => {
        navigate(`/inquiry/${_id}`);
    };

    return (
        <>
            <section className='mt-sm-5 mt-2 pt-4'>
                <div className="container">
                    <ToastContainer/>
                    {startupData && (
                        <div className="startup-profile-box">
                            <div>
                                <div className='startup-profile-heading'>
                                    <div className='d-flex justify-content-between mb-md-5 mb-2 w-[100%]'>
                                        <div className='d-flex align-items-sm-center align-items-start'>
                                            <div>
                                                <img src="/webearl.png" alt="Startup Logo" />
                                            </div>
                                            <div className='ms-sm-4 ms-2'>
                                                <h4 className='mb-1'>{startupData.startupName}</h4>
                                                <p className='mb-0'>{startupData.address}</p>
                                                <p className='mb-0'>Contact: {startupData.contactNumber}</p>
                                                <p className='mb-0'>Email: {startupData.email}</p>
                                            </div>
                                        </div>
                                        <div className='ms-lg-0 ms-1'>
                                            <div>
                                                <FontAwesomeIcon icon={faStar} className='star-icons' />
                                                <FontAwesomeIcon icon={faStar} className='star-icons' />
                                                <FontAwesomeIcon icon={faStar} className='star-icons' />
                                                <FontAwesomeIcon icon={faStar} className='star-icons' />
                                                <FontAwesomeIcon icon={faStar} className='star-icons' />
                                            </div>
                                            <h6 className='text-end mt-2'>30 reviews</h6>
                                        </div>
                                    </div>
                                    <div className='startup-profile-buttons pt-4 w-100'>
                                        <button className='startup-profile-1'><FontAwesomeIcon icon={faPhoneVolume} /> Call now</button>
                                        <button className='startup-profile-2 ms-md-3 ms-sm-2'><FontAwesomeIcon icon={faMessage} /> Write a review</button>
                                        <button className='startup-profile-3 ms-md-3 ms-sm-2'><FontAwesomeIcon icon={faShareNodes} /></button>
                                        <button className='startup-profile-4 ms-md-3 ms-sm-2' onClick={handleWishlist}><FontAwesomeIcon icon={faHeart} /></button>
                                        <button className='startup-profile-5 ms-lg-0 ms-md-3 ms-sm-2' onClick={handleNavigateInquiry}>My Inquiry</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default StartUpProfile;
