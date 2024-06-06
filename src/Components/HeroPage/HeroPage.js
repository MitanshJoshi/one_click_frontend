import React, { useEffect, useState } from 'react';
import './HeroPage.css';
import SpaBeauty from '../SpaBeauty/SpaBeauty';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../BASE_URL';


const imageData = [
    { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },
    { imageSrc: './Hero2.png', heading: 'Travel', paragraph: '100 Experts', bgColor: 'rgba(114, 115, 204, 0.15)' },
    { imageSrc: './Hero3.png', heading: 'Doctors', paragraph: '102 Doctors', bgColor: 'rgba(22, 140, 90, 0.15)' },
    { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },
    { imageSrc: './Hero2.png', heading: 'Travel', paragraph: '100 Experts', bgColor: 'rgba(114, 115, 204, 0.15)' },
    { imageSrc: './Hero3.png', heading: 'Doctors', paragraph: '102 Doctors', bgColor: 'rgba(22, 140, 90, 0.15)' },
    { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },
    { imageSrc: './Hero2.png', heading: 'Travel', paragraph: '100 Experts', bgColor: 'rgba(114, 115, 204, 0.15)' },
    { imageSrc: './Hero3.png', heading: 'Doctors', paragraph: '102 Doctors', bgColor: 'rgba(22, 140, 90, 0.15)' },
    { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },
    { imageSrc: './Hero2.png', heading: 'Travel', paragraph: '100 Experts', bgColor: 'rgba(114, 115, 204, 0.15)' },
    { imageSrc: './Hero3.png', heading: 'Doctors', paragraph: '102 Doctors', bgColor: 'rgba(22, 140, 90, 0.15)' },
    { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },
    { imageSrc: './Hero2.png', heading: 'Travel', paragraph: '100 Experts', bgColor: 'rgba(114, 115, 204, 0.15)' },
    // { imageSrc: './Hero3.png', heading: 'Doctors', paragraph: '102 Doctors', bgColor: 'rgba(22, 140, 90, 0.15)' },
    // { imageSrc: './Hero1.png', heading: 'Restaurent', paragraph: '168 Restaurent', bgColor: 'rgba(240, 119, 15, 0.15)' },

];

const HeroPage = () => {

const navigate = useNavigate();

const handleNavigate = () => [
    navigate("/my-profile")
]

const [Name,setname]=useState()
const [img,setimg]=useState()
useEffect(() => {
    // setCountryData(Countries);
    const fetchData = async () => {
      try {
        const response = await fetch( `${BASE_URL}/api/user/display`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const Data = await response.json();

        setname(Data.data[0].name || "");
        setimg(Data.data[0].profileImageURL || "");
        // console.log(Data.data)
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      }
    };

    fetchData();
  }, []);
    return (
        <div className='container'>
            <div className='row'>

                <div className='d-md-flex justify-content-between align-items-center mb-4'>
                    <div className='mb-4 mb-md-0'>
                        <img src='./Advertice.png' alt='Advertice' className='img-fluid' />
                    </div>
                    <div className='profile-box' style={{cursor: "pointer"}} onClick={handleNavigate}>
                        <div className='box'>
                            <section className='sectionMaria text-center text-md-left'>
                                <div className='d-flex '>
                                    <img src={img} style={{ width: '70px', height: '70px', borderRadius:"50%" }} alt='User' className='img-fluid mt-1 me-2' />
                                    <div className='me-3'>
                                        <p className='maria mb-0'>{Name}</p>
                                        <p className='deals mb-0'>98 Deals</p>
                                    </div>
                                    <svg className='mt-1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <button className='btn styleBtn mt-3'><p className='mx-4 mb-0'>Settings</p></button>
                            </section>
                        </div>
                    </div>
                </div>


                <section className='imageGalary mb-4'>

                    <div className='d-flex flex-wrap' >
                        {imageData.map((data, index) => (

                            <div key={index} >
                                <div className='p-2'>
                                    <div style={{ backgroundColor: data.bgColor , padding: "10px" }}  >
                                        <img src={data.imageSrc} alt={`Hero${index + 1}`} style={{height: "50px"}}/>
                                    </div>
                                    <h4 className='mt-1 mb-0'>{data.heading}</h4>
                                    <p className='mb-0'>{data.paragraph}</p>
                                </div>
                            </div>

                        ))}
                    </div>

                </section>

                <SpaBeauty />
            </div>
        </div>
    );
};

export default HeroPage;
