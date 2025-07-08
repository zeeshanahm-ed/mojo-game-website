'use client';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

interface AuthContextType {
    user: string | null;
    setUser: (user: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
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

