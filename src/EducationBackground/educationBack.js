import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../BASE_URL";

const EducationBack = () => {
  const [educationData, setEducationData] = useState({
    college_university_name: "",
    passing_year: "",
    highest_Education: "high-school", // Default value if not provided by API
  });

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Education/getEducation`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch education data");
        }

        const responseData = await response.json();
        if (responseData) {
          setEducationData({
            college_university_name: responseData.college_university_name || "",
            passing_year: responseData.passing_year || "",
            highest_Education: responseData.highest_Education || "high-school",
          });
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
        toast.error("Failed to fetch education data", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    };

    fetchEducationData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  const handleEducationSubmit = async (e) => {
    e.preventDefault();

    // Destructure educationData object
    const { college_university_name, passing_year, highest_Education } = educationData;

    // Validation to ensure all fields are filled
    if (!college_university_name || !passing_year || !highest_Education) {
      toast.error("All fields are required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    // Validate the passing year
    if (parseInt(passing_year) > currentYear) {
      toast.error("Passing year cannot exceed the current year", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/Education/EditEducation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(educationData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Education updated successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });

        // Clear input fields after successful submission
      } else {
        toast.error(responseData.message || "Failed to update education", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-[100px] p-3 mt-5">
        <h1 className="text-lg text-[20px] font-bold mb-4">Education Background</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="highestEducation">
            
            Highest Education
          </label>
          <div className="relative">
            <select
              className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="highestEducation"
              value={educationData.highest_Education}
              onChange={(e) =>
                setEducationData({
                  ...educationData,
                  highest_Education: e.target.value,
                })
              }
            >
              <option value="high-school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="doctorate">Doctorate</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passingYear">
            Passing Year
          </label>
          <input
            className="form-input block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="passingYear"
            type="number"
            value={educationData.passing_year}
            onChange={(e) => {
              const value = e.target.value;
              if (value <= currentYear) {
                setEducationData({
                  ...educationData,
                  passing_year: value,
                });
              } else {
                toast.error("Passing year cannot exceed the current year", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1000,
                });
              }
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
            School / College / University Name
          </label>
          <input
            className="form-input block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="collegeName"
            type="text"
            value={educationData.college_university_name}
            onChange={(e) =>
              setEducationData({
                ...educationData,
                college_university_name: e.target.value,
              })
            }
          />
        </div>
         <div className="profile-edit-buttons flex justify-end" style={{marginRight:"0px"}}>
          <button className="ms-3" type="submit" onClick={handleEducationSubmit}>
            Save
          </button>
        </div>
      </div>
  );
};

export default EducationBack;
