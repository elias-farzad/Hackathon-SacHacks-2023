import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { useMenuLogic } from './user-menu';
import { submitComment } from './front-back-end-link';
import CommentFormPage from './CommentFormPage';
import './App.css';
import './animations.css';
import './user-menu.css';

// Header component
const Header = ({ toggleMenu }) => (
  <header className="toolbar">
    <div className="toolbar__title">
      <h1>Lyrical Link</h1>
    </div>
    <section className="toolbar__options">
      <button className="toolbar__sign-up glow-button">Sign Up</button>
      <button className="toolbar__sign-up glow-button">Log In</button>
      <button onClick={toggleMenu} className="toolbar__user-profile menu-toggle"></button>
    </section>
  </header>
);

// HeroSection component (note: hero section means main)
const HeroSection = ({ showContent, onCommentClick }) => (
  <section className="hero-section">
    {showContent ? (
      <div className="hero-section__content">
        <h1 className="hero-section__caption fade-in-slide-in">All the best music.</h1>
        <button onClick={onCommentClick} className="hero-section__button fade-in-slide-in glow-button">
          Comment
        </button>
      </div>
    ) : (
      <CommentFormPage />
    )}
  </section>
);

// CardContainer component
const CardContainer = () => (
  <div className="card-container">
    <Card title="Top Artists" className="fade-in fade-speed1">
      <ClickableLink id="link1" className="link song">Taylor Swift</ClickableLink>
    </Card>
    <Card title="Top Songs" className="fade-in fade-speed2">
      <ClickableLink id="link2" className="link">Cruel Summer</ClickableLink>
    </Card>
    <Card title="Top Albums" className="fade-in fade-speed3">
      <p>This is some content for Card 3.</p>
      <ClickableLink id="link3" className="link">Link Example</ClickableLink>
    </Card>
  </div>
);

// Card component
function Card({ title, className, children }) {
    return (
      <div className={`card-container__card ${className}`}>
        <h2>{title}</h2>
        {children}
    </div>
    );
}

// SlideOutMenu component
const SlideOutMenu = ({ isMenuOpen }) => (
  <div className={`slide-out-menu ${isMenuOpen ? 'open' : ''}`}>
    <div className="menu-item__photo"></div>
    <div className="menu-item">Contact Details</div>
  </div>
);

// ClickableLink component
function ClickableLink({ id, className, children }) {
  return <div id={id} className={`clickable ${className}`}>{children}</div>;
}

function App() {
  const [showContent, setShowContent] = useState(true);

  const { isMenuOpen, toggleMenu, closeMenu, handleMenuClick } = useMenuLogic();

  // Function called when 'Explore' link is clicked
  const handleCommentClick = () => {
    setShowContent(false);
  };

  // Main app components
  return (
    <Router>
      <div className="app">
        <Header toggleMenu={toggleMenu} />
        {showContent ? (
          <HeroSection showContent={showContent} onCommentClick={handleCommentClick} />
        ) : (
          <CommentFormPage/>

        )}
        <CardContainer />
        <SlideOutMenu isMenuOpen={isMenuOpen} />
      </div>
    </Router>
  );
}

export default App;
