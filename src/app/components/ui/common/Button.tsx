import React, { forwardRef } from 'react';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    prefixElement?: React.ReactNode;
    suffixElement?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    bgClass?: string;
    textClass?: string;
    boxShadow?: boolean;
    display?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({
        variant = 'primary',
        suffixElement,
        prefixElement,
        className,
        children,
        type = 'button',
        bgClass,
        textClass,
        boxShadow = true,
        display,
        ...rest
    }, ref) => {



        return (
            <button
                ref={ref}
                type={type}
                {...rest}
                className={`${variant} ${className} ${bgClass ? bgClass : "bg-purple"} ${textClass ? textClass : "text-white"} ${boxShadow ? "boxShadow-custom" : "shadow-none"} active:shadow-none transition-all duration-300 pt-2 px-4 transform -skew-x-6 md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                aria-label="Button"
            >
                {prefixElement}
                <span className='inline-block skew-x-12'>
                    {display == "none" ? null : children}
                </span>
                {suffixElement}
            </button>
        );
    }
);

export default Button