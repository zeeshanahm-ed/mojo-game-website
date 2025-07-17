
export interface IAuthModel {
    data: any;
    api_token?: any;
}

export interface IUserModel {
    _id: string;
    contactNumber: string;
    balance: number;
    maxCreditLimit: number;
    profilePicture: any;
    email: any;
    token: any;
    createdAt: string;
    firstName: string;
    lastName: string;
    updatedAt?: string;
    data: any;
}

export interface ISignInForm {
    email: string;
    password: string;
}
export interface ISignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    password: string;
    profilePicture: string;
    contactNumber: string;
}

export interface IForgotPasswordForm {
    contactNumber: number | string;
}

export interface IVerifyOtpRequestBody {
    contactNumber: number | string;
    otp: string;
}

export interface IChangePasswordForm {
    newPassword: string;
    otp: string;
    contactNumber: number | string;
}
export interface IUpdateProfileForm {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    contactNumber: string;
}