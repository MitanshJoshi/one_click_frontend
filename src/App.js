import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Container/HomePage/HomePage";
import Login from "./Container/HomePage/Login";
import Registration from "./Container/HomePage/Registration";
import RegistrationPage from "./Components/Registration/Registration";
import Startup_product from "./Components/Startup-products/Startup-produc";
import InvestorRegistrationPage from "./Components/Registration/InvestorRegistration";
import "./App.css";
import EditInquiry from "./InvestorInquiry/EditInvestorInquiry";
import StartupInquiry from "./InvestorDisplay/StartupInquiry";
import DisplayProfileWithStartupList from "./Components/DisplayProfileWithStartupList/DisplayProfileWithStartupList";
import AddStartUp from "./Components/AddStartUp/Addprduct";
import HomePage2 from "./Container/HomePage/HomePage2";
import ShoesDetails from "./Container/HomePage/ShoesDetails";
import addinvestment from "./Components/Startup_investments/addinvestment";
import SupplierDetail from "./Container/HomePage/SupplierDetail";
import ProductReviews from "./Components/Startup-products/ProductReviews";
import AddGrant from "./Components/Startup_grant/addgrant";
import Myprofile from "./Container/HomePage/Myprofile";
import DisplayProfile from "./Components/DisplayProfile/DisplayProfile";
import AddPartner from "./Components/Startup_team/addPartner";
import StartUps from "./Container/HomePage/StartUps";
import Footer from "./Components/Footer/Footer";
import PartnerEdit from "./Components/Startup_team/partnerEdit";
import Inquiry from "./Container/HomePage/Inquiry";
import Selling_inquiry from "./Container/HomePage/Selling-inquiry";
import Buying_Inquiry from "./Container/HomePage/Buying-Inquiry";
import DisplayInvestor from "./Components/DisplayProfile/DisplayInvestor";
import ChangePassword from "./Container/HomePage/ChangePassword";
import Addprduct from "./Components/Startup-products/Addproduct";
import ChatWithInvestor from "./InvestorInquiryChat.js/ChatWithInvestor";
import MyFullInfo from "./Components/MyProfile/MyFullInfo";
import LoginInvestor from "./Components/Login/LoginInvestor";
import Startup_review from "./Components/startup-review/Startup-review";
import EducationBack from "./EducationBackground/educationBack";
import InvestorForgot from "./Forgot Password/InvestorForgot";
import Edit from "./Components/EditStartUp/Edit";
// import Startup_product from "./Components/Startup-products/Startup-produc";
import Productedit from "./Components/StartUp-ProductEdit/Productedit";
import Awardedit from "./Components/AwardEdit/Awardedit";
import Certificateedit from "./Components/CertificateEdit/Certificateedit";
import Myinquiry from "./Components/My-inquiry/Myinquiry";
import AddPortfolio from "./InvestorPortfolio/AddPortfolio";
import Userinquirychat from "./Components/userinquirychat/Useriquirychat";
import myinquirychat from "./Components/Myinquirychat/Myinquirychat";
import Myinquirychat from "./Components/Myinquirychat/Myinquirychat";
import InvestorChange from "./Components/ChangePassword/Investorchange";
import Forgot from "./Forgot Password/Forgot";
import ContactUs from "./Components/Contact US/ContactUs";
import Inquiryform from "./Components/Inquiry-form/Inquiryform";
import EditGrant from "./Components/Startup_grant/EditGrant";
import AddInvestments from "./Components/Startup_investments/addinvestment";
import ProductEdit from "./Components/StartUp-ProductEdit/Productedit";
import EditInvestment from "./Components/Startup_investments/EditInvestment";
import { AuthContext } from "./context/AuthContext";
import OutgoingFromStartupChat from "./InvestorDisplay/OutgoingFromStartupChat";
// import EditGrant from "./Components/Startup_grant/EditGrant";
// import Startup_product from "./Components/Startup-products/Startup-produc";

const App = () => {
  const { authUser } = useContext(AuthContext);
  const investorToken=localStorage.getItem("investorToken");
  console.log("TEST: ", authUser.tokenType);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logininvestor" element={<LoginInvestor />} />
          <Route path="/investorforgot" element={<InvestorForgot />} />
          {investorToken?<Route path="/changepassword" element={<InvestorChange />} />:<Route path="/changepassword" element={<ChangePassword />} />}
          <Route path="/addportfilio" element={<AddPortfolio />} />
          <Route path="/Contect-Us" element={<ContactUs />} />
          <Route path="/startupinquiry" element={<StartupInquiry />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/investorregistration"
            element={<InvestorRegistrationPage />}
          />
          <Route path="/home" element={<HomePage2 />} />
          <Route path="/my-profile" element={<Myprofile />} />
          <Route path="/editgrant/:grantId" element={<EditGrant />} />
          <Route path="/editinquiry/:inquiryId" element={<EditInquiry />} />
          <Route path="/editinvestment/:_id" element={<EditInvestment />} />
          <Route path="/my-fullinfo" element={<MyFullInfo />} />
          <Route path="/start-up-full-detail/:_id" element={<StartUps />} />
          <Route path="/home-page" element={<HomePage2 />} />
          <Route path="/chatwithinvestor" element={<ChatWithInvestor />} />
          <Route path="/shoes-details/:_id" element={<ShoesDetails />} />
          <Route path="/supplier-detail" element={<SupplierDetail />} />
          <Route path="/inquiry/:_id" element={<Myinquiry />} />
          <Route path="/selling-inquiry" element={<Selling_inquiry />} />
          <Route path="/buying-inquiry" element={<Buying_Inquiry />} />
          <Route path="/display-profile" element={<DisplayProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/startupprod" element={<Startup_product />} />
          <Route path="/addstartup/:id" element={<AddStartUp />} />
          <Route path="/startup-review/:_id" element={<Startup_review />} />
          <Route path="/product-reviews/:_id" element={<ProductReviews />} />
          <Route path="/productEdit" element={<ProductEdit />} />
          <Route path="/partnerEdit" element={<PartnerEdit />} />
          <Route path="/addproduct" element={<Addprduct />} />
          <Route path="/addpartner" element={<AddPartner />} />
          <Route path="/addgrant" element={<AddGrant />} />
          <Route path="/addinvestment" element={<AddInvestments />} />
          <Route path="/productedit" element={<Productedit />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/myinquirychar" element={<Myinquirychat />} />
          <Route path="/cirtificateedit" element={<Certificateedit />} />
          <Route path="/awardedit" element={<Awardedit />} />
          <Route path="/Userinquirychat" element={<Userinquirychat />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/inquiryform" element={<Inquiryform />} />
          <Route path="/outgoingfromstartup" element={<OutgoingFromStartupChat />} />
          {/* <Route path="/productstartub" element={<Startup_product/>} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
