'use client';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useRef,
} from 'react';
import { getAuth, removeAuth, setAuth, setUser } from '../helpers/auth-helper';
import { IAuthModel } from '../auth/core/_models';
import { getUserByToken } from '../auth/core/_requests';

interface AuthContextType {
    user: IAuthModel | null;
    setCurrentUser: (user: IAuthModel | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setCurrentUser] = useState<IAuthModel | null>(null);
    const didRequest = useRef(false);
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    console.log(showSplashScreen);

    // 1. On mount, get user from localStorage and set in context state
    useEffect(() => {
        const storedUser = getAuth();
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    // 2. When user logs in, save user to localStorage and set user data
    useEffect(() => {
        if (user) {
            setAuth(user);      // Save user (with token) to localStorage
            setUser(user.data); // Save user data to localStorage
        }
    }, [user]);

    // 3. If user exists in localStorage, verify token with API and update user in context/localStorage
    useEffect(() => {
        const verifyAndSetUser = async (apiToken: string) => {
            try {
                if (!didRequest.current) {
                    const { data } = await getUserByToken(apiToken);
                    if (data?.data?.data?.data) {
                        // If token is valid, update user in context and localStorage
                        const user = {
                            api_token: data.data.data.token,
                            data: data.data.data.data,
                        };
                        setAuth(user);      // Save user (with token) to localStorage
                        setUser(user.data);
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (!didRequest.current) {

                }
                if (error.response.data.message === "Unauthorized") {
                    removeAuth();
                    window.location.href = "/";
                }

            } finally {
                setShowSplashScreen(false);
                didRequest.current = true;
            }
        };

        if (user && user.api_token) {
            verifyAndSetUser(user.api_token);
        } else {
            // Optionally handle logout here
            setShowSplashScreen(false);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setCurrentUser }}>
            {children}
            {/* {showSplashScreen && <SplashScreen />} */}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

