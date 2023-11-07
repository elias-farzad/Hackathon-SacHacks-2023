import React, { useEffect, useRef } from 'react';
import './SlideOutMenu.css';

// This component handles the rendering and logic of slide out menus, like the user profile menu
const SlideOutMenu = ({ isMenuOpen, toggleMenu }) => {
  const menuRef = useRef(null); // Ref object to attach to menu HTML element

  // Hook that closes the menu when there's a click outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (isMenuOpen) {
          toggleMenu();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]); // Ensuring re-subscription when props change

  return (
    <div ref={menuRef} className={`slide-out-menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu__photo"></div>
    </div>
  );
};

export default SlideOutMenu;
