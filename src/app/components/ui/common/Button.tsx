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

        //         const classNames = {
        //   primary: 'text-white bg-purple ',
        //   secondary: 'text-white bg-secondary py-4 px-10 font-medium tracking-wider transition ',
        //   text: '',
        //   default: 'font-secondary px-10 py-4 text-secondary border font-medium border-secondary bg-white',
        //   rounded: 'rounded-full w-18 h-18 bg-gray-150 flex-centered',
        // };


        return (
            <button
                ref={ref}
                type={type}
                {...rest}
                className={`${variant} ${className} ${bgClass ? bgClass : "bg-purple"} ${textClass ? textClass : "text-white"} ${boxShadow ? "boxShadow-custom" : "shadow-none"} active:shadow-none transition-all duration-300 pt-2 px-4 transform -skew-x-6 md:-skew-x-12 border-2 border-black shadow-lg font-popfun`}
                aria-label="Button"
            >
                {prefixElement}
                {display == "none" ? null : children}
                {suffixElement}
            </button>
        );
    }
);

export default Button