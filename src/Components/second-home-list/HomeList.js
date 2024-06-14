import React, { useEffect, useState } from "react";
import "./homelist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../BASE_URL";

const HomeList = ({ handlesubcategory }) => {
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
    <div className="home-list-container">
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <div className="second-home-sidebar px-4">
              <div className="d-flex justify-content-between align-items-center pt-4 mb-4 second-home-categories">
                <div>
                  <h5 className="mb-0">Related categories</h5>
                </div>
                <div>
                  <select name="" id="">
                    <option value="">All</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </div>
              </div>

              <div className="mb-5 second-home-searchType">
              {searchTerm === '' && <FaSearch className="search-ic" />}
                <input
                  type="search"
                  id="site-search"
                  name="q"
                  className="px-3"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="home-list-scroll">
                {filteredNames.map((e, index) => (
                  <div className="Elements mb-4 mt-3" key={index} >
                    <img
                      src="./Side1.png"
                      alt="agriculture"
                      className="image"
                    />
                    <p
                      style={{ marginLeft: "20px", cursor:"pointer" }}
                      onClick={() => handlesubcategory(e._id)}
                    >
                      {e.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="second-home-postBtnParent">
                  <p className="second-home-postBtn"> + Post a Free Ad</p>
                </div>

                <div className="second-home-postBtnParent mt-2 mb-5">
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

export default HomeList;
