import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPhoneVolume, faMessage, faShareNodes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./startupprofile.css"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../BASE_URL';

const StartUpProfile = ({ onBackButtonClick }) => {

const handleWushlist = () => {
    onBackButtonClick();
}
const navigate=useNavigate()
const { _id } = useParams();
const handlenavigate=()=>{
  navigate(`/inquiry/${_id}`)
}
const [data,setdata]=useState()
console.log(data)
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
      setdata(responseData.data[0]);
      console.log(responseData.data[0])
      // console.log(setdata);
    } catch (error) {
      if (error) {
        // toast.error("Something went wrong!", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        //   autoClose: 1000,
        // });
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

    return (
        <>
            <section className='mt-sm-5 mt-2 pt-4'>
                <div className="container">
                    <ToastContainer/>
                    <div>
                        <div className="startup-profile-box">
                            <div>
                                <div className='startup-profile-heading'>
                                    <div className='d-flex justify-content-between mb-md-5 mb-2'>
                                        <div className='d-flex align-items-sm-center align-items-start'>
                                            <div>
                                                <img src="/webearl.png" alt="" />
                                            </div>
                                            <div className='ms-sm-4 ms-2'>
                                                <h4 className='mb-1'>Webearl Technology Pvt Ltd</h4>
                                                <p className='mb-0'>Cradle, EDII</p>
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
                                            <h6 className='text-end mt-2'>30 review</h6>
                                        </div>
                                    </div>
                                    <div className='startup-profile-buttons pt-4 w-100'>
                                        <button className='startup-profile-1'><FontAwesomeIcon icon={faPhoneVolume} /> Call now</button>
                                        <button className='startup-profile-2 ms-md-3 ms-sm-2'><FontAwesomeIcon icon={faMessage} /> Write a review</button>
                                        <button className='startup-profile-3 ms-md-3 ms-sm-2'><FontAwesomeIcon icon={faShareNodes} /></button>
                                        <button className='startup-profile-4 ms-md-3 ms-sm-2' onClick={handleWushlist}><FontAwesomeIcon icon={faHeart} /></button>
                                        <button className='startup-profile-5 ms-lg-0 ms-md-3 ms-sm-2' onClick={handlenavigate}>My Inquiry</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StartUpProfile
