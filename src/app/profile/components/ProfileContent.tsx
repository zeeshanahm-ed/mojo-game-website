"use client"
import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios';

import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Select from '@/app/components/ui/common/Select';
import Image from 'next/image';

//hooks
import { useCountries } from '../../hooks/useCountries';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { showErrorMessage, showSuccessMessage } from '@/app/utils/messageUtils';
import useUpdateUserProfile from '../core/hooks/useUpdateUserProfile';
import { useAuthModalStore } from '@/app/store/useAuthModalStore';
import { useDirection } from '@/app/hooks/useGetDirection';

//icons
import CountryCodeIcon from '@/app/assets/icons/country-code-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';
import EditIcon from '@/app/assets/icons/edit-icon.svg';
import FallBackProfileImage from '@/app/assets/images/fallback-profile-image.jpg';

interface FormState {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    avatar: string | null,
    countryCode: string,
}

function ProfileContent() {
    const { countries } = useCountries();
    const { openModal } = useAuthModalStore();
    const { t } = useTranslation();
    const direction = useDirection();
    const { user } = useAuth();
    const router = useRouter();
    const { mutateUpdateUserProfile } = useUpdateUserProfile();
    const [profilePicObj, setProfilePicObj] = useState<File | null>(null);

    const [formState, setFormState] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        avatar: '',
        countryCode: '',
    });

    useEffect(() => {
        if (user) {
            setFormState(prev => (
                {
                    ...prev,
                    firstName: user.data.firstName,
                    lastName: user.data.lastName,
                    email: user.data.email,
                    avatar: user.data.imageUrl,
                    phoneNumber: user.data.phoneNumber
                }
            ));
        }
        else {
            router.push("/")
        }
    }, [user, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleProfileChange = () => {
        const formData = new FormData();
        formData.append("firstName", formState.firstName);
        formData.append("lastName", formState.lastName);
        formData.append("email", formState.email);
        formData.append("phoneNumber", formState.countryCode + formState.phoneNumber);

        if (formState.avatar && profilePicObj instanceof File) {
            formData.append("avatar", profilePicObj);
        }

        mutateUpdateUserProfile(formData, {
            onSuccess: async () => {
                showSuccessMessage('Profile update successful.');
            },
            onError: (error: unknown) => {
                if (error instanceof AxiosError) {
                    showErrorMessage(error?.response?.data?.message);
                }
            },
        });
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
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

    const CountriesList = countries?.map((country) => ({
        label: country.name,
        value: country.dialCode,
    }));

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
                        src={formState.avatar || (typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                        width={160}
                        height={160}
                    />
                    <div
                        className="absolute -top-2 -right-2 bg-black rounded-full p-1 border-2 border-white cursor-pointer"
                        onClick={triggerFileInput}
                    >
                        <EditIcon className=" w-4 h-4 fill-white" />
                    </div>
                </div>
                <p className="font-secondary text-lg font-semibold">{t("yourAvatar")}</p>
                <Button boxShadow={false} className="w-52" onClick={handleLogoutModal}>
                    <span className="inline-block  transform tracking-wider text-4xl uppercase ">{t("logout")}</span>
                </Button>
            </div>

            <div className="flex flex-col items-center sm:p-6 space-y-6">

                {/* First Name & Last Name Input */}
                <div dir={direction} className="flex font-secondary items-center h-14 sm:w-[450px] lg:w-full w-full transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purple flex items-center justify-center w-[57px] md:w-[70px] h-full">
                        <UserIcon />
                    </div>
                    <input
                        type="text"
                        value={formState.firstName}
                        name='firstName'
                        placeholder={t("firstName")}
                        className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        autoComplete="off"
                    />
                    <div className='h-[90%] w-[2px] bg-light-gray'></div>
                    <input
                        type="text"
                        value={formState.lastName}
                        name='lastName'
                        placeholder={t("lastName")}
                        className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                        autoComplete="off"
                    />
                </div>

                {/* Email Input */}
                <Input
                    icon={<EmailIcon />}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="sm:w-[450px] lg:w-full w-full"
                    required
                    value={formState.email}
                    name="email"
                    onChange={handleChange}
                />

                <Select
                    icon={<CountryCodeIcon />}
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
                    icon={<ContactIcon />}
                    type="number"
                    placeholder={t("phoneNumber")}
                    className="sm:w-[450px] lg:w-full w-full"
                    required
                    name="contact"
                    onChange={handleChange}
                    value={formState.phoneNumber}
                />

                {/* SignUp Button */}
                <div className='flex items-center justify-center mt-10'>
                    <Button onClick={handleProfileChange} aria-label="Save" className="w-52" boxShadow={false}>
                        <span className="inline-block transform tracking-wider text-4xl uppercase ">{t("saveChanges")}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;