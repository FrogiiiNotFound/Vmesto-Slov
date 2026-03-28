import { $api } from "@shared/index";
import type { User } from "../shemas/user.schema";

export const userApi = {
    registerUser: async (user: User) => {
        const { data } = await $api.post("register", {
            name: user.name,
            phone: user.contacts.phone,
            password: user.password,
            email: user.contacts.email,
        });
        return data;
    },
    loginUser: async (credentials: { email: string; password: string }) => {
        const { data } = await $api.post("login", credentials);
        return data;
    },
    logout: async () => {
        const { data } = await $api.post("logout");
        return data;
    },
    getUser: async () => {
        const user = await $api.get("/user");
        return user;
    },
    getAddresses: async () => {
        const addresses = await $api.get("/user/addresses");
        return addresses;
    },
    getFavourites: async () => {
        const favourites = await $api.get("/user/favourites");
        return favourites;
    },
    changeUserInfo: async (data: any) => {
        const updatedUser = await $api.patch("/user", data);
        return updatedUser;
    },
    addAddress: async (address: string) => {
        const addresses = await $api.post("/user/addresses", {
            address,
        });

        return addresses;
    },
    deleteAddress: async (index: number) => {
        const addresses = await $api.delete(`/user/addresses/${index}`);

        return addresses;
    },
    addFavourite: async (itemId: string) => {
        const favourites = await $api.post("/user/favourites", {
            itemId,
        });

        return favourites;
    },
    deleteFavourite: async (itemId: string) => {
        const favourites = await $api.delete(`/user/favourites/${itemId}`);

        return favourites;
    },
    addOrder: async (payload: {
        address: string;
        total_price: string;
        delivery_date: string;
        items: { product_id: string; quantity: number; price: number }[];
    }) => {
        const { data } = await $api.post("/user/orders", payload);
        return data;
    },
};
