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
      <div className="px-4 lg:px-16">
        <ToastContainer />
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-2xl">Edit Product</h2>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex lg:flex-row flex-col  justify-center">
            <div className="add-award-form w-full max-w-md">
              <p>Enter product image</p>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleImg}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Enter product Description</p>
                <textarea
                  onChange={handleDescription}
                  value={description}
                  cols="30"
                  rows="5"
                  className="w-full h-36"
                ></textarea>
              </div>
              <div className="lg:block hidden flex justify-between mt-5 mb-5 w-full">
                <button
                  onClick={handleSubmit}
                  className="add-award-submit-button h-12 w-1/2 mr-2"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="add-award-form  w-full max-w-md">
              <div className="mb-4">
                <p className="mb-3">Enter Your Product Name</p>
                <input
                  type="text"
                  onChange={handleName}
                  value={productName}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Select Category</p>
                <select
                  className="form-control w-full mb-3 h-12"
                  value={categoryId}
                  onChange={handleCategory}
                >
                  <option value="">Select</option>
                  {data.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="mb-3">Select Sub Category</p>
                <select
                  className="form-control w-full mb-3 h-12"
                  onChange={handleSubcategory}
                  value={subcategoryId}
                >
                  <option value="">Select</option>
                  {sub.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p className="mb-3">Product Status</p>
                <input
                  type="text"
                  onChange={handleProductStatus}
                  value={productstatus}
                  className="w-full mb-3 h-12"
                />
              </div>
              <div className="mb-4">
                <p className="mb-3">Price</p>
                <input
                  type="text"
                  onChange={handlePrice}
                  value={productprice}
                  className="w-full h-12"
                />
              </div>
              <div className="block lg:hidden flex justify-between mt-5 mb-5 w-full">
                <button
                  onClick={handleSubmit}
                  className="add-award-submit-button h-12 w-1/2 mr-2"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
