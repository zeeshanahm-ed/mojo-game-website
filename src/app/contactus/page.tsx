"use client"
import React, { useState } from 'react'

import Wrapper from '@/app/components/ui/common/Wrapper';
import Banner from './components/Banner';
import Input from '@/app/components/ui/common/Input';
import Button from '@/app/components/ui/common/Button';


//icons
import PasswordIcon from '@/app/assets/icons/password-icon.svg';
import EmailIcon from '@/app/assets/icons/email-icon.svg';
import EditIcon from '@/app/assets/icons/edit-icon.svg';
import ContactIcon from '@/app/assets/icons/contact-icon.svg';
import UserIcon from '@/app/assets/icons/user-icon.svg';


function ContactUS() {

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign Up button clicked!');
    };

    return (
        <section>
            <Banner />
            <Wrapper>
                <Wrapper>
                    <div className='h-auto pt-20 pb-20'>
                        <form onSubmit={handleSend} className="flex flex-col items-center p-6 space-y-6 w-full">
                            {/* First Name Input */}
                            <Input
                                icon={<UserIcon />}
                                type="text"
                                placeholder="Full Name"
                                className="w-1/2 mb-0"
                                required
                            />

                            {/* Email Input */}
                            <Input
                                icon={<EmailIcon />}
                                type="email"
                                placeholder="Enter your email address"
                                className="w-1/2"
                                required
                            />

                            {/* Contact Number Input */}
                            <Input
                                icon={<ContactIcon />}
                                type="tel"
                                placeholder="Your Contact Number"
                                className="w-1/2"
                                required
                            />

                            <textarea
                                className="w-1/2 h-[200px] outline-none resize-none bg-white border-2 border-black skew-custom p-5 text-lg"
                                placeholder="Your message"></textarea>

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