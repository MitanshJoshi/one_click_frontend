import React, { useState } from 'react';
import HomeList from '../second-home-list/HomeList';
import ShoesList from '../second-homeshoes-list/ShoesList';

const Second_home_content = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      <div className="container">
        <div className='mt-5'>
          <div className="row">
            <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
              {/* <HomeList productId={selectedProductId} /> */}
              <HomeList handlesubcategory={handleProductSelect} />
            </div>
            <div className="col-md-12 col-lg-8">
              <div style={{ marginLeft: '0px', marginBottom: '40px' }}>
                {/* <ShoesList handleDetail={handleProductSelect} /> */}
                <ShoesList handleDetail={selectedProductId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second_home_content;
