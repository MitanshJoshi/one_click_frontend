import { useState, useEffect } from "react";
import "./shoes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";

const ShoesList = ({ handleDetail }) => {
  const navigate = useNavigate("");
  const handleproductid = (id) => {
    navigate(`/shoes-details/${id}`);
  };

  const [name, setname] = useState([]);

  const fetchData = async () => {
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
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [handleDetail]);

  const [product, setproduct] = useState([]);

  const handleproduct = async (id) => {
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
    } catch (error) {}
  };
  useEffect(() => {
    handleproduct();
  }, []);

  return (
    <div className="form-star">
      <ToastContainer />
      <div className="mb-4">
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-3/4">
            <div className="category">
              <div className="category-heading mb-4 flex justify-between">
                <h4 className="mb-0">All SubCategory</h4>
                <p className="mb-0">View all</p>
              </div>
              <div className="category-list pt-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center">
                  {name.map((e) => (
                    <div key={e._id}>
                      <h5
                        onClick={() => handleproduct(e._id)}
                        className="cursor-pointer"
                      >
                        {e.name}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 flex flex-col justify-center lg:mt-0 lg:ml-3 ">
            <div className="second-home-box mt-2 lg:mt-0 min-w-[250px]">
              <section className="second-home-sectionMaria text-center lg:text-left">
                <div className="flex items-center">
                  <img
                    src="/User Image.png"
                    alt="User"
                    className="w-12 h-12 mt-1 mr-2"
                  />
                  <div className="mr-3">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </section>
            </div>
            <button className="min-w-[250px] btn styleBtn mt-3 ">
              <p className=" mb-0">Post Your Requirement</p>
            </button>
          </div>
        </div>

        <section className="mb-4 mt-4">
          <div>
            <div className="flex justify-between items-center shoes-list-title px-4">
              <h5 className="mb-0">All Shoes</h5>
              <div className="filter-icon">
                <FontAwesomeIcon icon={faFilter} />
              </div>
            </div>
            <div className="mt-4">
              <div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product &&
                    product.map((e) => {
                      return (
                        <div onClick={() => handleproductid(e._id)} className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                          <div className="startup-product-list-display p-4 border border-gray-200 rounded-lg shadow">
                            <div className="">
                              <img
                                src="/shoes.png"
                                alt=""
                                className="img-fluid w-full h-auto"
                              />
                            </div>
                            <div className="startup-product-list-display-detail mt-2">
                              <h6 className="mb-1">{e.productName}</h6>
                              <span>{e.description}</span>
                              <div className="flex justify-between mt-1">
                                <p className="mb-0">Price</p>
                                <p className="mb-0">{e.productprice}</p>
                              </div>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between opacity-50 font-[600] w-full text-[13px]">
                              <div className="">
                                <p className="mb-1 mr-2">Category</p>
                                <h6 className="font-[600]">{e.categoryName}</h6>
                              </div>
                              <div>
                                <p className="mb-1">Sub-Category</p>
                                <h6 className="font-[600]">
                                  {e.subcategoryName}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
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
