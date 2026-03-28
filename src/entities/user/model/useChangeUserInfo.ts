import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";

export const useChangeUserInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => userApi.changeUserInfo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};
