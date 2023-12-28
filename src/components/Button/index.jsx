import React from 'react';
import { FaSearch, FaChevronLeft } from 'react-icons/fa';
import "./Button.sass";

const Button = ({ text, primary, secondary, onClick, active }) => {
    const buttonClass = primary ? "button primary" : secondary ? "button secondary" : "button";
    const activeClass = active ? 'active' : '';

    const Icon = primary ? <FaSearch className="icon" /> : secondary ? <FaChevronLeft className="icon" /> : null;

    return (
        <button className={`${buttonClass} ${activeClass}`} onClick={onClick}>
            {Icon}
            {text}
        </button>
    );
}

export default Button;
