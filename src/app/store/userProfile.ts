import { create } from "zustand";
import { IUserModel } from "../auth/core/_models";

type UserProfileStore = {
    userProfile: IUserModel | null;
    setUserProfile: (userProfile: IUserModel | null) => void;
}

export const useUserProfile = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
}));