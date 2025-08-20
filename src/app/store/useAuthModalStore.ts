import { create } from 'zustand';

type AuthModalMode = 'signin' | 'signup' | "logout" | "forgotPassword" | "verifyOtp" | "resetPassword";
interface AuthModalStore {
    open: boolean;
    history: AuthModalMode[];
    mode: AuthModalMode;
    openModal: (mode: AuthModalMode) => void;
    closeModal: () => void;
    goBack: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    open: false,
    mode: 'signin',
    history: [],
    openModal: (mode) => {
        set((state) => ({
            open: true,
            mode,
            history: [...state.history, state.mode],
        }));
    },
    closeModal: () => set({ open: false }),
    goBack: () => set((state) => {
        const newHistory = [...state.history];
        const previousMode = newHistory.pop();
        return { mode: previousMode || 'signin', history: newHistory };
    }),
}));