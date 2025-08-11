'use client';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { getAuth, setAuth, setUser } from '../helpers/auth-helper';
import { IAuthModel } from '../auth/core/_models';

interface AuthContextType {
    user: IAuthModel | null;
    setCurrentUser: (user: IAuthModel | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setCurrentUser] = useState<IAuthModel | null>(null);

    useEffect(() => {
        const storedUser = getAuth();
        if (storedUser) setCurrentUser(storedUser);
    }, []);

    useEffect(() => {
        if (user) {
            setAuth(user);
            setUser(user.data);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

