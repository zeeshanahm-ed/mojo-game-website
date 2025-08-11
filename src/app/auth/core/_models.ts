
export interface IAuthModel {
    data: IUserModel;
    api_token?: string;
}

export interface IUserModel {
    _id: string;
    phoneNumber: string;
    email: string;
    role: string;
    age: number;
    createdAt: string;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
    gender: string;
    status: string;
    creditsBalance: number;
    gamesPlayed: number;
    isDeleted: boolean;
    updatedAt?: string;
}

export interface ISignInForm {
    email: string;
    password: string;
}
export interface ISignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    gender: string;
    countryCode?: string;
    password: string;
    avatar?: File | string | null;
    phoneNumber: string;
}

export interface IForgotPasswordForm {
    phoneNumber: number | string;
}

export interface IVerifyOtpRequestBody {
    phoneNumber: number | string;
    otp: string;
}

export interface IChangePasswordForm {
    newPassword: string;
    otp: string;
    phoneNumber: number | string;
}
export interface IUpdateProfileForm {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
}