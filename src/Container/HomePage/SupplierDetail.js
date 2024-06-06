import React from 'react'
import Supplier_full_detail from '../../Components/Supplierdetail/Supplier-full-detail'
import { useLocation } from 'react-router-dom';

const SupplierDetail = () => {
  const location = useLocation();
  const shoes = location.state && location.state;
  
  return (
    
    <div>
      <Supplier_full_detail  onShoesChange={shoes}/>
    </div>
  )
}

export default SupplierDetail
