import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import StartupTab from "../Startup/StartupTab";
import { useLocation, useNavigate } from "react-router-dom";
import StartUpProfile from "../StartUpProfile/StartUpProfile";
import { BASE_URL } from "../../BASE_URL";
import SecondNavbar from "../Navbar/Navbar";

export default function AddProduct() {
  const { state } = useLocation();
  const _id = state && state._id;

  const [description, setDescription] = useState("");
  const [productName, setshoesname] = useState("");
  const [productprice, setproductprice] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setsubcategoryId] = useState([]);
  const [productstatus, setproductstatus] = useState("");
  const [data, setData] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [files, setFiles] = useState([]);
  const [wishList, setWishList] = useState(false);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleName = (e) => {
    setshoesname(e.target.value.trim());
  };

  const handlePrice = (e) => {
    setproductprice(e.target.value);
  };
  const handleimg = (e) => {
    const { files } = e.target;
    const uploadedPhotos = Array.from(files);
    setFiles(uploadedPhotos);
  };

  const handleCategory = (e) => {
    setcategoryId(e.target.value);
    const selectedOption = e.target.value;
    const selectedData = data.find((item) => item._id === selectedOption);
    console.log("selected data", selectedData);

    if (selectedData) {
      setcategoryIdSub(selectedData._id);
      console.log("id isssssss:", selectedData._id);
    }
  };

  const displayWishList = () => {
    setWishList(true);
  };

  const [categoryIdforSub, setcategoryIdSub] = useState("");
  const subCategoryFetch = async () => {
    try {
      const respo = await fetch(
        `${BASE_URL}/api/subcategory/displayAllByCategoryId?category_id=${categoryIdforSub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (!respo.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await respo.json();

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

  const handlesubcategory = (e) => {
    setsubcategoryId(e.target.value);
  };

  const handleProductStatus = (e) => {
    setproductstatus(e.target.value);
  };

  const handleId = async () => {
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

  const handleback = () => {
    localStorage.setItem("myData", "product");
    navigate(-1);
  };

  useEffect(() => {
    handleId();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!files) {
      toast.error("Product image is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!description) {
      toast.error("Product description is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!productName) {
      toast.error("Product name is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!categoryId) {
      toast.error("Category selection is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!subcategoryId) {
      toast.error("Subcategory selection is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!productstatus) {
      toast.error("Product status is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }
    if (!productprice) {
      toast.error("Product price is required!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("productstatus", productstatus);
    formData.append("productprice", productprice);
    files.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("startupId", _id);

    try {
      const response = await fetch(`${BASE_URL}/api/product/insert`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Product Add failed:", errorDetails);
        throw new Error("Product Add failed");
      }

      console.log(response);
      toast.success("Product added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1, { state: { abc: "addproduct" } });
        localStorage.setItem("myData", "product");
      }, 1000);
    } catch (error) {
      console.error("Product Add failed:", error.message);
      toast.error("Product Add failed. Please try again later.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <SecondNavbar></SecondNavbar>
      <StartUpProfile onBackButtonClick={displayWishList} />
      <div>
        <ToastContainer />
        <div className="flex flex-col lg:flex-row lg:ml-48 pt-8">
          <h1 className="mb-5 text-2xl font-semibold">
            Add Product
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col items-center lg:mt-3">
              <div className="add-award-form lg:w-[556px]">
                <p>Enter product image</p>
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleimg}
                    className="mb-3 w-[559px] h-[46px]"
                  />
                </div>
                <div className="mb-4">
                  <p className="mb-3">Enter product Description</p>
                  <textarea
                    onChange={handleDescription}
                    value={description}
                    cols="30"
                    rows="5"
                    className="w-[559px] h-[147px]"
                  ></textarea>
                </div>
                <div className="lg:block hidden flex justify-between mt-5 mb-5">
                  <button
                    onClick={handleSubmit}
                    className="mr-2 add-award-submit-button h-[50px] w-[267px]"
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={handleback}
                    className="add-award-submit-button h-[50px] w-[267px]"
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="add-award-form mt-1">
                <div className="mb-1">
                  <p className="mb-3">Enter Your Product Name</p>
                  <input
                    type="text"
                    onChange={handleName}
                    value={productName}
                    className="mb-3 w-[559px] h-[46px]"
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select Category</p>
                  <select className="form-control lg:w-[559px] h-[46px]" onChange={handleCategory}>
                    <option value="Select">Select</option>
                    {data &&
                      data.map((e) => (
                        <option key={e._id} value={e._id} className="w-[550px] h-[46px]">
                          {e.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-1">
                  <p className="mb-3">Select Sub Category</p>
                  <select className="form-control lg:w-[559px] h-[46px]" onChange={handlesubcategory}>
                    <option value="Select">Select</option>
                    {subcategory &&
                      subcategory.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
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
                    className="mb-3 w-[559px] h-[46px]"
                  />
                </div>
                <div className="mb-1">
                  <p className="mb-3">Price</p>
                  <input
                    type="text"
                    onChange={handlePrice}
                    value={productprice}
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9 ,.]/g, "");
                      if (value.length > 0 && value[0] === " ") {
                        value = value.slice(1);
                      }
                      e.target.value = value;
                    }}
                    className="w-[559px] h-[46px]"
                  />
                </div>
                 <div className="block lg:hidden flex justify-between mt-5 mb-5">
                  <button
                    onClick={handleSubmit}
                    className="mr-2 add-award-submit-button h-[50px] w-[267px]"
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={handleback}
                    className="add-award-submit-button h-[50px] w-[267px]"
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
