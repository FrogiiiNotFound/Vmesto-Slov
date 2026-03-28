import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (index: number) => userApi.deleteAddress(index),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
};
