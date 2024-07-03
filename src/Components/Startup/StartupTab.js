import React, { useEffect, useState } from 'react';
import "./startup.css";
import SecondNavbar from '../Navbar/Navbar';
import StartUpProfile from '../StartUpProfile/StartUpProfile';
import Startup_review from '../startup-review/Startup-review';
import Startup_product from '../Startup-products/Startup-produc';
import Startup_awards from '../Startup-awards/Startup-awards';
import Startup_team from '../Startup_team/startup_team';
import Startup_grant from '../Startup_grant/Startup_grant';
import Startup_investments from '../Startup_investments/Startup_investments';
import Wishlist from '../Wishlist/Wishlist';
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';

const StartupTab = () => {
    const { state } = useLocation();
    const [activeTab, setActiveTab] = useState(0);
    const [wishList, setWishList] = useState(false);

    useEffect(() => {
        const myData = localStorage.getItem('myData');
        console.log("myData from localStorage:", myData);
        if(myData=="award"){
            setActiveTab(2);
            localStorage.removeItem('myData');
        }
        if (myData=="partner") {
            setActiveTab(3); // Set to 1 to activate the Product tab
            localStorage.removeItem('myData');
        }
        if (myData=="grant") {
            setActiveTab(4); // Set to 1 to activate the Product tab
            localStorage.removeItem('myData');
        }
        if (myData=="investment") {
            setActiveTab(5); // Set to 1 to activate the Product tab
            localStorage.removeItem('myData');
        }
        if (myData=="product") {
            setActiveTab(1); // Set to 1 to activate the Product tab
            localStorage.removeItem('myData');
        }
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const displayWishList = () => {
        setWishList(true);
    };

    const handleBackPage = () => {
        setWishList(false);
    };

    return (
        <>
            <SecondNavbar />
            <ToastContainer />
            <StartUpProfile onBackButtonClick={displayWishList} />

            <section className='mt-sm-5 mt-4'>
                {wishList ? (
                    <Wishlist onBack={handleBackPage} />
                ) : (
                    <div className="tab-container-maintain">
                        <div className="custom-tabs-profile">
                            {/* <div
                                className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Review</h5>
                                {activeTab === 0 && (
                                    <div className="active-icon-2">
                                        <img src="/ar.png" alt="" className='line-image' />
                                    </div>
                                )}
                            </div> */}
                            <div
                                className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Product</h5>
                                {activeTab === 0 && (
                                    <div className="active-icon-2">
                                        <img src="/ar.png" alt="" className='' />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}
                                onClick={() => handleTabClick(1)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Achievements & Certificate</h5>
                                {activeTab === 1 && (
                                    <div className="active-icon-1">
                                        <img src="/tab-photo.png" alt="" className='' />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`custom-tab ${activeTab === 2 ? 'active' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                <h5 className='mb-0 tab-bold-css'>My Team</h5>
                                {activeTab === 2 && (
                                    <div className="active-icon-1">
                                        <img src="/tab-photo.png" alt="" className='' />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`custom-tab ${activeTab === 3 ? 'active' : ''}`}
                                onClick={() => handleTabClick(3)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Grants</h5>
                                {activeTab === 3 && (
                                    <div className="active-icon-1">
                                        <img src="/tab-photo.png" alt="" className='' />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`custom-tab ${activeTab === 4 ? 'active' : ''}`}
                                onClick={() => handleTabClick(4)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Investments</h5>
                                {activeTab === 4 && (
                                    <div className="active-icon-1">
                                        <img src="/tab-photo.png" alt="" className='' />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <div className="custom-tab-panel ">
                            {activeTab === 0 && <Startup_review />}
                        </div> */}
                        <div className="custom-tab-panel ">
                            {activeTab === 0 && <Startup_product />}
                        </div>
                        <div className="custom-tab-panel ">
                            {activeTab === 1 && <Startup_awards />}
                        </div>
                        <div className="custom-tab-panel ">
                            {activeTab === 2 && <Startup_team />}
                        </div>
                        <div className="custom-tab-panel ">
                            {activeTab === 3 && <Startup_grant />}
                        </div>
                        <div className="custom-tab-panel ">
                            {activeTab === 4 && <Startup_investments />}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default StartupTab;
