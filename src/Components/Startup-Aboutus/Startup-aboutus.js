import React, { useEffect, useState } from 'react';
import "./startup-aboutus.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faStar, faPhoneVolume, faMessage, faShareNodes, faHeart, faGlobe, faCalendar, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../BASE_URL';

const Startup_aboutus = () => {
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
        //   console.log(responseData.dta)
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
            <section>
                <ToastContainer/>
                <div className='startup-aboutus'>
                    <div>
                        <img src="./location.png" alt="" className='w-100' />
                    </div>
                    <div>
                        <div className='startup-aboutus-header d-flex justify-content-between'>
                            <div className='mt-3'>
                                <div className='startup-aboutus-name d-flex align-items-center'>
                                    <div>
                                        <img src="./webearl.png" alt="" style={{ height: "70px" }} />
                                    </div>
                                    <div className='ms-4'>
                                        <h4 className='mb-1'>Webearl Technology Pvt Ltd</h4>
                                        <p className='mb-0'>Cradle, EDII</p>
                                    </div>
                                </div>
                            </div>
                            <div className='startup-mobile-number d-flex flex-column justify-content-center  mt-3'>
                                <div className='d-flex justify-content-end'>
                                    <div className='edit-icon me-3'>
                                        <img src="./edit.png" />

                                    </div>
                                    <div className='delete-icon'>
                                        <img src="./delete.svg" alt="" />
                                    </div>
                                </div>
                                <p className='mt-4 mb-0'><FontAwesomeIcon icon={faPhoneVolume} style={{ fontSize: "18px" }} className='me-2' /> +91 9033251903</p>
                            </div>
                        </div>
                        <div className='startup-aboutus-location mt-2'>
                            <p className='mb-3'><FontAwesomeIcon icon={faGlobe} className='me-3 ' /> www.webearl.com</p>
                            <p className='mb-3'><FontAwesomeIcon icon={faLocationCrosshairs} className='me-3 ' />22, Cradle, Near Apollo Hospital, Bhat Circle, Ahmedabad - 38253</p>
                            <p className='mb-3'><FontAwesomeIcon icon={faLocationCrosshairs} className='me-3 ' />Ahmedabad, Gujarat, India</p>
                        </div>
                    </div>
                </div>
                <div className='startup-aboutus'>
                    <h4 style={{ fontWeight: "600" }} className='pt-4 mb-4'>Incubation center</h4>
                    <div>
                        <img src="./location.png" alt="" className='w-100' />
                    </div>
                    <div>
                        <div className='startup-aboutus-header d-flex justify-content-between'>
                            <div className='mt-3'>
                                <div className='startup-aboutus-name d-flex align-items-center'>
                                    <div>
                                        <img src="./webearl.png" alt="" style={{ height: "70px" }} />
                                    </div>
                                    <div className='ms-4'>
                                        <h4 className='mb-1'>Webearl Technology Pvt Ltd</h4>
                                        <p className='mb-0'>Cradle, EDII</p>
                                    </div>
                                </div>
                            </div>
                            <div className='startup-mobile-number d-flex flex-column justify-content-center  mt-3'>
                                <div className='d-flex justify-content-end'>
                                    <div className='edit-icon me-3'>
                                        <img src="./edit.png" />

                                    </div>
                                    <div className='delete-icon'>
                                        <img src="./delete.svg" alt="" />
                                    </div>
                                </div>
                                <p className='mt-4 mb-0'><FontAwesomeIcon icon={faPhoneVolume} style={{ fontSize: "18px" }} className='me-2' /> +91 9033251903</p>
                            </div>
                        </div>
                        <div className='startup-aboutus-location mt-2'>
                            <p className='mb-3'><FontAwesomeIcon icon={faGlobe} className='me-3 ' /> www.webearl.com</p>
                            <p className='mb-3'><FontAwesomeIcon icon={faLocationCrosshairs} className='me-3 ' />22, Cradle, Near Apollo Hospital, Bhat Circle, Ahmedabad - 38253</p>
                            <p className='mb-3'><FontAwesomeIcon icon={faLocationCrosshairs} className='me-3 ' />Ahmedabad, Gujarat, India</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Startup_aboutus;
