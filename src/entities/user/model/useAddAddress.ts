import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useAddAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (address: string) => userApi.addAddress(address),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
};
