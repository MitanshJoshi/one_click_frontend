import React, { useState } from "react";
import "./LoginPage.css"; // Assuming styles are defined here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginInvestor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/registration");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    navigate("/investorforgot");
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      toast.error("Email is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    if (!password) {
      toast.error("Password is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    try {
      const response = await fetch(
        "https://oneclick-sfu6.onrender.com/api/Investor/loginInvestor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            InvestorEmail: email,
            Password: password,
          }),
        }
      );
      const responseData = await response.json();
      console.log("Login response:", responseData);
  
      if (!response.ok) {
        throw new Error("Login failed");
      } // Check the response in console
  
      // Store token in localStorage
      localStorage.setItem("investorToken", responseData.InvestorToken);
      localStorage.setItem("userid", responseData.Investor._id);
  
      toast.success("Login Successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };  

  return (
    <div className="container form-start">
      <ToastContainer />

      <div className="login">
        <div className="login-wrapper">
          <div className="row w-75 h-100 gx-0">
            {/* Left Side */}
            <div className="col-6 h-100 login11">
              <div className="login-form h-100">
                <div className="login-header">
                  <div className="logo">
                    {/* Assuming logo */}
                    <img
                      src="./NavLogo.png"
                      alt="login logo"
                      className="LoginLogo"
                    />
                    {/* SVG path */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="66"
                      height="8"
                      viewBox="0 0 66 8"
                      fill="none"
                    >
                      <path
                        d="M61.386 0.964814L0.884277 7.79433H61.7703C64.6844 7.79433 66.2676 4.38706 64.3885 2.15979C63.6502 1.28477 62.5237 0.836399 61.386 0.964814Z"
                        fill="#74CC7E"
                      />
                    </svg>
                  </div>
                  {/* Sign up button */}
                  <div>
                    <div className=" SignUP-Btn" onClick={handleNavigate}>
                      Sign up
                    </div>
                  </div>
                </div>
                {/* Form section */}
                <div className="mb-3">
                  <div className="text-center FormHead pt-5">
                    <h1 className="">Hey, Investor</h1>
                    <p>
                      Welcome back! Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <div>
                  <form className="row g-3">
                    {/* Email input */}
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {/* Password input */}
                    <div className="col-12">
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {/* Toggle password visibility */}
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                          />
                        </button>
                      </div>
                    </div>
                    {/* Remember me and Forgot password */}
                    <div className="col-12 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-reme" htmlFor="gridCheck">
                          Remember me
                        </label>
                      </div>
                      <div
                        className="forgotpswd"
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </div>
                    </div>
                    {/* Login button */}
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btnLogin mt-2"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Right Side */}
            <div className="col-6">
              <div className="login-image-section h-100">
                {/* Placeholder for background image */}
                <img
                  src="./login-background.jpg"
                  className="login-background-image"
                  alt="Background"
                />
                <div className="image-content">
                  {/* Placeholder content */}
                  <div className="login-image-content">
                    <div>
                      <img src="./login-side.png" alt="Side Image" />
                    </div>
                    <div>
                      <h4>
                        "Services offered all over India <br /> across 250+
                        cities"
                      </h4>
                    </div>
                    {/* Example SVG */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="91"
                        height="15"
                        viewBox="0 0 91 25"
                        fill="none"
                      >
                        <circle
                          opacity="0.5"
                          cx="9.87597"
                          cy="12.0496"
                          r="9.87597"
                          fill="#59E659"
                        />
                        <circle
                          cx="45.5002"
                          cy="12.4023"
                          r="12.345"
                          fill="#59E659"
                        />
                        <circle
                          opacity="0.5"
                          cx="81.124"
                          cy="12.0496"
                          r="9.87597"
                          fill="#59E659"
                        />
                      </svg>
                    </div>
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

export default LoginInvestor;
