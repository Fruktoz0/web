import React from 'react'
import Navbar from "../components/layout/Navbar"
import HeroSection from "../components/sections/HeroSection"
import FeaturesSection from "../components/sections/FeaturesSection"
import TimelineSection from "../components/sections/TimelineSection"
import Footer from "../components/layout/Footer"

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TimelineSection />
      </main>
      <Footer/>
    </>
  )
}

export default Home