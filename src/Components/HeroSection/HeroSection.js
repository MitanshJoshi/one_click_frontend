import React from 'react';
import SidebarFreeAdd from '../SidebarFreeAdd/SidebarFreeAdd';
import HeroPage from '../HeroPage/HeroPage';

const HeroSection = () => {
  return (
    <div className="container">
      <div className='mt-lg-5 mt-md-4 md-sm-1'>
        <div className="row">
          <div className="col-md-12 col-lg-4 display-none-768">
            <SidebarFreeAdd />
          </div>
          <div className="col-md-12 col-lg-8">
            <div style={{ marginLeft: '0px', marginBottom: '40px' }}>
              <HeroPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
