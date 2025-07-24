'use client';
import { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Button from '../components/ui/common/Button';
import { ISignInForm } from './core/_models';
//icons
import PasswordIcon from '../assets/icons/password-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';

interface ValidationErrors {
    [key: string]: string;
}

export default function SignInForm() {
    const { closeModal } = useAuthModalStore();
    const { openModal } = useAuthModalStore();

    const [formErrors, setFormErrors] = useState<ValidationErrors>()
    const [formState, setFormState] = useState<ISignInForm>({
        email: "",
        password: "",
    })

    const handleNewAccount = () => {
        openModal("signup");
    };


    const validateFormData = (formData: ISignInForm): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format.';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required.';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
            errors.password =
                'Password must be at least 8 characters and include uppercase, lowercase, and number.';
        }

        return errors;
    };

    const handleOk = () => {
        console.log('Login button clicked!');
    };

    const handleSignIn = () => {
        let error = validateFormData(formState)
        if (Object.keys(error).length > 0) {
            setFormErrors(error)
            return;
        } else {
            handleOk();
            console.log('Sign Up button clicked!', formState);
        }
    };


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev: any) => ({ ...prev, [name]: "" }))
    };

    return (
        <section>
            {/* Modal Body */}
            <div className="tracking-normal md:px-20 sm:px-10 px-5 pt-4 space-y-6">
                {/* Email Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple w-12 md:w-16 flex items-center justify-center h-full">
                        <EmailIcon className="" />
                    </div>
                    <input
                        value={formState.email}
                        type="email"
                        placeholder="Enter your email"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        onChange={onInputChange}
                    />
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.email}</span>

                {/* Password Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <PasswordIcon />
                    </div>
                    <input
                        value={formState.password}
                        type="password"
                        placeholder="Your password"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        onChange={onInputChange}
                    />
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.password}</span>
                {/* Create new account link */}
                <div className="text-sm md:text-base text-left -ml-2">
                    <button onClick={handleNewAccount} className="hover:underline">Create new account ?</button>
                </div>


                <div className='flex items-center justify-center mt-10'>
                    {/* Login Button */}
                    <Button type="button" onClick={handleSignIn} aria-label="Login" className="w-40 md:w-52 tracking-wider">
                        <span className="inline-block transform skew-x-6 text-4xl uppercase font-popfun">LOGIN</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

