import React from 'react';
import './NewsAll.css';

const cardData = [
  {
    id: 1,
    imageSrc: './Modiji.png',
    altText: 'Card 1 image cap',
    title: 'India Today',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Read More',
    readMore: 'Read More',

  },
  {
    id: 2,
    imageSrc: './Modiji.png',
    altText: 'Card 2 image cap',
    title: 'India Today',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Read More',
    readMore: 'Read More',

  },
  {
    id: 3,
    imageSrc: './Modiji.png',
    altText: 'Card 3 image cap',
    title: 'India Today',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Read More',
    readMore: 'Read More',

  },
  {
    id: 4,
    imageSrc: './Modiji.png',
    altText: 'Card 4 image cap',
    title: 'India Today',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Read More',
    readMore: 'Read More',
  },
];

const NewsAll = () => {


  return (
    <div className='Newsallstyle' style={{ paddingTop: '20px' }}>
      <div className="container">
        <div className="row">




          <div className='d-flex justify-content-between align-items-center  scrollImage' >
            <div>
              <h1 style={{ position: "relative", zIndex: "1" }}>News</h1>
              <svg style={{ marginLeft: "-10px", marginTop: "-85px" }} xmlns="http://www.w3.org/2000/svg" width="142" height="18" viewBox="0 0 142 18" fill="none">
                <path d="M132.091 0.615805L0 17.4036H133.154C140.097 17.4036 144.061 9.47852 139.898 3.92235C138.08 1.49621 135.099 0.233568 132.091 0.615805Z" fill="#74CC7E" />
              </svg>
            </div>
            <div>
              <ul className='d-flex list-unstyled '>
                <div className='firstLi'>
                  <li className='mx-5' >All</li>
                </div>
                <li className='mx-5'>Trending</li>
                <li className='mx-5'>Entertainment</li>
                <li className='mx-5'>Health</li>
                <li className='mx-5'>Nature</li>

                <li className='mx-5'>IT</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M11.2915 14.641L15.3975 10.5351L11.2915 6.4292" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M5.5435 14.641L9.64941 10.5351L5.5435 6.4292" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </li>
              </ul>
            </div>

          </div>
          {cardData.map((card) => (
            <div key={card.id} className="col-md-3 mb-4 mt-5" >
              <div className="card cardDiv">
                <img
                  className="card-img-top"
                  src={card.imageSrc}
                  alt={card.altText}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text} <span className='readmore'>{card.readMore} </span></p>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsAll;
