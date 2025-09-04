import axios from 'axios';
import Cookies from "js-cookie";
import { IAuthModel, IUserModel } from '../auth/core/_models';
import { AUTH_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from '../constants/constant';



const getAuth = (): IAuthModel | undefined => {
    try {
        const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
        if (!lsValue) return undefined;

        const auth = JSON.parse(lsValue) as IAuthModel;
        return auth ?? undefined;
    } catch (error) {
        console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
        return undefined;
    }
};


const setAuth = (user: IAuthModel) => {
    if (!localStorage) {
        return;
    }

    try {
        const lsValue = JSON.stringify(user);

        // ✅ Save in localStorage
        localStorage.setItem(
            AUTH_LOCAL_STORAGE_KEY,
            lsValue
        );

        // ✅ Save in cookie (for middleware & SSR protection)
        if (user?.api_token) {
            Cookies.set("authToken", user.api_token, {
                expires: 7, // 7 days
                secure: process.env.NODE_ENV === "production", // only HTTPS in prod
                sameSite: "strict", // CSRF protection
                path: "/", // available everywhere
            });
        }
    } catch (error) {
        console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
    }
};


const getUser = (): IUserModel | undefined => {
    if (!localStorage) {
        return;
    }

    const lsValue: string | null = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!lsValue) {
        return;
    }

    try {
        const user: IUserModel = JSON.parse(lsValue) as IUserModel;
        if (user) {
            // You can easily check auth_token expiration also
            return user;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
};

const setUser = (user: IUserModel) => {
    if (!localStorage) {
        return;
    }

    try {
        const lsValue = JSON.stringify(user);
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
};

const removeAuth = () => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
        localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        Cookies.remove("authToken", { path: "/" });
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
};

export function setupAxios() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    axios.interceptors.request.use((config) => {
        const changedConfig = config;

        const token = getAuth()?.api_token;
        if (token && config.headers) {
            changedConfig.headers.Authorization = `Bearer ${token}`;
        }

        return changedConfig;
    });

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            const isUnAuthorized = Boolean(error?.response?.status === 403) || Boolean(error?.response?.status === 401);
            if (isUnAuthorized) removeAuth();

            return Promise.reject(error);
        }
    );
}

export { getAuth, setUser, getUser, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
