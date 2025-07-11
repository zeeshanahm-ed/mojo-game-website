import { create } from 'zustand';

interface CreateGameModalStore {
    open: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useCreateGameModalStore = create<CreateGameModalStore>((set) => ({
    open: false,
    openModal: () => {
        set({ open: true });
    },
    closeModal: () => set({ open: false }),
}));