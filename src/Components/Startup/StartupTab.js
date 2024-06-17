import React, { useEffect } from 'react';
import "./startup.css"
import SecondNavbar from '../Navbar/Navbar';
import StartUpProfile from '../StartUpProfile/StartUpProfile';
import { useState } from 'react';
import Startup_aboutus from '../Startup-Aboutus/Startup-aboutus';
import Startup_review from '../startup-review/Startup-review';
import Startup_product from '../Startup-products/Startup-produc';
import Startup_awards from '../Startup-awards/Startup-awards';
import Startup_team from '../Startup_team/startup_team';
import Wishlist from '../Wishlist/Wishlist';
// import "./Navbar.css"; 
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const StartupTab = () => {

    const { state } = useLocation();

    console.log(state?.abc);

    const [activeTab, setActiveTab] = useState(0);
    const [wishList, setWishList] = useState(false);
    // const [Data, setData] = useState(false);

    const myData = localStorage.getItem('myData')
    
      useEffect(() => {
        if(myData){
            setActiveTab(2)
            localStorage.removeItem('myData')
        }
      }, [myData]);


    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const displayWishList = () => {
        setWishList(true); // Set addStartup to false when back button is clicked
    };

    const handleBackPage = () => {
        setWishList(false); // Set addStartup to false when back button is clicked
    };
    // const fetchData = async () => {
    //     // console.log(localStorage.getItem("tokenData"));
    //     // console.log("hyyyyyy");      
    //     try {
    //       const response = await fetch(
    //         `http://localhost:8000/api/startup/displaydetail`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem("token"),
    //           },
    //         }
    //       );
    //     //    console.log(response)
    //       if (!response.ok) {
    //         throw new Error("Request failed");
    //       }
    //       const responseData = await response.json();
    //       setData(responseData.data);
    //     //   console.log(responseData.data)
    //     } catch (error) {
    //       if (error) {
    //         toast.error("Something went wrong!", {
    //           position: toast.POSITION.BOTTOM_RIGHT,
    //           autoClose: 1000,
    //         });
    //       }
    //     }
    //   };
    //   useEffect(() => {
    //     fetchData();
    //   }, []);
    
    return (
        <>
            <SecondNavbar />
            <ToastContainer/>
            <StartUpProfile onBackButtonClick={displayWishList} />

            <section className='mt-sm-5 mt-4'>

                {wishList ? (
                    <Wishlist onBack={handleBackPage}/>
                ) : (
                    <div className="tab-container-maintain">
                        <div className="custom-tabs-profile">
                            {/* <div
                                className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                <h5 className='mb-0 tab-bold-css'>About Us</h5>
                                {activeTab === 0 && (
                                    <div className="active-icon-2">
                                        <img src="./ar.png" alt="" className='' />
                                    </div>
                                )}
                            </div> */}

                            <div
                                className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}
                                onClick={() => handleTabClick(0)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Review</h5>
                                {activeTab === 0 && (
                                    <div className="active-icon-2">
                                        <img src="/ar.png" alt="" className='line-image' />
                                    </div>
                                )}
                            </div>

                            <div
                                className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}
                                onClick={() => handleTabClick(1)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Product</h5>
                                {activeTab === 1 && (
                                    <div className="active-icon-2">
                                        <img src="/ar.png" alt="" className='' />
                                    </div>
                                )}
                            </div>

                            <div
                                className={`custom-tab ${activeTab === 2 ? 'active' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                <h5 className='mb-0 tab-bold-css'>Achievements & Certificate</h5>
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
                                <h5 className='mb-0 tab-bold-css'>My Team</h5>
                                {activeTab === 3 && (
                                    <div className="active-icon-1">
                                        <img src="/tab-photo.png" alt="" className='' />
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* <div className="custom-tab-panel ">
                            {activeTab === 0 &&
                                <Startup_aboutus />
                            }
                        </div> */}

                        <div className="custom-tab-panel ">
                            {activeTab === 0 &&
                                <Startup_review />
                            }
                        </div>

                        <div className="custom-tab-panel ">
                            {activeTab === 1 &&
                                <Startup_product />
                            }
                        </div>

                        <div className="custom-tab-panel ">
                            {activeTab === 2 &&
                                <Startup_awards />
                            }
                        </div>
                        <div className="custom-tab-panel ">
                            {activeTab === 3 &&
                                <Startup_team />
                            }
                        </div>
                    </div>
                )}



            </section>


        </>
    )
}

export default StartupTab
