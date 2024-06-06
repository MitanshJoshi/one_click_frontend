import React from 'react';
import './DisplayProfileWithStartupList.css'; // Make sure to import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SecondNavbar from '../Navbar/Navbar';

const DisplayProfileWithStartupList = () => {
  return (
    <>
      <SecondNavbar />
      <div className='Newsallstyle' style={{ paddingTop: '25px' }}>
        <div className="container">
          <div className="row">
            <section>
              <div>
                <img className="background-image img-fluid" style={{ width: '100%' }} src='./BgDisplay.jpg' alt="Background" />
              </div>
              <div>
                <div className='d-flex align-items-end profile-image ms-5'>
                  <img src='./BioDisplayUser.png' alt="User Display" />
                  <div className='profileDiv ' style={{ marginLeft: '20px' }}>
                    <h4 className='h4 mb-1'>Profile</h4>
                    <p className='lead mb-5'>John Aeobasan</p>
                  </div>
                </div>
              </div>
            </section>
            <section className='pt-5'>
              <div className='row p-3'>
                <div className='col-12 col-md-4 mb-4'>
                  <div className='d-flex justify-content-between mb-5'>
                    <p className='infoBasic'>Basic Information</p>
                    <div>
                      <p className='infoBasic'>Start-ups</p>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12 col-md-6 mb-4'>
                    <div className='shadow'>
                      <div className='d-flex justify-content-between mb-4'>
                        <div className='d-flex align-items-center'>
                          <img src='./Webearl.png' />
                          <div style={{ marginLeft: '10px' }}>
                            <p className='mb-0'>WebEarl Technology Pvt Ltd</p>
                            <p className='mb-0' style={{color: "#d6d6d6"}}>Cradle, EDII</p>
                          </div>
                        </div>
                        <div>
                          <span>3 </span>
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}}/>
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between mt-3'>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Ahmedabad</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Gujarat</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>India</span>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between mt-3'>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Incubation center</span>
                        </div>
                        <div>
                        <p style={{ fontWeight: "600" }}>Centre for Advancing & Launching <br/> Enterprises (CrAdLE)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-md-6  mb-4'>
                    <div className='shadow'>
                      <div className='mb-4 d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                          <img src='./Webearl.png' />
                          <div style={{ marginLeft: '10px' }}>
                            <p className='mb-0'>WebEarl Technology Pvt Ltd</p>
                            <p className='mb-0' style={{color: "#d6d6d6"}}>Cradle, EDII</p>
                          </div>
                        </div>
                        <div>
                          <span>4.9 </span>
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} style={{color:'gold'}} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between mt-3'>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Ahmedabad</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Gujarat</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>India</span>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between mt-3'>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} /><span style={{ marginLeft: '10px' }}>Incubation center</span>
                        </div>
                        <div>
                          <p style={{ fontWeight: "600" }}>Centre for Advancing & Launching <br/> Enterprises (CrAdLE)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayProfileWithStartupList;
