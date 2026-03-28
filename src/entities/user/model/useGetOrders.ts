import { useQuery } from "@tanstack/react-query";
import { $api } from "@shared/index";

export const useGetOrders = (page: number) => {
    return useQuery({
        queryKey: ["orders", page],
        queryFn: async () => {
            const { data } = await $api.get(`/user/orders?page=${page}`);
            return data;
        },
    });
};
