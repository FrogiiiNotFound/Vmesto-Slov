import { $api } from "@shared/index";
export const productsApi = {
    getProducts: async (queryParams: any) => {
        const { data } = await $api.get("products", {
            params: queryParams,
        });

        return data;
    },
    getProductById: async (id: string) => {
        const { data } = await $api.get(`products/${id}`);

        return data;
    },
};