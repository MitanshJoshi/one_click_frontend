import React, { useState, useEffect } from "react";
import "./start-up.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    setListView(true);
  };

  const handleGridview = () => {
    setListView(false);
  };

  const { _id } = useParams();
  console.log(_id);
  // const { startUpId } = useParams();

  const handleedit = (id) => {
    navigate("/productedit", { state: { _id, id } });
  };

  const [data, setdata] = useState([]);
  console.log(data);
  const fetchData = async () => {
    // console.log(localStorage.getItem("tokenData"));

    try {
      const response = await fetch(
        `${BASE_URL}/api/startup/displaydetail?startupId=${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
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
                  >
                    <option value="">select category</option>
                    <option value="">select</option>
                    <option value="">select</option>
                    <option value="">select</option>
                    <option value="">select</option>
                  </select>
                </div>
              </div>
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
                  >
                    <option value="">select sub-category</option>
                    <option value="">select</option>
                    <option value="">select</option>
                    <option value="">select</option>
                    <option value="">select</option>
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
                <div className="startup-product-add-button">
                  <button onClick={() => handleaddproduct(_id)}>
                    + Add Product
                  </button>
                </div>
                <div className="ms-4">
                  <FontAwesomeIcon
                    icon={faList}
                    className="startup-add-product-icons"
                    onClick={handleGridview}
                  />
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="startup-add-product-icons startup-add-product-icons-2"
                    onClick={handleListview}
                  />
                </div>
              </div>
            </div>

            {listView ? (
              <>
                <div className="mt-5">
                  <div>
                    <div className="product-list-view d-flex align-item-center justify-content-betweenx">
                      <div className="pe-5 ">
                        <div>
                          <p>Product Description</p>
                        </div>
                      </div>
                      <div className="pe-5">
                        <div>
                          <p>Product Name</p>
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
                      <div className="pe-5">
                        <div>
                          <p>Product Edit</p>
                        </div>
                      </div>
                    </div>
                    {data &&
                      data.map((e) => {
                        return (
                          <>
                            <div className="product-list-view product-list-view-content d-flex align-item-center justify-content-between">
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
                                    className="ms-3  "
                                    style={{ width: "80px" }}
                                  >
                                    {e.productName}
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
                                  <Nav.Link
                                    className="ms-5 edit-shoe-list-button"
                                    href=""
                                    onClick={() => handleedit(e._id)}
                                  >
                                    EDIT
                                  </Nav.Link>
                                  <a
                                    onClick={() => handledeletproduct(e._id)}
                                    className="ms-5 delete-shoe-list-button"
                                    style={{ cursor: "pointer" }}
                                  >
                                    DELETE
                                  </a>
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
