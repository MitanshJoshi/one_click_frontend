import React from "react";
import SecondNavbar from "../Navbar/Navbar";
import "./sellinginquiry.css";

const SellingInquiry = () => {
  return (
    <>
      <SecondNavbar />
      <section className="mt-5">
        <div className="form-start ">
          <div className="row gx-5">
            <div className="col-12">
              <div className="review-list-title mb-5">
                <h3>Selling Inquiry Details</h3>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Enter Your Name</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Product Name</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Enter Email Id</label>
                <input type="email" name="" id="" className="form-control" />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Enter Phone Number</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Select Your Country</label>
                <select name="" id="" className="form-control">
                  <option value="" selected disabled>
                    All
                  </option>
                  <option value="India">India</option>
                  <option value="America">America</option>
                  <option value="Russia">Russia</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Select Your State</label>
                <select name="" id="" className="form-control">
                  <option value="" selected disabled>
                    All
                  </option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Address</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Permanent Address</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="col-12 col-sm-12">
              <div className="inputcontrol mb-4">
                <label htmlFor="">Enter The Quantity</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
            </div>

            <div className=" mt-4 d-flex justify-content-center">
              <div className="selling-inquiry-submit-button">
                <button className="px-4">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellingInquiry;
