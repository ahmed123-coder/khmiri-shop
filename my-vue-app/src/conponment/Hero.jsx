import React from 'react';
import '../styles/hero.css';
import heroShoe from '../assets/hero_shoe.png';

const Hero = ({ onExplore }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">STEP INTO THE FUTURE</h1>
        <p className="hero-subtitle">Our Latest Performance and Lifestyle Selection</p>
        <button className="hero-button" onClick={onExplore}>Explore Products</button>
      </div>
      <div className="hero-image-container">
        <img 
          src={heroShoe} 
          alt="Athlete Running" 
          className="hero-image" 
        />
      </div>
      <div className="hero-bestsellers">
        <div className="bestsellers-card">
          <h3>BESTSELLERS & COLLECTIONS</h3>
          <p>Horam ipsum dolor dor every somtic, selection, scaluras and dynarnm conrolections.</p>
          <div className="bestsellers-grid">
            <div className="collection-item">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Nike Jordan" />
              <span>Nike Air Zoom collection</span>
            </div>
            <div className="collection-item">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Adidas" />
              <span>Adidas Performance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
