import React, { useEffect, useState } from 'react'
import SecondNavbar from '../Navbar/Navbar';
import "./startup-review.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComment, faPhoneVolume, faMessage, faShareNodes, faHeart, faGlobe, faCalendar, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../BASE_URL';

const Startup_review = () => {
    const { _id } = useParams();
    const [data,setdata]=useState();
    const fetchData = async () => {
        // console.log(localStorage.getItem("tokenData"));
    
        try {
          const response = await fetch(
            `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("Request failed");
          }
          const responseData = await response.json();
          setdata(responseData.data);
          console.log(responseData.dta)
        } catch (error) {
          if (error) {
            toast.error("Something went wrong!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
          }
        }
      };
      useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
        <ToastContainer/>
            <section className='mt-5'>
                <div className="startup-review">
                    <div className='startup-average-review d-flex justify-content-between'>
                        <div>
                            <h6>User Review & Rating</h6>
                            <p>100% Authenticated & Trusted ratings from OneClick users</p>
                        </div>
                        <div>
                            <button>4.6</button>
                        </div>
                    </div>
                    <div className='startup-recent-review d-flex align-items-center mt-3'>
                        <h6 className='mb-0'>Recent Rating</h6>
                        <button className='me-3 ms-5'>4.5</button>
                        <button className='me-3'>4.0</button>
                        <button className='me-3'>4.5</button>
                        <button className='me-3'>5.0</button>
                    </div>
                    <div className="startup-user-review mb-4 d-flex align-items-center">
                        <h6 className='mb-0'>User Review</h6>
                        <button className='me-4 startup-user-review-button'>All Review</button>
                        <button className='me-4'>Popular</button>
                        <button className='me-4'>Hoght to Low</button>
                        <button className='me-4'>Low to High</button>
                    </div>
                    <div className='mb-4'>
                        <div className="startup-user-review-detail">
                            <div className='d-flex justify-content-between mb-4'>
                                <div className='startup-user-review-detail-name d-flex align-items-center'>
                                    <div>
                                        <img src="/review.png" alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-0'>Sona Seth</h6>
                                        <p className='mb-0'>100 Reviews, 38 followers</p>
                                    </div>
                                </div>
                                <div className='text-end startup-user-review-detail-time'>
                                    <span>4.9</span><FontAwesomeIcon icon={faStar} className='ms-2' style={{color: "gold"}}/>
                                    <p>5 min ago</p>
                                </div>
                            </div>
                            <div className='startup-user-review-description'>
                                <div>
                                    <p className='mb-0'>“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum
                                        Lorem ipsumLorem ipsum Lorem ipsum...</p>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon={faComment}  className='round-icon-border'/>
                                    <FontAwesomeIcon icon={faShareNodes} className='round-icon-border ms-3'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="startup-user-review-detail">
                            <div className='d-flex justify-content-between mb-4'>
                                <div className='startup-user-review-detail-name d-flex align-items-center'>
                                    <div>
                                        <img src="/review.png" alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-0'>Sona Seth</h6>
                                        <p className='mb-0'>100 Reviews, 38 followers</p>
                                    </div>
                                </div>
                                <div className='text-end startup-user-review-detail-time'>
                                    <span>4.9</span><FontAwesomeIcon icon={faStar} className='ms-2' style={{color: "gold"}}/>
                                    <p>5 min ago</p>
                                </div>
                            </div>
                            <div className='startup-user-review-description'>
                                <div>
                                    <p className='mb-0'>“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum
                                        Lorem ipsumLorem ipsum Lorem ipsum...</p>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon={faComment}  className='round-icon-border'/>
                                    <FontAwesomeIcon icon={faShareNodes} className='round-icon-border ms-3'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="startup-user-review-detail">
                            <div className='d-flex justify-content-between mb-4'>
                                <div className='startup-user-review-detail-name d-flex align-items-center'>
                                    <div>
                                        <img src="/review.png" alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-0'>Sona Seth</h6>
                                        <p className='mb-0'>100 Reviews, 38 followers</p>
                                    </div>
                                </div>
                                <div className='text-end startup-user-review-detail-time'>
                                    <span>4.9</span><FontAwesomeIcon icon={faStar} className='ms-2' style={{color: "gold"}}/>
                                    <p>5 min ago</p>
                                </div>
                            </div>
                            <div className='startup-user-review-description'>
                                <div>
                                    <p className='mb-0'>“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum
                                        Lorem ipsumLorem ipsum Lorem ipsum...</p>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon={faComment}  className='round-icon-border'/>
                                    <FontAwesomeIcon icon={faShareNodes} className='round-icon-border ms-3'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="startup-user-review-detail">
                            <div className='d-flex justify-content-between mb-4'>
                                <div className='startup-user-review-detail-name d-flex align-items-center'>
                                    <div>
                                        <img src="/review.png" alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-0'>Sona Seth</h6>
                                        <p className='mb-0'>100 Reviews, 38 followers</p>
                                    </div>
                                </div>
                                <div className='text-end startup-user-review-detail-time'>
                                    <span>4.9</span><FontAwesomeIcon icon={faStar} className='ms-2' style={{color: "gold"}}/>
                                    <p>5 min ago</p>
                                </div>
                            </div>
                            <div className='startup-user-review-description'>
                                <div>
                                    <p className='mb-0'>“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum
                                        Lorem ipsumLorem ipsum Lorem ipsum...</p>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon={faComment}  className='round-icon-border'/>
                                    <FontAwesomeIcon icon={faShareNodes} className='round-icon-border ms-3'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <div className="startup-user-review-detail">
                            <div className='d-flex justify-content-between mb-4'>
                                <div className='startup-user-review-detail-name d-flex align-items-center'>
                                    <div>
                                        <img src="/review.png" alt="" />
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-0'>Sona Seth</h6>
                                        <p className='mb-0'>100 Reviews, 38 followers</p>
                                    </div>
                                </div>
                                <div className='text-end startup-user-review-detail-time'>
                                    <span>4.9</span><FontAwesomeIcon icon={faStar} className='ms-2' style={{color: "gold"}}/>
                                    <p>5 min ago</p>
                                </div>
                            </div>
                            <div className='startup-user-review-description'>
                                <div>
                                    <p className='mb-0'>“ Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum
                                        Lorem ipsumLorem ipsum Lorem ipsum...</p>
                                </div>
                                <div className='d-flex'>
                                    <FontAwesomeIcon icon={faComment}  className='round-icon-border'/>
                                    <FontAwesomeIcon icon={faShareNodes} className='round-icon-border ms-3'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Startup_review;
