"use client"
import React, { useState } from 'react'
import { useCountries } from '../hooks/useCountries';

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Select from '../components/ui/common/Select';


//icons
import CountryCodeIcon from '@/app/assets/icons/country-code-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';
import EditIcon from '@/app/assets/icons/edit-icon.svg';
import FallBackProfileImage from '../assets/images/fallback-profile-image.jpg';
import Image from 'next/image';



function Profile() {
    const { countries } = useCountries();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        contact: '',
        profilePicture: '',
        countryCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, profilePicture: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const CountriesList = countries?.map((country) => ({
        label: country.name,
        value: country.dialCode,
    }));
    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='h-auto pt-20 pb-20 px-4 md:px-10 flex md:flex-row flex-col items-center justify-evenly'>
                    <div className='flex flex-col items-center justify-center space-y-4 mb-10'>
                        <div className="relative w-40 h-40 border-4 border-yellow flex items-center justify-center">
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
                                src={form.profilePicture || (typeof FallBackProfileImage === 'string' ? FallBackProfileImage : FallBackProfileImage.src)}
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
                        <p className="text-lg font-semibold">Your Avatar</p>
                        <Button boxShadow={false} className="w-52">
                            <span className="inline-block  transform skew-x-12 tracking-wider text-4xl uppercase font-popfun">Logout</span>
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center sm:p-6 space-y-6">

                        {/* First Name & Last Name Input */}
                        <div className="flex items-center h-14 sm:w-[450px] lg:w-full w-full transform -skew-x-6 md:-skew-x-12 border-2 border-black overflow-hidden">
                            <div className="bg-purple flex items-center justify-center w-[57px] md:w-[70px] h-full">
                                <UserIcon />
                            </div>
                            <input
                                type="text"
                                name='firstName'
                                placeholder="First Name"
                                className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none"
                                autoComplete="off"
                            />
                            <div className='h-[90%] w-[2px] bg-light-gray'></div>
                            <input
                                type="text"
                                name='lastName'
                                placeholder="Last Name"
                                className="flex-1 input h-full rounded-none input-bordered  pl-2 md:pl-8 pr-2 text-lg bg-white text-gray-800 border-none focus:outline-none border-l border-gray-300"
                                autoComplete="off"
                            />
                        </div>

                        {/* Email Input */}
                        <Input
                            icon={<EmailIcon />}
                            type="email"
                            placeholder="Enter your email address"
                            className="sm:w-[450px] lg:w-full w-full"
                            required
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                        />

                        <Select
                            icon={<CountryCodeIcon />}
                            isCountrySelect={true}
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleChange}
                            options={CountriesList || []}
                            placeholder="Select Countery Code"
                            className="sm:w-[450px] lg:w-full w-full"
                        />

                        {/* Contact Number Input */}
                        <Input
                            icon={<ContactIcon />}
                            type="number"
                            placeholder="Your Contact Number"
                            className="sm:w-[450px] lg:w-full w-full"
                            required
                            name="contact"
                            onChange={handleChange}
                            value={form.contact}
                        />

                        {/* SignUp Button */}
                        <div className='flex items-center justify-center mt-10'>
                            <Button type="submit" aria-label="Save" className="w-52" boxShadow={false}>
                                <span className="inline-block transform skew-x-12 tracking-wider text-4xl uppercase font-popfun">Save Changes</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Wrapper>
        </section >
    )
}

export default Profile;