import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder, required, name }) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                name={name}
            />
        </div>
    );
}
