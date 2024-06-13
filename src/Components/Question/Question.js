import React from 'react';
import "./question.css"
import { useNavigate } from 'react-router-dom';

const Question = () => {
    const navigate=useNavigate()
    const handleiquiry=()=>{
        navigate("/inquiryform")
    }
    return (
        <div className='dd'>
            <div className='Imagestyle' style={{ paddingTop: '20px' }}>
                <div className="container">
                    <div className="image-container">
                        <img src="./question.png" alt="image" className='im w-100' />
                        <div className='image-overlayer'>
                            <div className='image-up-headers'>
                                <div className=''>
                                    <h1 className='mb-3'>Customer Service</h1>
                                    <img className="mt-1" src="./image-up.png" alt="" />
                                </div>
                                <p>We are on mission to provide <br /> Good Customer Service to the people at very low price.</p>
                                <button onClick={handleiquiry}>INQUIRY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question
