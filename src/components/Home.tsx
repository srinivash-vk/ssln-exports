import React, { memo } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Infrastructure from "./Infrastructure";
import Products from "./Products";
import GlobalMarkets from "./GlobalMarkets";
import Contact from "./Contact";
import { Product } from "../types";

interface HomeProps {
  onSelectProduct: (product: Product) => void;
}

/**
 * Home Component: Main landing page assembling all sections of the application.
 * Utilizes React.memo for performance optimization.
 */
const Home = memo(({ onSelectProduct }: HomeProps) => {
  return (
    <main>
      <Hero />
      <Features />
      <Infrastructure />
      <Products onSelectProduct={onSelectProduct} />
      <GlobalMarkets />
      <Contact />
      
      {/* Map Section */}
      <section className="w-full h-[500px] overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.338874366305!2d77.80385947460793!3d11.357624288828703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9655b551c072f%3A0x861472ecc54962b0!2sSSLN%20EXPORTS!5e1!3m2!1sen!2sin!4v1777017408898!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          className="border-0"
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="SSLN EXPORTS Location"
        ></iframe>
      </section>
    </main>
  );
});

Home.displayName = "Home";

export default Home;
