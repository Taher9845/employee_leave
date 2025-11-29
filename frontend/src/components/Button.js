import React from 'react';

export default function Button({ children, variant = 'primary', type = 'button', onClick, disabled, className = '' }) {
    const baseClass = 'btn';
    const variantClass = variant === 'danger' ? 'btn-danger' : 'btn-primary';

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
