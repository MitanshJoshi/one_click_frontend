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

      if (response.ok && responseData.success) {
        toast.success("Education updated successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });

        // Clear input fields after successful submission
        setEducationData({
          college_university_name: "",
          passing_year: "",
          highest_Education: "high-school", // Reset highest education to default
        });
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
    <div>
      <div className="display-profile-education">
        <h4>Education Background</h4>

        <div className="mb-4 mt-4">
          <label className="mb-2" htmlFor="highestEducation">
            Last Education
          </label>
          <select
            className="form-control py-2"
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
          <FontAwesomeIcon
            icon={faChevronDown}
            className="position-absolute right-[885px] bottom-[-622px] translate-middle-y pe-3 iconn"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2" htmlFor="passingYear">
            Passing Year
          </label>
          <input
            className="form-control py-2"
            id="passingYear"
            type="number"
            value={educationData.passing_year}
            onChange={(e) =>
              setEducationData({
                ...educationData,
                passing_year: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="mb-2" htmlFor="collegeName">
            School / College Name
          </label>
          <input
            className="form-control py-2"
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
      <div className="d-flex justify-content-end mb-sm-5 mb-3">
        <div className="profile-edit-buttons">
          <button className="ms-3" type="submit" onClick={handleEducationSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationBack;
