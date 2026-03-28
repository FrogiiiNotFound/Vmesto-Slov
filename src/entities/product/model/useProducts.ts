import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products";

export const useProducts = (queryParams: any) =>
    useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => productsApi.getProducts(queryParams),
        placeholderData: keepPreviousData,
    });
