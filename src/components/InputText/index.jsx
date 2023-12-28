import React from 'react';
import './InputText.sass';

const InputText = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            className="input-text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default InputText;
