import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { useUser } from "./useUserStore";

export const useGetFavourites = () => {
    const { isAuth } = useUser();

    return useQuery({
        queryKey: ["favourites"],
        queryFn: () => userApi.getFavourites(),
        enabled: isAuth,
    });
};
