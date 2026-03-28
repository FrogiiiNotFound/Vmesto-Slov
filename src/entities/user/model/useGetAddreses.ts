import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useGetAddresses = () => {
    return useQuery({
        queryKey: ["addresses"],
        queryFn: () => userApi.getAddresses(),
    });
};
