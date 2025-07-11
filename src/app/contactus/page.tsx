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
    const { countries, loading, error } = useCountries();

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


    return (
        <section>
            <Banner />
            <Wrapper>
                <Wrapper>
                    <div className='h-auto pt-20 pb-20'>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 space-y-6 w-full">
                            {/* First Name Input */}
                            <Input
                                icon={<UserIcon />}
                                type="text"
                                placeholder="Full Name"
                                className="w-1/2 mb-0"
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
                                className="w-1/2"
                                required
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                            />

                            <Select
                                icon={<CountryCodeIcon />}
                                name="countryCode"
                                value={form.countryCode}
                                onChange={handleChange}
                                options={countries || []}
                                placeholder="Select Countery Code"
                                className="w-1/2"
                            />

                            {/* Contact Number Input */}
                            <Input
                                icon={<ContactIcon />}
                                type="tel"
                                placeholder="Your Contact Number"
                                className="w-1/2"
                                required
                                name="contact"
                                onChange={handleChange}
                                value={form.contact}
                            />

                            <textarea
                                className="w-1/2 h-[200px] outline-none resize-none bg-white border-2 border-black -skew-x-12 p-5 text-lg"
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
            </Wrapper>
        </section >
    )
}

export default ContactUS;