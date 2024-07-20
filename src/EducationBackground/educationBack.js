import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

    const { college_university_name, passing_year, highest_Education } = educationData;

    if (!college_university_name || !passing_year || !highest_Education) {
      toast.error("All fields are required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      return;
    }

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
    <div className="max-w-2xl lg:mx-[100px]  p-3 mt-4">
      {/* <h1 className="text-lg text-[20px] font-bold mb-4">Education Background</h1> */}
      <div className="mb-4 flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 md:mr-8 mb-2 md:mb-0">
          <label
            className="block font-semibold text-black"
            htmlFor="highestEducation"
          >
            Highest Education
          </label>
        </div>
        <div className="relative md:w-2/3">
          <select
            className="w-full  h-10 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="highestEducation"
            value={educationData.highest_Education}
            style={{ color: "#000", fontWeight: "600" }}
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
      <div className="mb-4 flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 md:mr-8 mb-2 md:mb-0">
          <label
            className="block font-semibold text-black"
            htmlFor="passingYear"
          >
            Passing Year
          </label>
        </div>
        <div className="relative md:w-2/3">
          <input
            className="form-input h-10 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      </div>
      <div className="mb-4 flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 md:mr-8 mb-2 md:mb-0">
          <label
            className="block font-semibold text-black"
            htmlFor="collegeName"
          >
            School / College / University Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="form-input h-10 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      </div>
      <div className="profile-edit-buttons flex justify-end mt-4">
        <button
          className="ms-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
          onClick={handleEducationSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EducationBack;
