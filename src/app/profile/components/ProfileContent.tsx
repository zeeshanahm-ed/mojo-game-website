"use client"
import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios';

import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Select from '@/app/components/ui/common/Select';
import Image from 'next/image';

//hooks
import { useTranslation } from 'react-i18next';
import { showErrorMessage, showSuccessMessage } from '@/app/utils/messageUtils';
import useUpdateUserProfile from '../core/hooks/useUpdateUserProfile';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';
import { useDirection } from '@/app/hooks/useGetDirection';
import { useUserProfile } from '@/app/store/userProfile';
import { useCountriesData } from '@/app/store/countriesData';


interface FormState {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    avatar: string | null,
    countryCode: string,
}

function ProfileContent() {
    const { countriesData } = useCountriesData();
    const { openModal } = useAuthModalStore();
    const { t } = useTranslation();
    const direction = useDirection();
    const { mutateUpdateUserProfile } = useUpdateUserProfile();
    const [profilePicObj, setProfilePicObj] = useState<File | null>(null);
    const { setUserProfile, userProfile } = useUserProfile();
    const [formState, setFormState] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        avatar: '',
        countryCode: '',
    });

    useEffect(() => {
        if (userProfile) {
            setFormState(prev => (
                {
                    ...prev,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    avatar: userProfile.imageUrl,
                    phoneNumber: userProfile.phoneNumber.split("-")[1],
                    countryCode: userProfile.phoneNumber.split("-")[0]
                }
            ));
        }
        else {
            setFormState(prev => (
                {
                    ...prev,
                    firstName: "",
                    lastName: "",
                    email: "",
                    avatar: "",
                    phoneNumber: "",
                    countryCode: ""
                }
            ));
        }
    }, [userProfile])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleProfileChange = () => {
        const formData = new FormData();
        formData.append("firstName", formState.firstName);
        formData.append("lastName", formState.lastName);
        formData.append("email", formState.email);
        formData.append("phoneNumber", formState.countryCode + "-" + formState.phoneNumber);

        if (profilePicObj) {
            formData.append("avatar", profilePicObj);
        }
        mutateUpdateUserProfile(formData, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: async (data: any) => {
                showSuccessMessage('Profile update successful.');
                const localUserData = JSON.parse(localStorage.getItem("user") || "{}");
                const updatedUserData = {
                    ...localUserData,
                    ...data.data.data
                }
                localStorage.setItem("user", JSON.stringify(updatedUserData));
                setUserProfile(data.data.data);
            },
            onError: (error: unknown) => {
                if (error instanceof AxiosError) {
                    showErrorMessage(error?.response?.data?.message);
                }
            },
        });
    };

    const validateFile = (file: File) => {
        if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
            showErrorMessage('File type must be jpeg, png, jpg or webp');
            return false;
        }
        return true;
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!validateFile(file)) {
                return;
            }
            setProfilePicObj(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState((prev) => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleLogoutModal = () => {
        openModal("logout")
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const CountriesList = countriesData?.map((country) => ({
        label: country.name,
        value: country.dialCode,
    }));

    const buttonDisabled = () => {
        // Check if any required field is empty
        if (
            !formState.firstName ||
            !formState.lastName ||
            !formState.email ||
            !formState.phoneNumber ||
            !formState.countryCode
        ) {
            return true;
        }

        // If userProfile is not loaded yet, disable button
        if (!userProfile) {
            return true;
        }

        // Check if all fields are the same as the original userProfile data
        const isSame =
            formState.firstName === userProfile.firstName &&
            formState.lastName === userProfile.lastName &&
            formState.email === userProfile.email &&
            formState.phoneNumber === userProfile.phoneNumber &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formState.countryCode === (userProfile as any).countryCode; // countryCode may not exist on userProfile, adjust as needed

        return isSame;
    }

    return (
        <div className='h-auto pt-10 px-4 md:px-10 flex md:flex-row flex-col items-center justify-evenly'>
            <div className='flex flex-col items-center justify-center space-y-4 mb-10'>
                <div className="relative w-40 h-40 border-4 border-yellow flex items-center justify-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        name="avatar"
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <Image
                        src={formState.avatar || "/images/fallback-profile-image.jpg"}
                        alt="User Profile"
                        className="object-contain"
                        width={120}
                        height={120}
                    />
                    <div
                        className="absolute -top-2 -right-2 bg-black rounded-full p-1 border-2 border-white cursor-pointer"
                        onClick={triggerFileInput}
                    >
                        <Image src="/images/icons/edit-icon-white.svg" alt='edit-icon' width={18} height={18} className=" w-4 h-4" />

                    </div>
                </div>
                <p className={`${direction === "rtl" ? "font-arabic" : "font-secondary"} text-lg font-semibold`}>{t("yourAvatar")}</p>
                <Button boxShadow={false} className={`w-fit px-5  ${direction === "rtl" ? "text-2xl" : "text-4xl"}`} onClick={handleLogoutModal}>
                    <span className="inline-block  transform tracking-wider  uppercase ">{t("logout")}</span>
                </Button>
            </div>

            <div className="flex flex-col items-center sm:p-6 space-y-6">

                {/* First Name & Last Name Input */}
                <div dir={direction} className="flex font-secondary items-center h-14 sm:w-[450px] lg:w-full w-full transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-[57px] md:w-[70px] h-full">
                        <Image src="/images/icons/user-icon.svg" alt='user-icon' width={24} height={24} />
                    </div>
                    <input
                        type="text"
                        value={formState.firstName}
                        name='firstName'
                        onChange={handleChange}
                        placeholder={t("firstName")}
                        className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        autoComplete="off"
                    />
                    <div className='h-[90%] w-[2px] bg-light-gray'></div>
                    <input
                        type="text"
                        value={formState.lastName}
                        name='lastName'
                        onChange={handleChange}
                        placeholder={t("lastName")}
                        className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                        autoComplete="off"
                    />
                </div>

                {/* Email Input */}
                <Input
                    icon={<Image src="/images/icons/email-icon.svg" alt='email-icon' width={24} height={24} />}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="sm:w-[450px] lg:w-full w-full"
                    required
                    value={formState.email}
                    name="email"
                    onChange={handleChange}
                />

                <Select
                    icon={<Image src="/images/icons/country-code-icon.svg" alt='country-code-icon' width={24} height={24} />}
                    isCountrySelect={true}
                    name="countryCode"
                    value={formState.countryCode}
                    onChange={handleChange}
                    options={CountriesList || []}
                    placeholder={t("selectCountryCode")}
                    className="sm:w-[450px] lg:w-full w-full"
                    direction={direction}
                />

                {/* Contact Number Input */}
                <Input
                    icon={<Image src="/images/icons/contact-icon.svg" alt='contact-icon' width={24} height={24} />}
                    type="number"
                    placeholder={t("phoneNumber")}
                    className="sm:w-[450px] lg:w-full w-full"
                    required
                    name="phoneNumber"
                    onChange={handleChange}
                    value={formState.phoneNumber}
                />

                {/* SignUp Button */}
                <div className='flex items-center justify-center mt-10'>
                    <Button disabled={buttonDisabled()} onClick={handleProfileChange} aria-label="Save" className={`w-fit px-5  ${direction === "rtl" ? "text-2xl" : "text-4xl"}`} boxShadow={false}>
                        <span className="inline-block transform tracking-wider uppercase ">{t("saveChanges")}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;