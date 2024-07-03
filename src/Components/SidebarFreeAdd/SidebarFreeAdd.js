import React, { useState, useEffect } from "react";
import "./SidebarFreeAdd.css";
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";

const SidebarFreeAdd = () => {
  const [name, setName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchdata = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/category/displayAllWithoutAuth`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const responseData = await response.json();
      setName(responseData.data?.allCategory);
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
    fetchdata();
  }, []);

  const filteredNames = name.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container mt-3 ">
        <ToastContainer />
        <div className="row ">
          <div className="col-md-12 sidebarscroll">
            
            <div className="sidebar px-4 ">
            <div className="relative mb-3 w-full max-w-md mx-auto">
      {searchTerm === '' && (
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{top:"70%",left:"4.5%"}} />
      )}
      <input
        type="search"
        id="site-search"
        name="q"
        className="w-full mt-[30px] pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
              <div className="custom-scrollbar" style={{ maxHeight: "1294px", overflowY: "auto" }}>
                {filteredNames.map((e, index) => (
                  <div className="Elements mb-4 mt-3" key={index}>
                    <img
                      src="./Side1.png"
                      alt="agriculture"
                      className="image"
                    />
                    <p className="ml-[20px] font-bold">{e.name}</p>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center parant">
                <button className='btn styleBtn mt-3'><p className='mx-4 mb-0'>+ Post a Free Ad</p></button>

                <button className='btn styleBtn mt-3 mb-3'><p className='mx-4 mb-0'>Download App</p></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFreeAdd;
