import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Blog from "./pages/blog";

import Webdevelopment from "./services/Webdevelopment";
import Mobileapplication from "./services/Mobileapplication";
import Uiuxdesign from "./services/Ui-uxdesign";
import Cloudsolution from "./services/Cloud-solution";
import Enterprisesoftware from "./services/Enterprise-software";
import Productengineering from "./services/Product-engineering";
import Trainingintership from "./services/training-intership";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Static pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />

        {/* Blog */}
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />

        {/* Service detail pages (matching Home.jsx + Services.jsx link targets) */}
        <Route path="/services/webappservices" element={<Webdevelopment />} />
        <Route path="/services/mobile-application" element={<Mobileapplication />} />
        <Route path="/services/ui-uxdesign" element={<Uiuxdesign />} />
        <Route path="/services/cloudservices" element={<Cloudsolution />} />
        <Route path="/services/enterprise-software" element={<Enterprisesoftware />} />
        <Route path="/services/product-engineering" element={<Productengineering />} />
        <Route path="/services/training-intership" element={<Trainingintership />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}


