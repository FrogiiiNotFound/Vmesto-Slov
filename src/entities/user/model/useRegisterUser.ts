import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { useUser } from "./useUserStore";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    const { setAccessToken, setIsAuth } = useUser();

    return useMutation({
        mutationFn: userApi.registerUser,
        onSuccess(data) {
            localStorage.setItem("token", data.accessToken);
            setAccessToken(data.accessToken);
            setIsAuth(true);
            queryClient.setQueryData(["user", "me"], data.user);
        },
    });
};
