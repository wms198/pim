import React from 'react';

type ButtonVariant = 'primary'| 'outline' ;
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
        variant = 'primary',
        size = 'md',
        icon,
        ...props
    }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-200';
    const variantClasses = {
        primary: 'bg-[#f1356d] text-white hover:bg-gray-300 focus:ring-indigo-500 border border-transparent disabled:bg-[#f1356d]',
        outline: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-gray-300',
    };
    const sizeClasses = {
        sm: 'text-xs px-2.5 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3'
    };
    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
            {...props}
        >
            <span>{icon}</span>
        </button>
    );
};