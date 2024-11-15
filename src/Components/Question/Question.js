import React from 'react';
import "./question.css"
import { useNavigate } from 'react-router-dom';

const Question = () => {
    const navigate = useNavigate();
    const handleiquiry = () => {
        navigate("/inquiryform");
    }

    return (
        <div className='dd'>
            <div className='Imagestyle' style={{ paddingTop: '20px' }}>
                <div className="container">
                    <div className="image-container">
                        <img src="./question.png" alt="image" className='im w-100' />
                        <div className='image-overlayer'>
                            <div className='image-up-headers'>
                                <div className='mb-4'>
                                    <h1 className='mb-1'>What is OneClick?</h1>
                                    <img className="mt-1 ml-16" src="./image-up.png" alt="" />
                                </div>
                                
                                <p className='mb-4 max-w-[1300px]'>OneClick is an innovative platform designed to connect startups with potential investors. 
                            It provides a space for startups to present their business ideas, goals, and funding needs, 
                            while offering investors the opportunity to explore a diverse range of promising projects. 
                            With real-time chat features, startups and investors can communicate seamlessly, 
                            fostering collaboration and investment opportunities. Our mission is to make funding accessible 
                            and simplify the investment process, enabling growth for emerging businesses.</p>
                                <button onClick={handleiquiry}>INQUIRY NOW</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;
