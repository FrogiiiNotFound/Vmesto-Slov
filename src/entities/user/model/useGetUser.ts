import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => userApi.getUser(),
    });
};
