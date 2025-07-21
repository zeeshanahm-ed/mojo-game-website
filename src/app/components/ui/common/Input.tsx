'use client';

import React from 'react';

interface InputProps {
    icon?: React.ReactNode;
    type: string;
    placeholder: string;
    className?: string;
    inputClassName?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const Input: React.FC<InputProps> = ({
    icon,
    type = 'text',
    placeholder,
    className = '',
    inputClassName = '',
    required = false,
    value,
    onChange,
    name = ''
}) => {
    return (
        <div
            className={`flex items-center h-14 transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden ${className}`}>
            {icon && <div className="bg-purple w-16 md:w-20 flex items-center justify-center h-full">
                {icon}
            </div>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                className={`input h-full input-bordered pl-2 md:pl-8 w-full text-lg bg-white text-gray-800 border-none focus:outline-none ${inputClassName}`}
            />
        </div>
    );
};

export default Input;
