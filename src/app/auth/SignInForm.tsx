'use client';
import { useAuthModalStore } from '../store/useAuthModalStore';
//icons
import PasswordIcon from '../assets/icons/password-icon.svg';
import EmailIcon from '../assets/icons/email-icon.svg';
import Button from '../components/ui/common/Button';

export default function SignInForm() {
    const { closeModal } = useAuthModalStore();
    const { openModal } = useAuthModalStore();

    const handleNewAccount = () => {
        openModal("signup");
    };


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login button clicked!');
        closeModal();
    };

    return (
        <div>
            {/* Modal Body */}
            <form onSubmit={handleLogin} className="sm:p-6 p-2">
                {/* Email Input */}
                <div className="mb-6 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purpl w-16 flex items-center justify-center h-full">
                        <EmailIcon className="" />
                    </div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="-ml-2 mb-1 flex items-center h-14 w-full transform -skew-x-12 border-2 border-black overflow-hidden">
                    <div className="bg-purpl flex items-center justify-center w-16 h-full">
                        <PasswordIcon />
                    </div>
                    <input
                        type="password"
                        placeholder="Your password"
                        className="input h-full rounded-none input-bordered w-full pl-2 md:pl-8 pr-4 py-3 text-lg bg-white text-gray-800 border-none focus:outline-none"
                        required
                    />
                </div>
                {/* Create new account link */}
                <div className="text-base text-left -ml-2">
                    <button onClick={handleNewAccount} className="hover:underline">Create new account ?</button>
                </div>


                <div className='flex items-center justify-center mt-10'>
                    {/* Login Button */}
                    <Button type="submit" aria-label="Login" className="w-52 ">
                        <span className="inline-block transform skew-x-12 tracking-wider text-4xl uppercase font-popfun">LOGIN</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}

