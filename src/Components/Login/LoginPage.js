import React, { useState } from "react";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../BASE_URL";

const LoginPage = () => {
  const { setAuthUser }=useAuthContext();
  const [email, setEmail] = useState("");
  // console.log(email.trim());
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/registration");
  };
  
  const handleForgotPassword = () => {
    // Handle forgot password logic here
    navigate("/forgot-password")
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error('Email is required', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }  if (!validateEmail(email)) {
      toast.error('Please enter a valid email address', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    } 
  
  if(!password){
    toast.error("Password is required", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
  });return}

  if(password.length < 6){
    toast.error("Password must  be at least 6 characters long.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
  });return}
  
   

    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Address!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
   

    try {
      const response = await fetch(`https://oneclick-sfu6.onrender.com/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      toast.success("Login Successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
    }, 2000);
      const responseData = await response.json();
      localStorage.setItem("token", responseData.data.token);
      localStorage.setItem("userid", responseData.data.id);
      setAuthUser(responseData.data.id); 
      console.log(responseData);
    } catch (error) {
      if (error) {
        toast.error("Invalid email or password!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
 
  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A/Ctrl+C/Ctrl+V
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // Let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="container form-start">
      <ToastContainer />

      <div className="login">
        <div className="login-wrapper">
          <div className="row w-75 h-100 gx-0 ">
            <div className="col-6 h-100 login">
              <div className="login-form h-100">
                <div className="login-header">
                  <div className="logo">
                    <img
                      src="./NavLogo.png"
                      alt="login logo"
                      className="LoginLogo"
                    />
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
                  <div>
                    <div className=" SignUP-Btn" onClick={handleNavigate}>
                      Sign up
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-center FormHead pt-5">
                    <h1 className="">Hey, John</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                  </div>
                </div>
                <div>
                  <form className="row g-3">
                    <div className="col-12 ">
                      <input
                        type="tel"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        value={email.trim()}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9 a-z @_. ]/g, ''); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === ' ') {
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
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="inputPassword"
                          placeholder="Password"
                          value={password.trim()}
                          onChange={(e) => setPassword(e.target.value.trim())}
                          required
                        />
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
            <div className="col-6">
              <div className="login-image-section h-100">
                <img
                  src="./login-background.jpg"
                  className="login-background-image"
                />
                <div className="image-content">
                  <div className="login-image-content">
                    <div>
                      <img src="./login-side.png" />
                    </div>
                    <div>
                      <h4>
                        "Services offered all over India <br /> across 250+
                        cities"
                      </h4>
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

export default LoginPage;
