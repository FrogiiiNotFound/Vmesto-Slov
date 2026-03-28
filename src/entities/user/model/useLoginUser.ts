import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { useUser } from "./useUserStore";

export const useLoginUser = () => {
    const { setAccessToken, setIsAuth } = useUser();

    return useMutation({
        mutationFn: userApi.loginUser,
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            setAccessToken(data.accessToken);
            setIsAuth(true);
        },
    });
};
