import React from 'react'

interface DividerProps {
    className?: string;
}

function Divider({ className = '' }: DividerProps) {
    return (
        <div className={`divider before:bg-light-gray after:bg-light-gray m-0 ${className}`}></div>

    )
}

export default Divider