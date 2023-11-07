import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, HeroSection, CardContainer } from './Components';
import SlideOutMenu from './SlideOutMenu';
import CommentFormPage from './CommentFormPage';

import './App.css';
import './animations.css';


// This is the main app structure component that holds all the other components in Components.js
function App() {
  // State hooks to keep track of whether content and menu should be displayed
  const [showContent, setShowContent] = useState(true); // Controls the visibility of the main content (ex. "All the best music"")
  const [isMenuOpen, setMenuOpen] = useState(false);    // Controls the visibility of the menu

  // Function called when 'Explore' link is clicked in the middle of the page, to start comments
  const handleCommentClick = () => {
    setShowContent(false);
  };

  // Function called when the user opens and closes menus such as the user profile menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // This useEffect hook will run once when the component is mounted
  useEffect(() => {
    document.title = "Lyric Link"; // Sets the title of the document to "Lyric Link" :)
  }, []); // The empty dependency array means it will only run once on mount  

  return (
    <Router> {/*Wrapping the application in router to enable URL routing*/}
      <div className="app">

        {/* Header component with the top toolbar and menu toggle functionality */}
        <Header toggleMenu={toggleMenu} />

        {/* The hero (main) section adapts based on state (ex. may change to comment page*/}
        {showContent ? (
          <HeroSection showContent={showContent} onCommentClick={handleCommentClick} />
        ) : (
          <CommentFormPage/>
        )}
          
        {/* The card container holds the top artists, songs, albums */}
        <CardContainer />
          
        {/* SlideOutMenu component that holds the user profile menu */}
        <SlideOutMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </Router>
  );
}

export default App;
