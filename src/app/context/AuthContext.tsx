'use client';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { getAuth } from '../helpers/auth-helper';
import { IAuthModel } from '../auth/core/_models';

interface AuthContextType {
    user: IAuthModel | null;
    setUser: (user: IAuthModel | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IAuthModel | null>(null);

    useEffect(() => {
        const storedUser = getAuth();
        if (storedUser) setUser(storedUser);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
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

