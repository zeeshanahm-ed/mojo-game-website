"use client"
import React, { useState } from 'react'
import { useCountries } from '../hooks/useCountries';

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';


//icons
import CountryCodeIcon from '@/app/assets/icons/country-code-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';
import Select from '../components/ui/common/Select';


function ContactUS() {
    const { countries } = useCountries();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        contact: '',
        message: '',
        countryCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    const CountriesList = countries?.map((country) => ({
        label: country.name,
        value: country.dialCode,
    }));

    return (
        <section>
            <Banner />
            <Wrapper>
                <div className='h-auto pt-20 pb-20 px-4 md:px-10'>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center sm:p-6 space-y-6 w-full">
                        {/* First Name Input */}
                        <Input
                            icon={<UserIcon />}
                            type="text"
                            placeholder="Full Name"
                            className="sm:w-[450px] lg:w-2/3 w-full mb-0"
                            required
                            name="fullName"
                            onChange={handleChange}
                            value={form.fullName}
                        />

                        {/* Email Input */}
                        <Input
                            icon={<EmailIcon />}
                            type="email"
                            placeholder="Enter your email address"
                            className="sm:w-[450px] lg:w-2/3 w-full"
                            required
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                        />

                        <Select
                            icon={<CountryCodeIcon />}
                            name="countryCode"
                            isCountrySelect={true}
                            value={form.countryCode}
                            onChange={handleChange}
                            options={CountriesList || []}
                            placeholder="Select Countery Code"
                            className="sm:w-[450px] lg:w-2/3 w-full"
                        />

                        {/* Contact Number Input */}
                        <Input
                            icon={<ContactIcon />}
                            type="number"
                            placeholder="Your Contact Number"
                            className="sm:w-[450px] lg:w-2/3 w-full"
                            required
                            name="contact"
                            onChange={handleChange}
                            value={form.contact}
                        />

                        <textarea
                            className="sm:w-[450px] lg:w-2/3 w-full h-28 outline-none resize-none bg-white border-2 border-black -skew-x-[4deg] md:-skew-x-[8deg] p-4 text-base md:text-lg"
                            placeholder="Your message"
                            name="message"
                            onChange={handleChange}
                            value={form.message}>
                        </textarea>

                        {/* SignUp Button */}
                        <div className='flex items-center justify-center mt-10'>
                            <Button type="submit" aria-label="Send" className="w-52 ">
                                <span className="inline-block transform skew-x-12 tracking-wider text-4xl uppercase font-popfun">Send</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Wrapper>
        </section >
    )
}

export default ContactUS;