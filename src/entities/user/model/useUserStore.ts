import { create } from "zustand";

type UserState = {
    accessToken: string;
    isAuth: boolean;
    selectedAddress: string;
    setAccessToken: (token: string) => void;
    setIsAuth: (boolean: boolean) => void;
    setSelectedAddress: (address: string) => void;
};

export const useUser = create<UserState>((set) => ({
    accessToken: "",
    isAuth: false,
    selectedAddress: "",
    setIsAuth: (boolean) => set({ isAuth: boolean }),
    setAccessToken: (token) => set({ accessToken: token }),
    setSelectedAddress: (address) => set({ selectedAddress: address }),
}));
