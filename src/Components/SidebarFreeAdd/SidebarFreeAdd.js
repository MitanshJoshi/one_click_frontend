import React, { useState, useEffect } from "react";
import "./SidebarFreeAdd.css";
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
            Authorization: localStorage.getItem("token"),
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
              <input
                type="search"
                id="site-search"
                name="q"
                className="searchType px-3"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="scrollable-content" style={{ maxHeight: "1294px", overflowY: "auto" }}>
                {filteredNames.map((e, index) => (
                  <div className="Elements mb-4 mt-3" key={index}>
                    <img
                      src="./Side1.png"
                      alt="agriculture"
                      className="image"
                    />
                    <p style={{ marginLeft: "20px" }}>{e.name}</p>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="postBtnParent">
                  <p className="postBtn"> + Post a Free Ad</p>
                </div>

                <div className="postBtnParent mt-2 mb-5">
                  <p className="postBtn"> Download App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFreeAdd;
