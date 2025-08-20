

import api from '@/app/services/api/api';
import authApi from '@/app/services/api/authApi';
import { IChangePasswordForm, IForgotPasswordForm, ISignInForm, IVerifyOtpRequestBody } from './_models';

const SIGNIN_URL = '/auth/login';
const SIGNUP_URL = '/auth/register';
const FORGOT_PASSWORD_URL = '/auth/forgot-password';
const VERIFY_OTP = '/auth/verify-otp';
const VERIFY_TOKEN_URL = '/auth/verify-token';
const RESET_PASS_CODE = '/auth/reset-password';

export function signIn(body: ISignInForm) {
    return api.post(SIGNIN_URL, body);
}

export function signUp(body: FormData) {
    return api.post(SIGNUP_URL, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export function forgotPassCode(body: IForgotPasswordForm) {
    return api.post(FORGOT_PASSWORD_URL, body);
}

export function verifyOtp(body: IVerifyOtpRequestBody) {
    return api.post(VERIFY_OTP, body);
}

export function resetPassword(body: IChangePasswordForm) {
    return api.post(RESET_PASS_CODE, body);
}
export function getUserByToken(token: string) {
    return authApi.get(VERIFY_TOKEN_URL, {
        headers: { Authorization: `Bearer ${token}` },
    }
    );
}
