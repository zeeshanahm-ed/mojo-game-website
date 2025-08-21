'use client';

import { useDirection } from '@/app/hooks/useGetDirection';
import React from 'react';

interface InputProps {
    icon?: React.ReactNode;
    type: string;
    readOnly?: boolean;
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
    readOnly = false,
    onChange,
    name = ''
}) => {
    const direction = useDirection();
    return (
        <div
            dir={direction}
            className={`flex items-center h-14 transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden ${className}`}>
            {icon && <div className="bg-purple w-16 md:w-20 flex items-center justify-center h-full">
                {icon}
            </div>}
            <input
                readOnly={readOnly}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
                className={`input h-full font-secondary input-bordered pl-2 md:ps-8 w-full text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none ${inputClassName}`}
            />
            {/* <button onClick={togglePasswordVisibility} className="bg-purple w-16 md:w-20 flex items-center justify-center h-full">
                {showPassword ? <IoEye /> : <IoEyeOff />}
            </button> */}

        </div>
    );
};

export default Input;
