import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useDeleteFavourite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: string) => userApi.deleteFavourite(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourites"] });
        },
    });
};
