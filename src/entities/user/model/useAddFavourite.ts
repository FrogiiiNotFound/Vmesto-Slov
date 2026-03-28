import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useAddFavourite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => userApi.addFavourite(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
        },
    });
};
