import React, { useState } from "react";
// import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const ContactUs = () => {
  return (
    <div className="container form-start">
      <div className="login">
        <div className="login-wrapper">
          <div className="row w-75 h-100 gx-0 ">
            <div className="col-6 h-100 login">
              <div className="login-form h-100">
                <div className="login-header"></div>
                <div className="mb-3">
                  <div className="text-center FormHead pt-5">
                    <h1 className="">Contact Us</h1>
                    <p style={{ fontSize: "15px" }}>
                      If you need any help or any other <br /> questions, feel
                      free to ask
                    </p>
                  </div>
                </div>
                <div>
                  <form className="row g-3">
                    <div className="col-12 ">
                      <input
                        type="tel"
                        className="form-control"
                        id="Full Name"
                        placeholder="Full Name"
                        // value={email.trim()}
                        // onChange={(e) => setEmail(e.target.value.trim())}
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^0-9 a-z A-Z ]/g,
                            ""
                          ); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === " ") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        required
                      />
                    </div>
                    <div className="col-12 ">
                      <input
                        type="tel"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        // value={email.trim()}
                        // onChange={(e) => setEmail(e.target.value.trim())}
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^0-9 a-z @_. ]/g,
                            ""
                          ); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === " ") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        type="tel"
                        className="form-control"
                        id="Message"
                        placeholder="Message"
                        maxLength={300}
                        style={{ height: "100px" }}
                        onInput={(e) => {
                          let value = e.target.value.replace(
                            /[^0-9 a-z A-Z !@#$%^&*()_+="':;,.<>? ]/g
                          ); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === " ") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        required
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btnLogin mt-2"
                        style={{borderRadius:"100px"}}
                      >
                       Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-6 h-[492px]">
              <div className="login-image-section h-100">
                <img src="./map.png" className="login-background-image" />
                <div className="image-content" style={{ position: "relative" }}>
                  <div
                    style={{ position: "absolute", bottom: "500px", right: 0 }}
                    st
                  >
                    <img src="./mapin.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
