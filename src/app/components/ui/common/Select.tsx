'use client';

import React from 'react';
import { CountryInfo } from '@/app/hooks/useCountries';

interface SelectProps {
    icon?: React.ReactNode;
    className?: string;
    selectClassName?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    options: CountryInfo[];
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
    icon,
    className = '',
    selectClassName = '',
    required = false,
    value,
    onChange,
    name = '',
    options,
    placeholder = 'Select an option',
}) => {
    return (
        <div
            className={`flex items-center h-14 transform -skew-x-12 border-2 border-black overflow-hidden ${className}`}>
            {icon && (
                <div className="bg-purple w-16 flex items-center justify-center h-full">
                    {icon}
                </div>
            )}
            <select
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full h-full bg-white text-lg text-gray-800 border-none focus:outline-none ${selectClassName}`}>
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.dialCode}>
                        {opt.name}{opt.dialCode}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
