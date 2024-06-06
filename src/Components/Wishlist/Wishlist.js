import React from 'react';
import "./wishlist.css"

const Wishlist = ({onBack}) => {

    const array = [
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
        { hyyy: "dnfkdf" },
    ]


    const handleBack = () => {
        onBack();
    }


    return (
        <>
            <div className='tab-container-maintain'>
                <div>
                <div className='wishlist-title d-flex justify-content-between align-items-center'>
                    <h2>WishList</h2>
                    <button onClick={handleBack}>BACK</button>
                </div>
                    <div className="wish-list ">
                        <div className="">
                            <div>
                                <p>Name</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <p>Brand Name</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <p>Price</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <p>Location</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <p>Image</p>
                            </div>
                        </div>
                    </div>
                    {array && array.map((e) => {
                        return (
                            <>
                                <div className="wish-list wish-list-content align-items-center">
                                    <div className="">
                                        <div>
                                            <h5 className=''>Round toe leather loafer shoe(Black)</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <h5 className=''>Rainbow shoes & enterprise</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <h5 className=''>₹ 1800</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <h5 className=''>Ahmedabad</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <img src="./shoe-list.png" alt="" className='img-fluid' />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <button>Inquiry Now</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Wishlist;
