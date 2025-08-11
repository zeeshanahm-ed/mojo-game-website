import axios from 'axios';
import { IAuthModel, IUserModel } from '../auth/core/_models';


const NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY as string;
const NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY as string;


const getAuth = (): IAuthModel | undefined => {
    try {
        const lsValue = localStorage.getItem(NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY);
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
        localStorage.setItem(NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
};

const getUser = (): IUserModel | undefined => {
    if (!localStorage) {
        return;
    }

    const lsValue: string | null = localStorage.getItem(NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY);
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
        localStorage.setItem(NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
};

const removeAuth = () => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY);
        localStorage.removeItem(NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY);
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

export { getAuth, setUser, getUser, setAuth, removeAuth, NEXT_PUBLIC_AUTH_LOCAL_STORAGE_KEY };
