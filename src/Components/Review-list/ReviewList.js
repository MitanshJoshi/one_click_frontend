import React from 'react';
import "./review-list.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewList = () => {
    return (
        <>
            <div className="row mb-4">
                <div className="col-1 px-0">
                    <div className='d-flex justify-content-center'>
                        <img src="./profile-photo.jpg" alt="" />
                    </div>
                </div>
                <div className="col-2 px-0">
                    <div className='reviewer-name'>
                        <h5 className='mb-1'>Sama Seth</h5>
                        <p>2 days ago</p>
                    </div>
                </div>
                <div className="col-9">
                    <div className='review-detail'>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <h6>Easy The most comfortable Shoes</h6>
                            <div>
                                <span>4.9</span>
                                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} className='ms-2'/>
                                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                            </div>
                        </div>
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewList
