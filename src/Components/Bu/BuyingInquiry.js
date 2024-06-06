import React from 'react'
import SecondNavbar from '../Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../BASE_URL';
const BuyingInquiry = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        productname: '',
        email: '',
        contact: '',
        country: '',
        state: '',
        address: '',
        permanentaddress: '',
        quantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        const { name, productname, email, contact, country, state, address, permanentaddress, quantity} = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            toast.error('name must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!email) {
            toast.error('Email must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!emailRegex.test(email)) {
            toast.error('Please Enter Valid Email Address!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!country) {
            toast.error('Country must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!address) {
            toast.error('Address must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!productname) {
            toast.error('name must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
      
        if (quantity.length < 1) {
            toast.error('Please Enter Quantity More Then 0!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!contact) {
            toast.error('Contact must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (contact.length < 10) {
            toast.error('Please Enter Valid Mobile Number!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!state) {
            toast.error('State must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (!permanentaddress) {
            toast.error('Permanentaddress must be required!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
      
        try {
            
            const response = await fetch(`${BASE_URL}/api/inquiry/buyingInquiry`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*",
                Authorization: localStorage.getItem("token"),
              },
              body: JSON.stringify({
                name,
                productname,
                email,
                contact,
                country,
                state,
                address,
                permanentaddress,
                quantity,
               }),
            });
      
            if (!response.ok) {
              throw new Error("buying is failed");
            }
            toast.success("Buying is successful!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
            setTimeout(() => {
              navigate("/");
          }, 2000);
            const responseData = await response.json();
            localStorage.setItem("token", responseData.data.token);
            console.log(responseData)

          } catch (error) {
            if (error) {
              toast.error("Something went wrong!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
            }


    }


    const handleKeyDown = (e) => {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A/Ctrl+C/Ctrl+V
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
      }

    return (
        <>
            <SecondNavbar />
            <ToastContainer />
            <section className='mt-5'>
                <div className="container">
                    <div>
                        <div className='row gx-5'>
                            <div className="col-12">
                                <div className='review-list-title mb-5'>
                                    <h3>Buying Inquiry Details</h3>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Enter Your Name</label>
                                    <input type="text" name="name" id="" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Product Name</label>
                                    <input type="text" name="productname" id="" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Enter Email Id</label>
                                    <input type="email" name="email" id="" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Enter Phone Number</label>
                                    <input type="tel" name="contact" id="" className='form-control' onChange={handleChange}  maxLength={10} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Select Your Country</label>
                                    <select name="country" id="" className='form-control' onChange={handleChange} >
                                        <option value="" selected disabled>All</option>
                                        <option value="India">India</option>
                                        <option value="America">America</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Spain">Spain</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Select Your State</label>
                                    <select name="state" id="" className='form-control' onChange={handleChange} >
                                        <option value="" selected disabled>All</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Address</label>
                                    <textarea name="address" id="" cols="30" rows="5" className='form-control' onChange={handleChange} ></textarea>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Permanent Address</label>
                                    <textarea name="permanentaddress" id="" cols="30" rows="5" className='form-control' onChange={handleChange} ></textarea>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='inquiry-label mb-4'>
                                    <label htmlFor="">Enter The Quantity</label>
                                    <input type="tel" name="quantity" id="" className='form-control' onChange={handleChange}  maxLength={3} />
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-6 mt-4">
                                <div className="selling-inquiry-submit-button">
                                    <button onClick={handleSubmit}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BuyingInquiry
