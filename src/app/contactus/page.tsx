"use client"
import React, { useState } from 'react'
import { useCountries } from '../hooks/useCountries';

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';
import Select from '../components/ui/common/Select';
import { useTranslation } from 'react-i18next';


//icons
import CountryCodeIcon from '@/app/assets/icons/country-code-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';
import { useDirection } from '../hooks/useGetDirection';


function ContactUS() {
    const { countries } = useCountries();
    const { t } = useTranslation();
    const direction = useDirection();

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
                <div className='flex items-center justify-center flex-col h-auto py-16 px-4 md:px-10'>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center sm:p-6 space-y-6 w-full">
                        {/* First Name Input */}
                        <Input
                            icon={<UserIcon />}
                            type="text"
                            placeholder={t("fullName")}
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
                            placeholder={t("emailPlaceholder")}
                            className="sm:w-[450px] lg:w-2/3 w-full"
                            required
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                        />

                        <Select
                            icon={<CountryCodeIcon />}
                            name="countryCode"
                            direction={direction}
                            isCountrySelect={true}
                            value={form.countryCode}
                            onChange={handleChange}
                            options={CountriesList || []}
                            placeholder={t("selectCountryCode")}
                            className="sm:w-[450px] lg:w-2/3 w-full"
                        />

                        {/* Contact Number Input */}
                        <Input
                            icon={<ContactIcon />}
                            type="number"
                            placeholder={t("contactNumber")}
                            className="sm:w-[450px] lg:w-2/3 w-full"
                            required
                            name="contact"
                            onChange={handleChange}
                            value={form.contact}
                        />

                        <textarea
                            className="sm:w-[450px] font-secondary lg:w-2/3 w-full h-28 outline-none resize-none bg-white border-2 border-black -skew-x-[4deg] md:-skew-x-[8deg] p-4 text-base md:text-lg"
                            placeholder={t("yourMessage")}
                            name="message"
                            dir={direction}
                            onChange={handleChange}
                            value={form.message}>
                        </textarea>

                        {/* SignUp Button */}
                        <div className='flex items-center justify-center mt-10'>
                            <Button type="submit" aria-label="Send" className="w-52 ">
                                <span className="inline-block transform skew-x-12 tracking-wider text-4xl uppercase ">{t("send")}</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Wrapper>
        </section >
    )
}

export default ContactUS;