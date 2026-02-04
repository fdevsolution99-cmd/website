import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Webdevelopment from "./services/Webdevelopment";
import CloudSolutionService from "./services/Cloud-solution";
import Enterprisesoftware from "./services/Enterprise-software";
import Mobileapplication from "./services/Mobileapplication";
import Productengineering from "./services/Product-engineering";
import Trainingintership from "./services/training-intership";
import Uiuxdesign from "./services/Ui-uxdesign";
import Blog from "./pages/blog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/services/webappservices" element={<Webdevelopment />} />
        <Route path="/services/cloudservices" element={<CloudSolutionService />} />
        <Route path="/services/enterprise-software" element={<Enterprisesoftware />} />
        <Route path="/services/mobile-application" element={<Mobileapplication />} />
        <Route path="/services/product-engineering" element={<Productengineering/>} />
        <Route path="/services/training-intership" element={<Trainingintership />} />
        <Route path="/services/ui-uxdesign" element={<Uiuxdesign />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
