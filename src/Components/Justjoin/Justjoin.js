import React from 'react'
import './Justjoin.css'

const Justjoin = () => {
  return (
    <div className='justjoinstyle' style={{ paddingTop: '75px' }}>
      <div className="container ">
        <div className='d-flex justify-content-between align-items-center '>
          <div>
            <h1>Just Join</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="142" height="18" viewBox="0 0 142 18" fill="none">
              <path d="M132.091 0.861899L0 17.6497H133.154C140.097 17.6497 144.061 9.72462 139.898 4.16844C138.08 1.74231 135.099 0.479662 132.091 0.861899Z" fill="#74CC7E" />
            </svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
              <g filter="url(#filter0_d_1_572)">
                <path d="M9.52388 14.6412L5.41797 10.5352L9.52388 6.42932" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.2719 14.6412L11.166 10.5352L15.2719 6.42932" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <filter id="filter0_d_1_572" x="-0.00575328" y="0.184432" width="44.3438" height="44.3439" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dx="0.821183" dy="0.821183" />
                  <feGaussianBlur stdDeviation="0.821183" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.454902 0 0 0 0 0.8 0 0 0 0 0.494118 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_572" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_572" result="shape" />
                </filter>
              </defs>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
              <g filter="url(#filter0_d_1_572)">
                <path d="M11.2915 14.6412L15.3975 10.5352L11.2915 6.42932" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.5435 14.6412L9.64941 10.5352L5.5435 6.42932" stroke="black" stroke-width="1.64237" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <filter id="filter0_d_1_572" x="-0.00575328" y="0.184432" width="44.3438" height="44.3439" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dx="0.821183" dy="0.821183" />
                  <feGaussianBlur stdDeviation="0.821183" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.454902 0 0 0 0 0.8 0 0 0 0 0.494118 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_572" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_572" result="shape" />
                </filter>
              </defs>
            </svg>

          </div>
        </div>



        <div className="images-grid-container" style={{ paddingTop: '65px' }}>
          <img src='./Join.png' className='justjoin-img' alt="join" />
          <img src='./Join.png' className='justjoin-img' alt="join" />
          <img src='./Join.png' className='justjoin-img' alt="join" />
          <img src='./Join.png' className='justjoin-img' alt="join" />
          <img src='./Join.png' className='justjoin-img' alt="join" />
          <img src='./Join.png' className='justjoin-img' alt="join" />
        </div>
      </div>


    </div>
  )
}

export default Justjoin
