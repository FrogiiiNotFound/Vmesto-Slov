import { FormButton } from "@/shared/ui/form-button";
import { Modal } from "@/shared/ui/modal";
import close from "@shared/assets/images/close.svg";

import "./LoginForm.scss";
import { useLogin } from "../model/useLoginStore";
import { useForm } from "react-hook-form";
import type { LoginFormValue } from "../model/types";
import { useRegister } from "@/widgets/register/model/useRegisterStore";
import { useLoginUser } from "@/entities/user/model/useLoginUser";
import { toast } from "sonner";

export const LoginForm = () => {
    const { isLoginOpen, toggleLogin } = useLogin();
    const { toggleRegister } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValue>();

    const { mutateAsync } = useLoginUser();

    if (!isLoginOpen) return null;

    const onSubmit = async (data: LoginFormValue) => {
        try {
            await mutateAsync(data);
            toast("Успешный вход в аккаунт!");
            toggleLogin();
        } catch (e: any) {
            const message =
                e?.response?.data?.message ||
                e?.message ||
                "Ошибка входа. Проверьте почту и пароль.";
            toast(message);
        }
    };

    return (
        <Modal>
            <div className="login">
                <div className="login__container _container">
                    <div className="login__upper-content">
                        <h2 className="login__title">Войти</h2>
                        <div
                            className="login__close"
                            onClick={() => toggleLogin()}
                        >
                            <img src={close} alt="close-button" />
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="login__form"
                    >
                        <div className="login__inputs">
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Ваша почта"
                                {...register("email", {
                                    required: "Почта обязательна",
                                })}
                            />
                            {errors?.email && (
                                <div className="error-message">
                                    {errors?.email.message}
                                </div>
                            )}
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Пароль"
                                {...register("password", {
                                    required: "Пароль обязателен",
                                })}
                            />
                            {errors?.password && (
                                <div className="error-message">
                                    {errors?.password.message}
                                </div>
                            )}
                            <div className="login__forgot-password">
                                Забыли пароль?
                            </div>
                            <FormButton text="Войти в кабинет" />
                            <div
                                onClick={() => {
                                    toggleLogin();
                                    toggleRegister();
                                }}
                                className="login__sign-in"
                            >
                                Регистрация
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};
