'use client';
import React, { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Button from '@/app/components/ui/common/Button';
import Image from 'next/image';
import { ISignUpForm } from './core/_models';
import { useDirection } from '../hooks/useGetDirection';
import { useTranslation } from 'react-i18next';
//icons
import PasswordIcon from '@/app/assets/icons/password-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import EditIcon from '@/app/assets/icons/edit-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';
import AgeIcon from '@/app/assets/icons/age-icon.svg';
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';
import { IoEye, IoEyeOff } from "react-icons/io5";

interface ValidationErrors {
    [key: string]: string;
}

export default function SignUpForm() {
    const { openModal } = useAuthModalStore();
    const direction = useDirection();
    const { t } = useTranslation();
    const [formErrors, setFormErrors] = useState<ValidationErrors>()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const [formState, setFormState] = useState<ISignUpForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "",
        age: "",
        gender: "",
        contactNumber: "",
        profilePicture: "",
    })

    const handleSignUp = () => {
        const error = validateFormData(formState)
        if (Object.keys(error).length > 0) {
            setFormErrors(error)
            return;
        } else {
            handleOk();
            openModal("signin");
            console.log('Sign Up button clicked!', formState);
        }
    };

    const handleOk = () => {
        // const obj = {
        //     data: formData,
        //     api_token: ""
        // }
        // // setUser(obj);
    };

    const validateFormData = (formData: ISignUpForm): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = t('errors.nameRequired');
        }
        if (!formData.lastName.trim()) {
            errors.lastName = t('errors.nameRequired');
        }
        if (!formData.contactNumber.trim()) {
            errors.contactNumber = t('errors.contactRequired');
        }

        if (!formData.email.trim()) {
            errors.email = t('errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = t('errors.emailInvalid');
        }

        if (!formData.password.trim()) {
            errors.password = t('errors.passwordRequired');
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
            errors.password = t('errors.passwordInvalid');
        }

        return errors;
    };


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }))
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
            <div className="tracking-normal font-secondary md:px-20 sm:px-10 px-5 py-10 space-y-6" dir={direction}>
                {/* Upload Picture Section */}
                <div className="flex items-center justify-center mb-6 gap-5">
                    <span className="text-gray-400 text-base md:text-lg mb-2">{t("uploadPicture")}</span>
                    <div className="relative w-28 h-28 border-2 border-gray-300 flex items-center justify-center">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            name="profilePicture"
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <Image
                            src={formState.profilePicture || (typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                            alt="User Profile"
                            className="w-full h-full object-cover"
                            width={96}
                            height={96}
                        />
                        <div
                            className="absolute -top-2 -right-2 bg-black rounded-full p-1 border-2 border-white cursor-pointer"
                            onClick={triggerFileInput}
                        >
                            <EditIcon className="w-4 h-4 fill-white text-white" />
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
                        placeholder={t("firstName")}
                        className="input h-full rounded-none input-bordered w-1/2 ps-2 md:ps-8 pe-2 py-3 text-base  md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <div className='h-[90%] w-[2px] bg-light-gray'></div>
                    <input
                        type="text"
                        name='lastName'
                        placeholder={t("lastName")}
                        className="input h-full rounded-none input-bordered w-1/2 ps-2 md:ps-8 pe-2 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.firstName || formErrors?.lastName}</span>

                {/* First Name & Last Name Input */}
                <div className='flex items-center gap-x-4 sm:gap-x-10 gap-y-5'>
                    <div className="flex items-center w-1/2 h-12 md:h-14 transform -skew-x-12 border-2 border-black overflow-hidden">
                        <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                            <AgeIcon />
                        </div>
                        <input
                            type="number"
                            name='age'
                            placeholder={t("age")}
                            className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-2 py-3 text-base  md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                            required
                            onChange={onInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8 h-12 md:h-14">
                        {/* Male Option */}
                        <label className="flex items-center gap-1 sm:gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="radio !bg-white radio-sm sm:radio-lg border-2 border-black"
                                onChange={onInputChange}
                                checked={formState.gender === 'male'}
                            />
                            <span className="text-base sm:text-2xl font-normal text-black">{t("male")}</span>
                        </label>

                        {/* Female Option */}
                        <label className="flex items-center gap-1 sm:gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="radio !bg-white radio-sm sm:radio-lg border-2 border-black"
                                onChange={onInputChange}
                                checked={formState.gender === 'female'}
                            />
                            <span className="text-base sm:text-2xl font-normal text-black">{t("female")}</span>
                        </label>
                    </div>
                </div>
                {/* <span className='text-red text-sm md:text-base'>{formErrors?.firstName || formErrors?.lastName}</span> */}

                {/* Email Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <EmailIcon />
                    </div>
                    <input
                        type="email"
                        name='email'
                        placeholder={t("emailPlaceholder")}
                        className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.email}</span>

                {/* Password Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <PasswordIcon />
                    </div>
                    <input
                        name='password'
                        type={showPassword ? "text" : "password"}
                        placeholder={t("passwordPlaceholder")}
                        className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <button onClick={togglePasswordVisibility} className="flex items-center justify-center w-12 md:w-16 h-full">
                        {showPassword ? <IoEye className='text-2xl' /> : <IoEyeOff className='text-2xl' />}
                    </button>
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.password}</span>

                {/* Contact Number Input */}
                <div className="mb-6 flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                        <ContactIcon />
                    </div>
                    <input
                        name='contactNumber'
                        type="number"
                        autoComplete="off"
                        placeholder={t("contactNumber")}
                        className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                        onChange={onInputChange}
                    />
                </div>
                <span className='text-red text-sm md:text-base'>{formErrors?.contactNumber}</span>

                {/* SignUp Button */}
                <div className='flex items-center justify-center mt-10'>
                    <Button type="button" aria-label="Login" boxShadow={true} className="w-40 md:w-52 tracking-wider" onClick={() => handleSignUp()}>
                        <span className="inline-block  transform skew-x-6 text-4xl uppercase ">{t("signUp")}</span>
                    </Button>
                </div>

                {/* "or Login" link */}
                <div className="text-center text-gray-700 text-base mt-4">
                    <button type='button' onClick={handleGoToLogin} className="font-normal font-Product_sans hover:underline">{t("orLogin")}</button>
                </div>
            </div>
        </section>
    );
}