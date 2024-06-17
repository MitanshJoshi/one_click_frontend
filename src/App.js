import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Container/HomePage/HomePage";
import Login from "./Container/HomePage/Login";
import Registration from "./Container/HomePage/Registration";
import RegistrationPage from "./Components/Registration/Registration";
import DisplayProfileWithStartupList from "./Components/DisplayProfileWithStartupList/DisplayProfileWithStartupList";
import AddStartUp from "./Components/AddStartUp/Addprduct";
import HomePage2 from "./Container/HomePage/HomePage2";
import ShoesDetails from "./Container/HomePage/ShoesDetails";
import SupplierDetail from "./Container/HomePage/SupplierDetail";
import Myprofile from "./Container/HomePage/Myprofile";
import DisplayProfile from "./Components/DisplayProfile/DisplayProfile"
import AddPartner from "./Components/Startup_team/addPartner";
import StartUps from "./Container/HomePage/StartUps";
import Footer from "./Components/Footer/Footer";
import Inquiry from "./Container/HomePage/Inquiry";
import Selling_inquiry from "./Container/HomePage/Selling-inquiry";
import Buying_Inquiry from "./Container/HomePage/Buying-Inquiry";
import ChangePassword from "./Container/HomePage/ChangePassword";
import Addprduct from "./Components/Startup-products/Addproduct";
import MyFullInfo from "./Components/MyProfile/MyFullInfo";
import EducationBack from "./EducationBackground/educationBack";
import Edit from "./Components/EditStartUp/Edit";
import Startup_product from "./Components/Startup-products/Startup-produc";
import Productedit from "./Components/StartUp-ProductEdit/Productedit";
import Awardedit from "./Components/AwardEdit/Awardedit";
import Certificateedit from "./Components/CertificateEdit/Certificateedit";
import Myinquiry from "./Components/My-inquiry/Myinquiry";
import Userinquirychat from "./Components/userinquirychat/Useriquirychat";
import myinquirychat from "./Components/Myinquirychat/Myinquirychat"
import Myinquirychat from "./Components/Myinquirychat/Myinquirychat";
import Forgot from "./Forgot Password/Forgot";
import ContactUs from "./Components/Contact US/ContactUs";
import Inquiryform from "./Components/Inquiry-form/Inquiryform";
// import Startup_product from "./Components/Startup-products/Startup-produc";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Contect-Us" element={<ContactUs />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home2" element={<HomePage2 />} />
          <Route path="/my-profile" element={<Myprofile />} />
          <Route path="/my-fullinfo" element={<MyFullInfo />} />
          <Route path="/start-up-full-detail/:_id" element={<StartUps />} />
          <Route path="/home-page-2" element={<HomePage2 />} />
          <Route path="/shoes-details/:_id" element={<ShoesDetails />} />
          <Route path="/supplier-detail" element={<SupplierDetail />} />
          <Route path="/inquiry/:_id" element={<Myinquiry/>} />
          <Route path="/selling-inquiry" element={<Selling_inquiry />} />
          <Route path="/buying-inquiry" element={<Buying_Inquiry />} />
          <Route path="/display-profile" element={<DisplayProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/addstartup/:id" element={<AddStartUp />} />
          <Route path="/addproduct" element={<Addprduct/>} />
          <Route path="/addpartner" element={<AddPartner/>} />
          <Route path="/productedit" element={<Productedit/>} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/myinquirychar" element={<Myinquirychat/>}/>
          <Route path="/cirtificateedit" element={<Certificateedit/>} />
          <Route path="/awardedit" element={<Awardedit/>} />
          <Route path="/Userinquirychat" element={<Userinquirychat/>} />
          <Route path="/forgot-password" element={<Forgot/>} />
          <Route path="/inquiryform" element={<Inquiryform/>} />
          {/* <Route path="/productstartub" element={<Startup_product/>} /> */}
          
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
