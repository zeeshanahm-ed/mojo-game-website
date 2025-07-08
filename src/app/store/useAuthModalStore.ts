import { create } from 'zustand';

interface AuthModalStore {
    open: boolean;
    mode: 'signin' | 'signup';
    openModal: (mode: 'signin' | 'signup') => void;
    closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    open: false,
    mode: 'signin',
    openModal: (mode) => {
        console.log(`Opening modal in ${mode} mode`);
        set({ open: true, mode });
    },
    closeModal: () => set({ open: false }),
}));