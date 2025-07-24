'use client';
import React from 'react';

interface Options {
    label: string;
    value: string;
}

interface SelectProps {
    icon?: React.ReactNode;
    className?: string;
    selectClassName?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    options: Options[];
    placeholder?: string;
    iconBgColor?: string;
    isCountrySelect?: boolean;
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
    isCountrySelect = false,
    iconBgColor,
}) => {
    return (
        <div
            className={`flex items-center h-14 transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden ${className}`}>
            {icon && (
                <div className={`${iconBgColor ? iconBgColor : "bg-purple"} w-16 md:w-20 flex items-center justify-center h-full`}>
                    {icon}
                </div>
            )}
            <select
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full pl-2 md:pl-8 h-full bg-white text-base md:text-lg border-none focus:outline-none ${selectClassName}`}>
                {/* <option value="" disabled hidden style={{ color: '#fff' }} className='text-light-gray'>
                    {placeholder}
                </option> */}
                {options.map((opt, index) => (
                    <option key={index} value={opt?.value}>
                        {opt?.label}{isCountrySelect && opt?.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
