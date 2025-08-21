import { useDirection } from '@/app/hooks/useGetDirection';
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
    loading?: boolean;
    disabled?: boolean;
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
        loading = false,
        disabled = false,
        display,
        ...rest
    }, ref) => {

        const direction = useDirection();

        return (
            <button
                ref={ref}
                type={type}
                {...rest}
                disabled={disabled || loading}
                className={`${variant} ${className} ${bgClass ? bgClass : "bg-purple"} ${textClass ? textClass : "text-white"} ${boxShadow ? "boxShadow-custom" : "shadow-none"} ${direction === "ltr" && " pt-2 "} px-4 transform font-primary -skew-x-6 md:-skew-x-12 border-2 border-black shadow-lg `}
                aria-label="Button"
            >
                {prefixElement}
                {loading ?
                    <span className="loading loading-dots loading-xl"></span> :
                    <span className='inline-block text-inherit'>
                        {display == "none" ? null : children}
                    </span>
                }
                {suffixElement}
            </button>
        );
    }
);

// ✅ Add this to fix the ESLint warning
Button.displayName = 'Button';

export default Button
