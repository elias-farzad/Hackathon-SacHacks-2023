// src/Components.js

import React from 'react';
import CommentFormPage from './CommentFormPage';

/* Header component for the toolbar at the top of the screen,
    takes in a prop to toggle a menu when the user clicks on the user icon*/
export const Header = ({ toggleMenu }) => (
<header className="toolbar">
    <div className="toolbar__title">
    <h1>Lyric Link</h1>
    </div>
    <section className="toolbar__options">
        <button className="toolbar__sign-up glow-button">Sign Up</button>
        <button className="toolbar__sign-up glow-button">Log In</button>
        <button onClick={toggleMenu} className="toolbar__user-profile menu-toggle"></button>
    </section>
</header>
);

// Herosection component for the main section w/ "all the best music"
export const HeroSection = ({ showContent, onCommentClick }) => (
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

// ClickableLink component that takes an id, className, and children elements
export const CardContainer = () => (
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

// Card component to hold the top artists, songs, albums
export function Card({ title, className, children }) {
    return (
    <div className={`card-container__card ${className}`}>
        <h2>{title}</h2>
        {children}
    </div>
    );
}

// ClickableLink component with id, className, and children elements
function ClickableLink({ id, className, children }) {
return <div id={id} className={`clickable ${className}`}>{children}</div>;
}