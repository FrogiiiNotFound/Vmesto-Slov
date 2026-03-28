import { useDeleteAddress } from "@/entities/user/model/useDeleteAddress";
import { useGetAddresses } from "@/entities/user/model/useGetAddreses";
import trashBin from "@shared/assets/images/bin.svg";
import { Menu } from "@widgets/menu";
import { useEffect, useState } from "react";
import { useAddAddress } from "../../../entities/user/model/useAddAddress";
import "./Settings.scss";
import { useUser } from "@/entities/user";
import { YandexMapPicker } from "./YandexMapPicker";
import { useGetUser } from "@/entities/user/model/useGetUser";
import { useForm } from "react-hook-form";
import type { changeUserInfoFormValue } from "../model/types";
import { useChangeUserInfo } from "@/entities/user/model/useChangeUserInfo";
import { toast } from "sonner";

export const Settings = () => {
    const [addressInputOpen, setAddressInputOpen] = useState(false);
    const { mutate } = useAddAddress();
    const { mutate: deleteAddress } = useDeleteAddress();
    const { data, error, isLoading } = useGetAddresses();
    const { selectedAddress, setSelectedAddress } = useUser();

    const { mutate: changeUserInfo } = useChangeUserInfo();
    const { data: user } = useGetUser();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<changeUserInfoFormValue>();

    const handleConfirmAddress = (address: string) => {
        mutate(address);
        setAddressInputOpen(false);
    };

    const onSubmit = (data: any) => {
        changeUserInfo(data);
        toast("Данные изменены");
    };

    useEffect(() => {
        if (user?.data) {
            reset({
                name: user.data.name,
                surname: user.data.surname,
                phone: user.data.phone,
                email: user.data.email,
            });
        }
    }, [user, reset]);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="user">
            <div className="user__container _container">
                <h2 className="user__title title">Профиль</h2>
                <div className="user__content main-content">
                    <Menu />
                    <div className="user__settings">
                        <div className="user__info-wrapper">
                            <h3 className="user__title">
                                Личные данные пользователя
                            </h3>
                            <form
                                className="user__form"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <fieldset className="user__item">
                                    <legend className="user__item-title">
                                        Личная информация
                                    </legend>

                                    <div className="user__input-wrapper">
                                        <label
                                            htmlFor=""
                                            className="user__label"
                                        >
                                            Имя*
                                        </label>
                                        <input
                                            type="text"
                                            className="user__input"
                                            placeholder={user?.data.name}
                                            {...register("name")}
                                        />
                                        {errors?.name && (
                                            <div className="error-message">
                                                {errors?.name.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user__input-wrapper">
                                        <label
                                            htmlFor=""
                                            className="user__label"
                                        >
                                            Фамилия
                                        </label>
                                        <input
                                            type="text"
                                            className="user__input"
                                            placeholder={
                                                user?.data.surname
                                                    ? user?.data.surname
                                                    : "Введите вашу фамилию"
                                            }
                                            {...register("surname")}
                                        />
                                        {errors?.surname && (
                                            <div className="error-message">
                                                {errors?.surname.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user__radiobtns">
                                        <div className="user__radio-btn-wrapper">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="male"
                                                className="user__radio-btn"
                                            />
                                            <label
                                                htmlFor="male"
                                                className="user__radio-btn-text"
                                            >
                                                Мужской пол
                                            </label>
                                        </div>
                                        <div className="user__radio-btn-wrapper">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="female"
                                                defaultChecked={true}
                                                className="user__radio-btn"
                                            />
                                            <label
                                                htmlFor="female"
                                                className="user__radio-btn-text"
                                            >
                                                Женский пол
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="user__item">
                                    <legend className="user__item-title">
                                        Контактная информация
                                    </legend>
                                    <div className="user__input-wrapper">
                                        <label
                                            htmlFor=""
                                            className="user__label"
                                        >
                                            Номер телефона
                                        </label>
                                        <input
                                            type="text"
                                            className="user__input"
                                            placeholder="Введите номер телефона"
                                            {...register("phone")}
                                        />
                                        {errors?.phone && (
                                            <div className="error-message">
                                                {errors?.phone.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user__input-wrapper">
                                        <label
                                            htmlFor=""
                                            className="user__label"
                                        >
                                            Email*
                                        </label>
                                        <input
                                            type="text"
                                            className="user__input"
                                            placeholder="Введите вашу почту"
                                            {...register("email")}
                                        />
                                        {errors?.email && (
                                            <div className="error-message">
                                                {errors?.email.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user__input-wrapper">
                                        <label
                                            htmlFor=""
                                            className="user__label"
                                        >
                                            Пароль
                                        </label>
                                        <input
                                            type="text"
                                            className="user__input"
                                            {...register("password")}
                                        />
                                        {errors?.password && (
                                            <div className="error-message">
                                                {errors?.password.message}
                                            </div>
                                        )}
                                    </div>
                                </fieldset>
                                <button className="user__button">
                                    Сохранить изменения
                                </button>
                            </form>
                        </div>
                        <div className="user__addresses">
                            <h2 className="user__addresses-title">
                                Адрес доставки
                            </h2>
                            <div className="user__addresses-container">
                                {data.data.length !== 0 ? (
                                    data.data.map(
                                        (address: string, index: number) => (
                                            <div
                                                className="user__addresses-address"
                                                key={index}
                                            >
                                                <label className="user__address-address-wrapper">
                                                    <div className="user__addresses-address-input-wrapper">
                                                        <input
                                                            type="radio"
                                                            id={address}
                                                            name="address"
                                                            value={address}
                                                            checked={
                                                                selectedAddress ===
                                                                address
                                                            }
                                                            onChange={() =>
                                                                setSelectedAddress(
                                                                    address,
                                                                )
                                                            }
                                                            className="user__address-radio-btn"
                                                        />
                                                    </div>
                                                    <div className="user__addresses-address-info">
                                                        <p className="user__addresses-address-name">
                                                            {address}
                                                        </p>
                                                        <p className="user__addresses-address-delivery">
                                                            Бесплатная доставка
                                                            от 2000 ₽
                                                        </p>
                                                    </div>
                                                </label>
                                                <div
                                                    className="user__addresses-address-bin"
                                                    onClick={() =>
                                                        deleteAddress(index)
                                                    }
                                                >
                                                    <img
                                                        src={trashBin}
                                                        alt="trash-bin"
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <div className="user__addresses-not-found">
                                        Нет сохраненных адресов доставки
                                    </div>
                                )}
                            </div>
                            {addressInputOpen && (
                                <YandexMapPicker
                                    onConfirm={handleConfirmAddress}
                                    onClose={() => setAddressInputOpen(false)}
                                />
                            )}
                            <div
                                className="user__addresses-add-address"
                                onClick={() =>
                                    setAddressInputOpen(!addressInputOpen)
                                }
                            >
                                <p>Добавить адрес</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
