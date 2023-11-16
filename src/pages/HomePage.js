import React from "react";
import HeroSection from "../components/home-components/HeroSection";
import Trial from "../components/general-components/Trial";
import ReactPDF from "@react-pdf/renderer";
import ThreeBox from "../components/home-components/ThreeBox";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ThreeBox />
    </div>
  );
};

export default HomePage;
