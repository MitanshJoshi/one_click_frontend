import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ReviewSlider from '../../Components/Review/ReviewSlider'
import Justjoin from '../../Components/Justjoin/Justjoin'
import NewsAll from '../../Components/NewsAll/NewsAll'
import Question from '../../Components/Question/Question'
import HeroSection from '../../Components/HeroSection/HeroSection'
import LoginPage from '../../Components/Login/LoginPage'
import "./home.css"
import AddStartUp from '../../Components/AddStartUp/Addprduct'
import DisplayProfileWithStartupList from '../../Components/DisplayProfileWithStartupList/DisplayProfileWithStartupList'
import DisplayProfile from '../../Components/DisplayProfile/DisplayProfile'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Question />
      <NewsAll />
      <Justjoin />
      <ReviewSlider />
    </div>
  )
}

export default HomePage
