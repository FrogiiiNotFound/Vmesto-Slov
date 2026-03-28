import type { CartItem } from "@/entities/card";
import { create } from "zustand";

type FavouritesState = {
    favourites: CartItem[];
    addFavourite: (item: CartItem) => void;
    deleteFavourite: (item: CartItem) => void;
};

export const useFavourites = create<FavouritesState>((set, get) => ({
    favourites: [],
    addFavourite: (item) => set({ favourites: [...get().favourites, item] }),
    deleteFavourite: (item) =>
        set({ favourites: get().favourites.filter((i) => i !== item) }),
}));
