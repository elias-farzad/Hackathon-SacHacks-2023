
import { useState } from 'react';

export const useMenuLogic = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const handleMenuClick = (e) => {
    e.stopPropagation(); // this stops the click from propagating to the overlay
  };

  return { isMenuOpen, toggleMenu, closeMenu, handleMenuClick };
}
