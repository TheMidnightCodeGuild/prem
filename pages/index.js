import React from "react";
import Navbar from "./Components/Navbar";
import ReactLenis from "lenis/react";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Gallery from "./Components/Galllery";
import Destination from "./Components/Destination";
import Contact from "./Components/Contact";
import Testimonial from "./Components/Testimonial";
import Footer from "./Components/Footer";

const Index = () => {
  return (
    <>
      <ReactLenis root>
        <Navbar />
        <div className="overflow-x-hidden overflow-y-hidden">
          <Hero />

          <div id="about">
            <About />
          </div>

          <div id="gallery">
            <Gallery />
          </div>

          <div id="destinations">
         
           
              <Destination />
          
          </div>

          <div id="testimonials">
            <Testimonial />
          </div>
          <div id="contact">
            <Contact />
          </div>

          <Footer />
        </div>
      </ReactLenis>
    </>
  );
};

export default Index;
