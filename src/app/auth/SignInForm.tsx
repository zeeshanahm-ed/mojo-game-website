'use client';
import { useState } from 'react';
import { useAuthModalStore } from '../store/useAuthModalStore';
import Button from '../components/ui/common/Button';
import { ISignInForm } from './core/_models';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../hooks/useGetDirection';
//icons
import PasswordIcon from '../assets/icons/password-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';
import { IoEye, IoEyeOff } from "react-icons/io5";

interface ValidationErrors {
    [key: string]: string;
}

export default function SignInForm() {
    const { t } = useTranslation();
    const direction = useDirection();

    const { openModal } = useAuthModalStore();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [formErrors, setFormErrors] = useState<ValidationErrors>();
    const [formState, setFormState] = useState<ISignInForm>({
        email: "",
        password: "",
    });

    const handleNewAccount = () => {
        openModal("signup");
    };

    const validateFormData = (formData: ISignInForm): ValidationErrors => {
        const errors: ValidationErrors = {};

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

    const handleOk = () => {
        console.log('Login button clicked!');
    };

    const handleSignIn = () => {
        const error = validateFormData(formState);
        if (Object.keys(error).length > 0) {
            setFormErrors(error);
            return;
        } else {
            handleOk();
            console.log('Sign Up button clicked!', formState);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <section>
            {/* Modal Body */}
            <div className="tracking-normal md:px-20 sm:px-10 px-5 py-10 space-y-6" dir={direction}>
                {/* Email Input */}
                <div>
                    <div className="flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                        <div className="bg-purple w-12 md:w-16 flex items-center justify-center h-full">
                            <EmailIcon className="" />
                        </div>
                        <input
                            value={formState.email}
                            type="email"
                            name='email'
                            placeholder={t('emailPlaceholder')}
                            dir={direction}
                            className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                            onChange={onInputChange}
                        />
                    </div>
                    <p className='text-start text-red text-sm md:text-base'>{formErrors?.email}</p>
                </div>

                {/* Password Input */}
                <div>
                    <div className="flex items-center h-12 md:h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                        <div className="bg-purple flex items-center justify-center w-12 md:w-16 h-full">
                            <PasswordIcon />
                        </div>
                        <input
                            value={formState.password}
                            type={showPassword ? "text" : "password"}
                            placeholder={t('passwordPlaceholder')}
                            name='password'
                            dir={direction}
                            className="input h-full rounded-none input-bordered w-full ps-2 md:ps-8 pe-4 py-3 text-base md:text-lg bg-white text-gray-800 border-none focus:outline-none"
                            onChange={onInputChange}
                        />
                        <button onClick={togglePasswordVisibility} className="flex items-center justify-center w-12 md:w-16 h-full">
                            {showPassword ? <IoEye className='text-2xl' /> : <IoEyeOff className='text-2xl' />}
                        </button>
                    </div>
                    <p className={`text-start w-full text-red text-sm md:text-base`}>{formErrors?.password}</p>
                </div>

                {/* Create new account link */}
                <button onClick={handleNewAccount} className="w-full text-start font-normal font-Product_sans text-sm md:text-base -ml-2 hover:underline">
                    {t('createAccount')}
                </button>

                <div className='flex items-center justify-center'>
                    {/* Login Button */}
                    <Button type="button" onClick={handleSignIn} aria-label="Login" className="w-40 md:w-52 tracking-wider">
                        <span className="inline-block transform skew-x-6 text-4xl uppercase font-popfun">{t('login')}</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}
