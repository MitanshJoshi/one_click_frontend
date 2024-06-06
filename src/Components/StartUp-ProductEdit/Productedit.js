import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../Navbar/Navbar";
import { BASE_URL } from "../../BASE_URL";

export default function ProductEdit() {
  const { state } = useLocation();
  const _id = state && state.id;
  const startupId = state && state._id;

  const [description, setDescription] = useState("");
  const [productName, setShoesname] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  // console.log(categoryId)
  const [subcategoryId, setSubcategoryId] = useState("");
  const [productstatus, setProductStatus] = useState("");
  const [data, setData] = useState([]);
  const [sub, setSub] = useState([]);
  const [file, setFile] = useState([]);
  const [matchedStartup, setMatchedStartup] = useState(null);

  useEffect(() => {
    if (matchedStartup) {
      const { description, productprice, productName, productstatus, categoryId, subcategoryId } = matchedStartup;
      setDescription(description);
      setProductPrice(productprice);
      setShoesname(productName);
      setProductStatus(productstatus);
      setCategoryId(categoryId);
      setSubcategoryId(subcategoryId);
    }
  }, [matchedStartup]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories(categoryId);
    }
  }, [categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/startup/displaydetail?startupId=${startupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const responseData = await response.json();
      const matchedStartup = responseData?.data?.[0]?.product.find((item) => item._id === _id);
      console.log(matchedStartup);
      if(matchedStartup){
        setMatchedStartup(matchedStartup);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/subcategory/displayAllByCategoryId?category_id=${categoryId}`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }

      const responseData = await response.json();
      setSub(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to fetch subcategories", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleName = (e) => {
    setShoesname(e.target.value);
  };

  const handlePrice = (e) => {
    setProductPrice(e.target.value);
  };

  const handleImg = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCategory = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubcategory = (e) => {
    setSubcategoryId(e.target.value);
  };

  const handleProductStatus = (e) => {
    setProductStatus(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Form validation code here

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("productstatus", productstatus);
    formData.append("productprice", productprice);
    formData.append("image", file);
    formData.append("startupId", startupId);

    try {
      const response = await fetch(`${BASE_URL}/api/product/edit?product_id=${_id}`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Product edit failed");
      }

      toast.success("Product edit successful!", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
      setTimeout(() => {
        navigate(-1);
        localStorage.setItem("myData", "product");
      }, 1000);
    } catch (error) {
      console.error("Product edit failed:", error);
      toast.error("Product edit failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const handleid = async () => {
    try {
      const res = await fetch( `${BASE_URL}/api/category/displayAll`, {
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
      setData(responseData.data);
      // console.log(responseData.data);
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


  return (
    <>
      <SecondNavbar />
      <div>
        <ToastContainer />
        <div className="d-flex justify-content-between">
          <h2 className="mb-5 ps-5" style={{ fontWeight: "600" }}>
            Edit Product
          </h2>
        </div>
        <div>
          <div className="row gap-0">
            <div className="col-6 d-flex align-item-center justify-content-center">
              <div className="add-award-form" style={{ width: "556px", height: "181px" }}>
                <p className="">Enter product image</p>
                <div className="mb-4">
                  <input
                    type="file"
                    onChange={handleImg}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-4">
                  <p className="mb-3">Enter product Description</p>
                  <textarea
                    onChange={handleDescription}
                    value={description}
                    cols="30"
                    rows="5"
                    style={{ width: "559px", height: "147px" }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between mt-5 mb-5 ">
                  <button
                    onClick={handleSubmit}
                    className="add-award-submit-button "
                    style={{ height: "50px", width: "267px" }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="add-award-form mt-1">
                <div className="mb-1">
                  <p className="mb-3">Enter Your Product Name</p>
                  <input
                    type="text"
                    onChange={handleName}
                    value={productName}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select Category</p>
                  <select
                    className="form-control"
                    value={categoryId}
                    onChange={handleCategory}
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="">Select</option>
                    {data.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select Sub Category</p>
                  <select
                    className="form-control"
                    onChange={handleSubcategory}
                    value={subcategoryId}
                    style={{ width: "559px", height: "46px" }}
                  >
                    <option value="">Select</option>
                    {sub.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-3">Product Status</p>
                  <input
                    type="text"
                    onChange={handleProductStatus}
                    value={productstatus}
                    className="mb-3"
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Price</p>
                  <input
                    type="text"
                    onChange={handlePrice}
                    value={productprice}
                    style={{ width: "559px", height: "46px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
