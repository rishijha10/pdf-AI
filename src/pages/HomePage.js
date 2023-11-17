import React from "react";
import HeroSection from "../components/home-components/HeroSection";
import Trial from "../components/general-components/Trial";
import ReactPDF from "@react-pdf/renderer";
import ThreeBox from "../components/home-components/ThreeBox";
import Footer from "../components/general-components/Footer";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ThreeBox />
      <Footer />
    </div>
  );
};

export default HomePage;
