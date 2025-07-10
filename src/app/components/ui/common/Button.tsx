import React, { forwardRef } from 'react';

export interface IButtonProps {
    variant?: 'primary' | 'secondary';
    prefixElement?: React.ReactNode;
    suffixElement?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    children?: any;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    ({
        variant = 'primary',
        suffixElement,
        prefixElement,
        className,
        children,
        type = 'button',
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
                className={`bg-purple text-white boxShadow-custom pt-3 pb-2 px-6 transform -skew-x-12 border-2 border-black shadow-lg font-popfun hover:bg-purple transition-colors duration-300 ${variant} ${className}`}
                aria-label="Login"
            >
                {prefixElement}
                {children}
                {suffixElement}
            </button>
        );
    }
);

export default Button