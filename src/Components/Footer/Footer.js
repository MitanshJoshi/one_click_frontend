import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import './Footer.css';

const Footer = () => {
    return (
        <div className='pt-5'>
            <footer className="text-center text-lg-start text-muted p-4 footers">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-lg-3 col-md-6 col-12 mb-md-3 mb-5 logoDiv">
                            <div className='LogoDesign'>
                                <img src='/NavLogo.png' alt="one click" className='logoFooter img-fluid' />
                                <svg xmlns="http://www.w3.org/2000/svg" width="112" height="12" viewBox="0 0 104 12" fill="none">
                                    <path d="M97.2026 0.281943L0.555664 11.1916H97.8164C102.471 11.1916 105.001 5.74872 101.999 2.19082C100.819 0.793056 99.0198 0.0768092 97.2026 0.281943Z" fill="#74CC7E" />
                                </svg>
                            </div>
                        </div>

                        <div className='col-lg-7 col-md-6 col-12'>
                            <div className='row'>
                                <div className="col-lg-3 col-md-6 col-6 mb-3 col-6">
                                    <h6 className="text-uppercase fw-bold mb-4 SpecialHead">
                                        Links
                                    </h6>
                                    <p><a href="#!">About Us</a></p>
                                    <p><a href="#!">Contact Us</a></p>
                                    <p><a href="#!">Customer Care</a></p>
                                    <p><a href="#!">Free listing</a></p>
                                    <p><a href="#!">Media</a></p>
                                </div>

                                {/* Repeat the structure for other columns */}

                                <div className="col-lg-3 col-md-6 col-6 mb-3 col-6">
                                    <h6 className="text-uppercase fw-bold mb-4 SpecialHead">
                                        OC Expert
                                    </h6>
                                    <p><a href="#!">Doctors</a></p>
                                    <p><a href="#!">Contact US</a></p>
                                    <p><a href="#!">Customer Care</a></p>
                                    <p><a href="#!">Free Listing</a></p>
                                    <p><a href="#!">Media</a></p>
                                </div>
                                <div className="col-lg-3 col-md-6 col-6 mb-3 col-6">
                                    <h6 className="text-uppercase fw-bold mb-4 SpecialHead" style={{ visibility: "hidden" }}>
                                        OC Expert
                                    </h6>
                                    <p><a href="#!">Doctors</a></p>
                                    <p><a href="#!">Contact US</a></p>
                                    <p><a href="#!">Customer Care</a></p>
                                    <p><a href="#!">Free Listing</a></p>
                                    <p><a href="#!">Media</a></p>
                                </div>
                                <div className="col-lg-3 col-md-6 col-6 mb-3 col-6">
                                    <h6 className="text-uppercase fw-bold mb-4 SpecialHead" style={{ visibility: "hidden" }}>
                                        OC Expert
                                    </h6>
                                    <p><a href="#!">Doctors</a></p>
                                    <p><a href="#!">Contact US</a></p>
                                    <p><a href="#!">Customer Care</a></p>
                                    <p><a href="#!">Free Listing</a></p>
                                    <p><a href="#!">Media</a></p>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-2 col-md-6 col-12'>
                            <h4 className='SpecialHead'>Connect us on</h4>
                            <div className="d-flex justify-content-evenly mt-2 mx-md-0 mx-5 px-md-0 px-5">
                                <img src='/fb.png' alt="Facebook" className="social-icon mr-3" />
                                <img src='/insta.png' alt="Instagram" className="social-icon mr-3" />
                                <img src='/linkedin.png' alt="LinkedIn" className="social-icon mr-3" />
                                <img src='/sparrow.png' alt="Sparrow" className="social-icon mr-3" />
                            </div>
                            <div className="mt-3 ">
                                <button className="btn btn-social-media mb-md-3 mb-0 me-md-0 me-2" style={{ padding: '4px', width: '160px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    <div className="d-flex align-items-center">
                                        <img src='/playstore.png' alt="playstore" />
                                        <div style={{ fontSize: '10px', marginLeft: '10px' }}>
                                            <span className='smallText' style={{ marginLeft: '-62px' }}>Get it on </span>
                                            <p className='mb-0 socialText'>Google Playstore</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="btn btn-social-media  ms-md-0 ms-2 button-1" style={{ padding: '4px', width: '160px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon
                                            icon={faApple}
                                            style={{ fontSize: '25px', marginLeft: '6px' }}
                                        />
                                        <div style={{ fontSize: '10px', marginLeft: '10px' }}>
                                            <span className='smallText' style={{ marginLeft: '-15px' }}>Get it on </span>
                                            <p className='mb-0 socialText'>App Store</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-3 copyright">
                    <p>Travel & Tourism | Beauty | Job | Education | Food | Home& Decor | Fitness | Health | Real Estate | Banking | Finance | Shopping Fitness | Health | Real Estate</p>
                </div>

                <div className="text-center mt-3 copyright pb-3">
                    &copy; 2008-2013. All rights reserved Privacy | Help | FAQs
                </div>
            </footer>
        </div>
    );
}

export default Footer;
