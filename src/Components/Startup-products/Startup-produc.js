import React, { useState, useEffect } from "react";
import "./start-up.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
// import { useState } from 'react';
import Button from "react-bootstrap/Button";
import {
  faStar,
  faComment,
  faList,
  faTableCells,
  faPhoneVolume,
  faMessage,
  faShareNodes,
  faHeart,
  faGlobe,
  faCalendar,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { BASE_URL } from "../../BASE_URL";

const Startup_product = () => {
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [product, setproduct] = useState(false);
  const [data1, setdata1] = useState();
  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setsubcategoryId] = useState([]);
  const [subcategory, setsubcategory] = useState();
  
  const [categoryIdforSub, setcategoryIdSub] = useState("");
  const [activeView, setActiveView] = useState('list'); // Initial state set to 'list' view
  const [investorToken, setinvestorToken] = useState(localStorage.getItem("investorToken"));

    const handleListview1 = () => {
        setActiveView('list');
    };

    const handleGridview1 = () => {
        setActiveView('grid');
    };

    const listStyle = {
        background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
    };

    const gridStyle = {
        background: 'linear-gradient(to bottom, #9ad1a0, #00818a)',
    };

    const inactiveStyle = {
        background: 'linear-gradient(to bottom, #c8dbca, #a4c7c9)',
    };


  const handlesubcategory = (e) => {
    setsubcategoryId(e.target.value);
  };
  const subCategoryFetch = async () => {

    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    try {
      const respo = await fetch(
        `${BASE_URL}/api/subcategory/displayAllByCategoryId?category_id=${categoryIdforSub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      // Check if the response status is okay
      if (!respo.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the response as JSON
      const responseData = await respo.json();
      console.log('resp data',responseData);
      

      // Check if responseData.data exists before calling categoryIdforSub
      if (responseData && responseData.data) {
        setsubcategory(responseData.data);
        console.log("subcategoties"+subcategory);
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


  const handleCancelDelete = () => {
    setshowConfirmation(false);
  };
  const handledeletproduct = (id) => {
    setproduct(id);
    setshowConfirmation(true);
  };
  const navigate = useNavigate();
  const handleaddproduct = (_id) => {
    navigate("/addproduct", { state: { _id } });
  };

  const handleCategory = (e) => {
    setcategoryId(e.target.value);
    const selectedOption = e.target.value;
    const selectedData = data.find((item) => item._id === selectedOption);
    if (selectedData) {
      setcategoryIdSub(selectedData._id);
    }
  };
  // const array = [
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  //   { hyyy: "dnfkdf" },
  // ];

  const [listView, setListView] = useState(true);

  const handleListview = () => {
    setActiveView('list');
    setListView(true);
  };

  const handleGridview = () => {
    setActiveView('grid');
    setListView(false);
  };

  const { _id } = useParams();
  console.log(_id);
  // const { startUpId } = useParams();

  const handleedit = (id) => {
    navigate("/productedit", { state: { _id, id } });
  };
  const handleid = async () => {
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/api/category/displayAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const responseData = await res.json();
      setdata1(responseData.data);
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

  const [data, setdata] = useState([]);
  console.log(data);
  const fetchData = async () => {
    // console.log(localStorage.getItem("tokenData"));
    const token=investorToken?localStorage.getItem("investorToken"):localStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      console.log('responseData',responseData);
      
      setdata(responseData.data[0].product);
      // console.log(setdata);
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
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/product/delete?product_id=${product}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setshowConfirmation(false);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      fetchData();
      toast.success(" Product Delete successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  const handleViewReviews = (productId) => {
    navigate(`/product-reviews/${productId}`);
  };

  return (
    <>
      <section className="mt-5">
        <ToastContainer />
        <div className="startup-products">
          <div>
            <div className="row">
              <div className="col-5">
                <div className="w-100">
                  <select
                    name=""
                    id=""
                    className="form-control"
                    style={{
                      color: "#000",
                      opacity: "0.4",
                      fontWeight: "600",
                      fontFamily: "poppins",
                    }}
                    onChange={handleCategory}
                  >
                   <option value="">Select Category</option>
                    {data1 &&
                      data1.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      ))}
                    <option value="">select</option>
                  </select>
                </div>
              </div>
              <div className="col-5">
                <div className="w-100">
                  <select
                    name=""
                    id="startupSubCategory"
                    className="form-control"
                    style={{
                      color: "#000",
                      opacity: "0.4",
                      fontWeight: "600",
                      fontFamily: "poppins",
                    }}
                    onChange={handlesubcategory}

                  >
                    <option value="Select">Select Sub-category</option>
                    {subcategory &&
                      subcategory.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-2">
                <div className="w-100">
                  <input
                    type="text"
                    className="form-control"
                    
                    placeholder="Search"
                    style={{
                      color: "#000",
                      opacity: "0.6",
                      fontWeight: "600",
                      fontFamily: "poppins",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between "
              style={{ marginTop: "40px" }}
            >
              <div className="startup-products-header">
                <h6>All Product</h6>
                <img src="" alt="" />
              </div>
              <div className="d-flex">
               {!investorToken? <div className="startup-product-add-button">
                  <button onClick={() => handleaddproduct(_id)}>
                    + Add Product
                  </button>
                </div>:<></>}
                <div className="ms-4">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons"
                    onClick={handleListview}
                    style={activeView === 'list' ? listStyle : inactiveStyle}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2"
                    onClick={handleGridview}
                    style={activeView === 'grid' ? gridStyle : inactiveStyle}
                  />
                </div>
              </div>
            </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div>
                    <div className="product-list-view d-flex align-item-center justify-content-betweenx">
                    <div className="pe-5">
                        <div>
                          <p>Product Name</p>
                        </div>
                      </div>
                      <div className="pe-5 ">
                        <div>
                          <p>Product Description</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Category</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Sub Category</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Status</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Product Price</p>
                        </div>
                      </div>
                     {!investorToken? <div className="pe-5">
                        <div>
                          <p>Product Edit</p>
                        </div>
                      </div>:<></>}
                    </div>
                    {data &&
                      data.map((e) => {
                        return (
                          <>
                            <div className="product-list-view product-list-view-content d-flex align-item-center justify-content-between">
                            <div className="">
                                <div className="d-flex align-items-center h-100">
                                  <h5
                                    className="ms-3  "
                                    style={{ width: "80px" }}
                                  >
                                    {e.productName}
                                  </h5>
                                </div>
                              </div>
                              <div className="">
                                <div className="d-flex align-items-center ">
                                  <img className="me-3" src="" alt="" />
                                  <h5
                                    className="mb-0 me-5"
                                    style={{ width: "80px" }}
                                  >
                                    {e.description}
                                  </h5>
                                </div>
                              </div>
                              <div className="">
                                <div className="d-flex align-items-center h-100">
                                  <h5
                                    className="mb-0 ms-2"
                                    style={{ width: "80px" }}
                                  >
                                    {e.categoryName}
                                  </h5>
                                </div>
                              </div>
                              <div className="">
                                <div className="d-flex align-items-center h-100">
                                  <h5
                                    className="mb-0"
                                    style={{ width: "80px" }}
                                  >
                                    {e.subcategoryName}
                                  </h5>
                                </div>
                              </div>
                              <div className="">
                                <div className="d-flex align-items-center h-100">
                                  <h5
                                    className="mb-0 ms-2"
                                    style={{ width: "80px" }}
                                  >
                                    {e.productstatus}
                                  </h5>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center edit-list-anchors">
                                  <h5
                                    className="mb-0 "
                                    style={{ width: "80px" }}
                                  >
                                    {e.productprice}
                          
                                  </h5>
                                  {!investorToken?<div className="flex items-center mr-[61px]">
                                  <Nav.Link
                                    className="ms-5"
                                    href=""
                                    onClick={() => handleedit(e._id)}
                                  >
                                  <FontAwesomeIcon icon={faEdit} />
                                  </Nav.Link>
                                  <a
                                    onClick={() => handledeletproduct(e._id)}
                                    className="ms-3"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                  </a>
                                  <div className="startup-product-add-button mr-[-190px] ml-[20px]">
                                  <button className="p-[2px]" onClick={() => handleViewReviews(e._id)}>View Reviews</button>
                                  </div>
                                  </div>:<></>}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="row gx-5 mt-3 gy-4">
                    {data &&
                      data.map((e) => {
                        return (
                          <>
                            <div className="col-4">
                              <div className="startup-product-list-display">
                                <div className="pt-3">
                                  <img
                                    src="/shoes.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="startup-product-list-display-detail">
                                  <h6 className="mb-2">
                                    {e.productName}
                                  </h6>
                                  <span>{e.description}</span>
                                  <div className="d-flex justify-content-between">
                                    <p className="mb-0">Price</p>{" "}
                                    <p className="mb-0">{e.productprice}</p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between startup-product-categories pb-3">
                                  <div>
                                    <p className="mb-1">Category</p>
                                    <h6>{e.categoryName}</h6>
                                  </div>
                                  <div>
                                    <p className="mb-1">Sub-Category</p>
                                    <h6>{e.subcategoryName}</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <h3 className="confirmation-message">
                Are you sure you want to delete this Product?
              </h3>
              <div className="buttons-container">
                <button className="btng" onClick={handleConfirmDelete}>Yes</button>
                <button className="btnr" onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Startup_product;
