import { useState, useEffect } from "react";
import "./shoes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";

const ShoesList = ({ handleDetail }) => {
  const navigate = useNavigate("");
  const handleproductid =(id)=>{
    navigate(`/shoes-details/${id}`)
  }

  const [name, setname] = useState([]);

  const fetchData = async () => {
    // console.log(localStorage.getItem("tokenData"));
    try {
      const response = await fetch(
        `${BASE_URL}/api/subcategory/displayAllByCategoryId?category_id=${handleDetail}`,
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
      setname(responseData.data);
      // console.log(responseData.data);
    } catch (error) {
      
    }
  };
  useEffect(() => {
    fetchData();
  }, [handleDetail]);

  const [product,setproduct]=useState([])
  // console.log(product)
  const handleproduct = async (id) => {
    // console.log(localStorage.getItem("tokenData"));

    try {
      const response = await fetch(
        `${BASE_URL}/api/product/subcategory_by_product?subcategory_id=${id}`,
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
      setproduct(responseData.data);
      console.log(responseData.data);
    } catch (error) {
   
    }
  };
  useEffect(() => {
    handleproduct();
  }, []);


  return (
    <div className="form-star">
      <ToastContainer />
      <div className="row">
        <div className=" mb-4">
          <div>
            <div className="row me-2">
              <div className="col-8 ">
                <div>
                  <div className="category">
                    <div className="category-heading mb-4">
                      <h4 className="mb-0">All SubCategory</h4>
                      <p className="mb-0">View all</p>
                    </div>
                    <div className="category-list pt-2">
                      <div className="row gy-2 gx-2 text-center ">
                        {/* Map over categories array */}
                        {name.map((e) => (
                          <div className="col-4">
                            <h5  onClick={() => handleproduct(e._id)} style={{cursor:"pointer"}}>{e.name}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>  
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex flex-column justify-content-center">
                  <div className="">
                    <div className="second-home-box">
                      <section className="second-home-sectionMaria text-center text-md-left">
                        <div className="d-flex align-items-center">
                          <img
                            src="/User Image.png"
                            style={{ width: "50px", height: "48px" }}
                            alt="User"
                            className="img-fluid mt-1 me-2"
                          />
                          <div className="me-3">
                            <p className="second-home-maria mb-0">Maria</p>
                            <p className="second-home-deals mb-0">98 Deals</p>
                          </div>
                          <svg
                            className="mt-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </section>
                    </div>
                    <button className="btn styleBtn mt-3 w-100">
                      <p className="w-100 mb-0">Post Your Requirment</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className=" mb-4 mt-4">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center shoes-list-title">
                <h5 className="mb-0 ms-4">All Shoes</h5>
                <div className="filter-icon">
                  <FontAwesomeIcon icon={faFilter} />
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div>
                <div className="row gy-4" >
                  {product &&
                    product.map((e) => {
                      return (
                        <>
                          <div className="col-4">
                            <div
                              className="startup-product-list-display"
                              onClick={() => handleproductid(e._id)}
                              style={{ cursor: "pointer", width:"180px", height:"300px" }}
                            >
                              <div className="pt-3">
                                <img
                                  src="./shoes.png"
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="startup-product-list-display-detail">
                                <h6 className="mb-2" style={{fontSize:"10px"}}>{e.productName}</h6>
                                <span style={{fontSize:"10px"}}>{e.description}</span>
                                <div className="d-flex justify-content-between">
                                  <p className="mb-0" style={{fontSize:"10px"}}>Prototype</p>
                                  <p className="mb-0" style={{fontSize:"15px"}}>${e.productprice}</p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between startup-product-categories pb-3 gap-5">
                                <div>
                                  <p className="mb-1" style={{fontSize:"10px"}}>Category</p>
                                  <h6 style={{fontSize:"10px"}}>{e.categoryName}</h6>
                                </div>
                                <div>
                                  <p className="mb-1" style={{fontSize:"10px"}}>Sub-Category</p>
                                  <h6 style={{fontSize:"10px"}}>{e.subcategoryName}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShoesList;
