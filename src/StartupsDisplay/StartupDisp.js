import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../BASE_URL';

const StartupCards = () => {
  const [startups, setStartups] = useState([]);
  const investorToken = localStorage.getItem("investorToken"); // Replace with your actual token

  const navigate=useNavigate();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/startup/getAllStartup`, {
          headers: {
            Authorization: localStorage.getItem("investorToken"),
          },
        });
        // const responseData=await response.json()
        console.log('respp',response);
        
        setStartups(response.data.startups);
      } catch (error) {
        console.error('Error fetching startups', error);
      }
    };

    fetchStartups();
  }, []);

  const handleNavigate = (id) => {
    // Implement your navigation logic here
    navigate(`/start-up-full-detail/${id}`);
  };
  const handleInquiry = (startupId) => {
    console.log('startupId',startupId);
    localStorage.setItem("myData","Startup");
    
    navigate("/inquiryform", { state: { startUpId: startupId } });
  };
  

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit:', id);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log('Delete:', id);
  };

  return (
    <div>
      <div className="row mt-5 lg:mx-[100px]">
        {startups &&
          startups.map((e) => (
            <div className="col-12 col-md-6 mb-4" key={e._id}>
              <div className="shadow-startup shadow">
                <div className="d-flex justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={e.startupLogo}
                      alt=""
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <p className="mb-0 fw-bold">{e.startupName}</p>
                      <p
                        className="mb-0"
                        style={{
                          color: '#000000',
                          opacity: '0.5',
                        }}
                      >
                        {e.categoryName},{e.subcategoryName}
                      </p>
                    </div>
                  </div>
                  <div className='min-w-[105px]'>
                    <span>3 </span>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />
                  </div>
                </div>
                <hr />
                <div className="d-flex mt-3">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: '#74CC7E' }} />
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.city},
                    </span>
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.state},
                    </span>
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.country}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div className="w-[400px]">
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: '#74CC7E' }} />
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.address}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-end"
                      style={{ fontWeight: '600' }}
                    >
                      {e.inqubationcenterName} <br /> {e.inqubationCenterCity}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-white mt-sm-5 mt-0 flex justify-center items-center">
                    <button className='backk py-2 px-3 rounded-lg' onClick={() => handleNavigate(e._id)}>VIEW</button>
                  </div>
                 {!investorToken? <div>
                    <button className="edit-icon me-3">
                      <img
                        src="./edit.png"
                        alt=""
                        onClick={() => handleEdit(e._id)}
                      />
                    </button>
                    <button className="delete-icon">
                      <img
                        src="./delete.svg"
                        alt=""
                        onClick={() => handleDelete(e._id)}
                      />
                    </button>
                  </div>: <div className="text-white mt-sm-5 mt-0 flex justify-center items-center">
                    <button className='backk py-2 px-3 rounded-lg' onClick={() => handleInquiry(e._id)}>Inquiry Now</button>
                  </div>}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartupCards;
