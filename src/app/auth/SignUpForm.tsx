'use client';
import React, { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Button from '../components/ui/common/Button';
import { ISignUpForm } from './core/_models';
//icons
import PasswordIcon from '../assets/icons/password-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';
import EditIcon from '../assets/icons/edit-icon.svg';
import ContactIcon from '../assets/icons/contact-icon.svg';
import UserIcon from '../assets/icons/user-icon.svg';
import FallBackProfileImage from '../assets/images/fallback-profile-image.jpg';
import { setAuth, setUser } from '../helpers/auth-helper';

interface ValidationErrors {
    [key: string]: string;
}

export default function SignUpForm() {
    const { openModal } = useAuthModalStore();
    const [formErrors, setFormErrors] = useState<ValidationErrors>()
    const [formState, setFormState] = useState<ISignUpForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "",
        contactNumber: "",
        profilePicture: "",
    })

    const handleSignUp = () => {
        let error = validateFormData(formState)
        if (Object.keys(error).length > 0) {
            setFormErrors(error)
            return;
        } else {
            handleOk(formState);
            openModal("signin");
            console.log('Sign Up button clicked!', formState);
        }
    };

    const handleOk = (formData: ISignUpForm) => {
        // const obj = {
        //     data: formData,
        //     api_token: ""
        // }
        // // setUser(obj);
    };

    const validateFormData = (formData: ISignUpForm): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name and Last name is required.';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'First name and Last name is required.';
        }
        if (!formData.contactNumber.trim()) {
            errors.contactNumber = 'Contact number is required.';
        }

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


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev: any) => ({ ...prev, [name]: "" }))
    };

    const handleGoToLogin = () => {
        openModal("signin");
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState((prev) => ({ ...prev, profilePicture: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Reference to the hidden file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Function to trigger the hidden file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <section>
            <div onSubmit={handleSignUp} className="sm:px-6 space-y-6">
                {/* Upload Picture Section */}
                <div className="flex items-center justify-center mb-6 gap-5">
                    <span className="text-gray-700 text-base md:text-lg mb-2">Upload Picture</span>
                    <div className="relative w-24 h-24 border-2 border-gray-300 flex items-center justify-center">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            name="profilePicture"
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <img
                            src={formState.profilePicture || (typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute -top-2 -right-2 bg-black rounded-full p-1 border-2 border-white cursor-pointer"
                            onClick={triggerFileInput}
                        >
                            <EditIcon className=" w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* First Name & Last Name Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <UserIcon />
                    </div>
                    <input
                        type="text"
                        name='firstName'
                        placeholder="First Name"
                        className="input h-full rounded-none input-bordered w-1/2 pl-2 md:pl-8 pr-2 py-3 text-base  md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <div className='h-[90%] w-[2px] bg-light-gray'></div>
                    <input
                        type="text"
                        name='lastName'
                        placeholder="Last Name"
                        className="input h-full rounded-none input-bordered w-1/2 pl-2 md:pl-8 pr-2 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                </div>
                <span className='text-red'>{formErrors?.firstName || formErrors?.lastName}</span>

                {/* Email Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <EmailIcon />
                    </div>
                    <input
                        type="email"
                        name='email'
                        placeholder="Enter your email address"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                </div>
                <span className='text-red'>{formErrors?.email}</span>

                {/* Password Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <PasswordIcon />
                    </div>
                    <input
                        name='password'
                        type="password"
                        placeholder="Your password"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                </div>
                <span className='text-red'>{formErrors?.password}</span>

                {/* Contact Number Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <ContactIcon />
                    </div>
                    <input
                        name='contactNumber'
                        type="number"
                        autoComplete="off"
                        placeholder="Your Contact Number"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                    />
                </div>
                <span className='text-red'>{formErrors?.contactNumber}</span>

                {/* SignUp Button */}
                <div className='flex items-center justify-center mt-10'>
                    <Button type="submit" aria-label="Login" boxShadow={true} className="w-40 md:w-52" onClick={() => handleSignUp()}>
                        <span className="inline-block  transform skew-x-6 text-4xl uppercase font-popfun">SIGNUP</span>
                    </Button>
                </div>

                {/* "or Login" link */}
                <div className="text-center text-gray-700 text-base mt-4">
                    <button type='button' onClick={handleGoToLogin} className="hover:underline">or Login</button>
                </div>
            </div>
        </section>
    );
}