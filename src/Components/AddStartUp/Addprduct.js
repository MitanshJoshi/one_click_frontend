import React, { useEffect, useState } from "react";
import "./AddStartUp.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Countries from "../../CountryStateCity.json";
import { BASE_URL } from "../../BASE_URL";

const AddStartUp = () => {
  const [startupName, setStartupName] = useState("");
  const [email, setEmail] = useState("");
  const [inqubationCenterId, setCenterId] = useState("");
  const [inqubationCenterCity, setCenterCity] = useState("");
  const [yearOfEstablished, setYearOfEstablished] = useState("");
  const [registeredAs, setRegisteredAs] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setsubcategoryId] = useState("");
  const [image, setimage] = useState("");
  const [data, setdata] = useState();
  const [subcategory, setsubcategory] = useState();
  const [inqubation, setinqubation] = useState();
  const [selectedState, setSelectedState] = useState(null);
  // const [logo, setlogo] = useState(null);
  const { id } = useParams();
  const Navigate = useNavigate();
  const indiaObject = Countries.find((country) => country.name === "India");

  const handlestartupname = (e) => {
    setStartupName(e.target.value.trim());
  };
  const handleemail = (e) => {
    setEmail(e.target.value.trim());
  };
  const handlecenter = (e) => {
    setCenterId(e.target.value);
  };
  const handlecentercity = (e) => {
    setCenterCity(e.target.value);
  };
  const handleyears = (e) => {
    const inputyear=e.target.value.substring(0, 4);
    setYearOfEstablished(inputyear)
  };
  const handleregister = (e) => {
    setRegisteredAs(e.target.value);
  };
  const handleaddress = (e) => {
    setAddress(e.target.value);
  };
  const handlecontact = (e) => {
    setContactNumber(e.target.value.trim());
  };
  const handleperson = (e) => {
    setContactPerson(e.target.value.trim());
  };
  const handlecountry = (e) => {
    setCountry(e.target.value);
  };
  const handleimg = (e) => {
    const { files } = e.target;

    const selectedFile = files[0];

    setimage(selectedFile);
    // setimage(URL.createObjectURL(selectedFile))
  };
  const handlestate = (e) => {
    const selectedStateName = e.target.value;
    const selectedState = indiaObject.states.find(
      (state) => state.name === selectedStateName
    );

    setSelectedState(selectedState);
    setState(selectedStateName);
    setCity(""); // Reset the city selection
  };
  const handlecity = (e) => {
    setCity(e.target.value);
  };
  const handlepincode = (e) => {
    setPincode(e.target.value.trim( ));
  };
  const handlecategory = (e) => {
    setcategoryId(e.target.value);
    const selectedOption = e.target.value; // Get the value of the selected option
    const selectedData = data.find((item) => item._id === selectedOption); // Find the selected item in the data array
    if (selectedData) {
      setcategoryIdSub(selectedData._id); // Set the _id of the selected item to the state variable
      console.log(selectedData._id);
    }
  };

  const [categoryIdforSub, setcategoryIdSub] = useState("");

  const handlesubcategory = (e) => {
    setsubcategoryId(e.target.value);
  };
  // const handleimg = (e) => {
  //   setStartupLogo(e.target.value);
  // };

  const subCategoryFetch = async () => {
    try {
      const respo = await fetch(
        `${BASE_URL}/api/subcategory/displayAllByCategoryId?category_id=${categoryIdforSub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Check if the response status is okay
      if (!respo.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response as JSON
      const responseData = await respo.json();

      // Check if responseData.data exists before calling categoryIdforSub
      if (responseData && responseData.data) {
        setsubcategory(responseData.data);
        console.log(responseData.data);
      } else {
        console.error("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (categoryIdforSub) {
      console.log(categoryIdforSub);
      subCategoryFetch();
    }
  }, [categoryIdforSub]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
 
  // const handleemail = (e) => {
  //   const value=(e.target.value.trim());
  //   setEmail(value);
  // };
  
  const handleAddstartup = async (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically
    // Validate all fields
    if (!startupName) {
      toast.error("Start-up Name is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!email) {
      toast.error("Email is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!inqubationCenterId) {
      toast.error("Incubation Center is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!inqubationCenterCity) {
      toast.error("Incubation Center City is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!yearOfEstablished) {
      toast.error("Select Years of established is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!registeredAs) {
      toast.error("Registered as is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!address) {
      toast.error("Address as is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!address) {
      toast.error("Address as is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!contactNumber) {
      toast.error("Contact No as is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (contactNumber.length <= 9) {
      toast.error("Please enter a valid 9-digit mobile number", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!contactPerson) {
      toast.error("Contact Person is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!country) {
      toast.error(" Country is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!state) {
      toast.error(" State is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!city) {
      toast.error(" City is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!pincode) {
      toast.error("Pincode is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (pincode.length < 6) {
      toast.error("Please enter a valid 6-digit Pincode!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!categoryId) {
      toast.error("Start-Up Category is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    if (!subcategoryId) {
      toast.error("Start-Up Sub-Category is must be required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("startupName", startupName);
    formData.append("address", address);
    formData.append("contactNumber", contactNumber);
    formData.append("contactPerson", contactPerson);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("inqubationCenterId", inqubationCenterId);
    formData.append("inqubationCenterCity", inqubationCenterCity);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("image", image);
    formData.append("yearOfEstablished", yearOfEstablished);
    formData.append("registeredAs", registeredAs);
    formData.append("pincode", pincode);
    try {
      const response = await fetch(`${BASE_URL}/api/startup/insert`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },
        body:formData,
      });

      if (!response.ok) {
        throw new Error("AddStartUpfailed");
      }
      console.log(response);
      toast.success("AddStartUp Successfull !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        Navigate("/my-fullinfo");
      }, 1000); 
    } catch (error) {
      console.error("AddStartUp failed:", error.message);
      toast.error("AddStartUp failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleid = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/category/displayAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const responseData = await res.json();
      setdata(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {
    handleid();
  }, []);

  const center = async () => {
    try {
      const respone = await fetch(
        `${BASE_URL}/api/inqubation/display`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!respone.ok) {
        throw new Error("Request failed");
      }
      const responseData = await respone.json();
      setinqubation(responseData.data);
      console.log(responseData.data, "hello word");
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    }
  };
  useEffect(() => {
    center();
  }, []);
  return (
    <>
      <div>
        <div className="container mt-5 mb-5">
          <ToastContainer />
          <div className="add-start-up mb-3">+ Add Start-up</div>
          <div className="lorem-ipsum-dolor-container mb-5">
            <p className="lorem-ipsum-dolor mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <p className="lorem-ipsum-dolor ">
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="startupName">
                    Start-up Name
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="startupName"
                    onChange={handlestartupname}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === ' ') {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="email">
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleemail}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 a-z @._]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === " ") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    className="mb-2 LabelDesign"
                    htmlFor="incubationCenter"
                  >
                    Incubation Center
                  </label>
                  <select
                    className="form-control"
                    id="incubationCenter"
                    onChange={handlecenter}
                  >
                    <option value="Select">Select</option>
                    {inqubation &&
                      inqubation.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.IcName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label
                    className="mb-2 LabelDesign"
                    htmlFor="incubationCenterCity"
                  >
                    Incubation Center City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="incubationCenterCity"
                    onChange={handlecentercity}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="country">
                    Select Years of established
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="incubationCenterCity"
                    value={yearOfEstablished ? `${yearOfEstablished}-01-01` : ""} // Set the input value to the first day of the input year
                    onChange={handleyears}
                    max="9999-01-01" // Set the maximum allowed year
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="country">
                    Registered as
                  </label>
                  <select
                    className="form-control"
                    id="country"
                    onChange={handleregister}
                  >
                    <option value="Select">Select</option>
                    <option value="pvt ltd">pvt ltd</option>
                    <option value="propriyor">propritor</option>
                    <option value="llp">llp</option>
                    <option value="partenership">partenership</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    onChange={handleaddress}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === " ") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                    maxLength={200}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="contactNo">
                    Contact No
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactNo"
                    onChange={handlecontact}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === "0") {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                    maxLength={10}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="mb-2 LabelDesign" htmlFor="contactPerson">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson"
                    onChange={handleperson}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 a-z A-Z]/g, ''); // Remove non-numeric characters
                      // Check if the first digit is zero
                      if (value.length > 0 && value[0] === ' ') {
                        // If the first digit is zero, remove it
                        value = value.slice(1);
                      }
                      // Set the updated value
                      e.target.value = value;
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 LabelDesign" htmlFor="country">
                        Select Country
                      </label>
                      <select
                        className="form-control"
                        id="country"
                        onChange={handlecountry}
                      >
                        <option value="Select">Select</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 LabelDesign" htmlFor="state">
                        Select State
                      </label>
                      <select
                        className="form-control"
                        id="state"
                        onChange={handlestate}
                      >
                        <option value="Select">Select</option>
                        {indiaObject &&
                          indiaObject.states.map((e) => {
                            return <option value={e.name}>{e.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 LabelDesign " htmlFor="city">
                        Select City
                      </label>
                      <select
                        className="form-control"
                        id="city"
                        onChange={handlecity}
                      >
                        <option value="Select">Select</option>
                        {selectedState &&
                          selectedState.cities.map((e) => {
                            return <option value={e.name}>{e.name}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 LabelDesign" htmlFor="pincode">
                        Enter Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        onChange={handlepincode}
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                          // Check if the first digit is zero
                          if (value.length > 0 && value[0] === "0") {
                            // If the first digit is zero, remove it
                            value = value.slice(1);
                          }
                          // Set the updated value
                          e.target.value = value;
                        }}
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="LabelDesign" htmlFor="startupCategory">
                    Select Start-Up Category
                  </label>
                  <select
                    className="form-control"
                    id="startupCategory"
                    onChange={handlecategory}
                  >
                    <option value="">Select</option>
                    {data &&
                      data.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label className="LabelDesign" htmlFor="startupSubCategory">
                    Select Start-Up Sub-Category
                  </label>
                  <select
                    className="form-control "
                    id="startupSubCategory"
                    onChange={handlesubcategory}
                    // style={{marginBottom:"63px"}}
                  >
                    <option value="Select">Select</option>
                    {subcategory &&
                      subcategory.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="drop-your-image-here-or-browse-parent form-group "style={{height:"143px"}}>
                  <img
                   
                    class="group-child23"
                    alt=""
                    src="./public/rectangle-287@2x.png"
                    style={{ width: "100px" }}
                  />
                  <div className="about-us">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <input type="file" name="" id=""  onChange={handleimg} className="pt-3 ps-5 pb-2" />
                     <p className="pe-5">Supports jpg, png, jpeg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-4">
              <button
                type="submit"
                className="btnstartup me-3"
                style={{ padding: "10px 100px" }}
              >
                Back
              </button>
              <button
                type="submit"
                className="btnstartup"
                onClick={handleAddstartup}
              >
                Submit
              </button>
              {/* <button type="submit" className="btnstartup" onClick={handleedit}>Add Start-up</button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStartUp;
