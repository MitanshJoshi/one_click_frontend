import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot,faPhoneAlt,faPhoneFlip,faPhone, faShare } from '@fortawesome/free-solid-svg-icons';
         
const InvestorCards = () => {
  const [investors, setInvestors] = useState([]);
  const investorToken = localStorage.getItem("investorToken");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Investor/getAllInvestor`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log('response', response);
        setInvestors(response.data.investors);
      } catch (error) {
        console.error('Error fetching investors', error);
      }
    };

    fetchInvestors();
  }, []);

  const handleNavigate = (id) => {
    navigate("/startupinquiry",{state:{investorId:id}});
  };

  return (
    <div>
      <div className="row mt-5 mx-[100px]">
        {investors &&
          investors.map((e) => (
            <div className="col-12 col-md-6 mb-4" key={e._id}>
              <div className="shadow-investor shadow">
                <div className="d-flex justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={e.InvestorPhoto}
                      alt=""
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <p className="mb-0 fw-bold">{e.InvestorName}</p>
                      <p
                        className="mb-0"
                        style={{
                          color: '#000000',
                          opacity: '0.5',
                        }}
                      >
                        {e.FirmName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                    <span>5 </span>
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                    </div>
                    <div>
                    <div>
                    <p
                      className="text-end"
                      style={{ fontWeight: '600' }}
                    >
                      {e.status} 
                    </p>
                  </div>
                    </div>
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
                      {e.InvestorCity},
                    </span>
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.InvestorState},
                    </span>
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.InvestorCountry}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div className="w-[400px]">
                    <FontAwesomeIcon icon={faPhone} style={{ color: '#74CC7E' }} />
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.InvestorContactNum}
                    </span>
                  </div>
                  
                </div>
                <div className="w-[400px] mt-3">
                <FontAwesomeIcon icon={faShare} style={{ color: '#74CC7E' }} />
                    <span
                      className="font-[500] text-[15px]"
                      style={{ marginLeft: '10px' }}
                    >
                      {e.InvestorEmail}
                    </span>
                  </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="add-start-up-button  mt-sm-5 mt-0 flex justify-center items-center">
                    <button onClick={() => handleNavigate(e._id)}>Inquiry Now</button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InvestorCards;
