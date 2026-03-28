import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useAddOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.addOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};
