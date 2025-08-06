'use client';
import React from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io";

interface Options {
    label: string;
    value: string;
    icon?: string;
}

interface SelectProps {
    icon?: React.ReactNode;
    className?: string;
    selectClassName?: string;
    iconClassName?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    options: Options[];
    placeholder?: string;
    iconBgColor?: string;
    direction?: string;
    isCountrySelect?: boolean;
}

const Select: React.FC<SelectProps> = ({
    icon,
    className = '',
    direction = "ltr",
    selectClassName = '',
    iconClassName = '',
    required = false,
    value,
    onChange,
    name = '',
    options,
    isCountrySelect = false,
    iconBgColor,
    placeholder = 'Select an option...',
}) => {
    return (
        <div
            dir={direction}
            className={` flex items-center font-primary h-14 transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden ${className}`}
        >
            {/* Icon Section - Preserved from original */}
            {icon && (
                <div className={`${iconBgColor ? iconBgColor : "bg-purple"} ${iconClassName} w-16 md:w-20 flex items-center justify-center h-full`}>
                    {icon}
                </div>
            )}

            {/* Select Input Container */}
            <div className="relative w-full h-full">
                {/* Custom Dropdown Arrow */}
                <div className="absolute end-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10 skew-x-6 md:skew-x-12">
                    <IoIosArrowDropdownCircle className="w-5 h-5 text-gray-600" />
                </div>

                <select
                    name={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-2 font-secondary md:ps-8 pe-10 py-2 h-full bg-white text-base md:text-lg border-none focus:outline-none appearance-none cursor-pointer ${selectClassName}`}
                >
                    {/* Placeholder option */}
                    <option value="" disabled hidden className="text-gray-500">
                        {placeholder}
                    </option>

                    {/* Options */}
                    {options.map((opt, index) => (
                        <option key={index} value={opt?.value} className="py-2">
                            {opt?.label}{isCountrySelect && ` ${opt?.value}`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};



export default Select;
