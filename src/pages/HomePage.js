import React from "react";
import HeroSection from "../components/home-components/HeroSection";
import Trial from "../components/document-ai-components/DocumentAiComponent";
import ReactPDF from "@react-pdf/renderer";
import ThreeBox from "../components/home-components/ThreeBox";
import SecuritySection from "../components/home-components/SecuritySection";
import Footer from "../components/general-components/Footer";
import GetstartedSection from "../components/home-components/GetstartedSection";
import MainNavigation from "../components/general-components/MainNavigation";
const HomePage = () => {
  return (
    <div>
      <MainNavigation />
      <HeroSection />
      <ThreeBox />
      <SecuritySection />
      <GetstartedSection />
      <Footer />
    </div>
  );
};

export default HomePage;
