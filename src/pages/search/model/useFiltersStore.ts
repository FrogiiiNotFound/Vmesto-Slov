import { create } from "zustand";

type FiltersState = {
    category: string;
    tags: string[];
    price: number[];
    flowers: string[];
    setCategory: (categoryName: string) => void;
    setTags: (value: string) => void;
    deleteTags: (tag: string) => void;
    setPrice: (price: number[]) => void;
    setFlowers: (flower: string) => void;
    deleteFlowers: (flower: string) => void;
};

export const useFilters = create<FiltersState>((set, get) => ({
    category: "all",
    tags: [],
    price: [0, 20000],
    flowers: [],
    setCategory: (categoryName) => set({ category: categoryName }),
    setTags: (value) =>
        set({
            tags: get().tags.includes(value)
                ? get().tags.filter((tag) => tag !== value)
                : [...get().tags, value],
        }),
    deleteTags: (tag) => set({ tags: get().tags.filter((t) => t !== tag) }),
    setFlowers: (flower) => set({ flowers: [...get().flowers, flower] }),
    deleteFlowers: (flower) =>
        set({ flowers: get().flowers.filter((f) => f !== flower) }),
    setPrice: (price) => set({ price: price }),
}));
