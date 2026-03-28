import { $api } from "@shared/index";

export const productsApi = {
    getAllProducts: async () => {
        const { data } = await $api.get("products", {
            params: {
                category: "flowers",
                priceFrom: 0,
                priceTo: 100000,
                composition: "",
                tags: "",
                page: 1,
            },
        });

        return data;
    },
};
