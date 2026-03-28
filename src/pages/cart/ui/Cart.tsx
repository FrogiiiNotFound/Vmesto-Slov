import { useCartStore } from "@/entities/cart/model/useCartStore";
import { type CartItem as TCartItem } from "@/entities/cart/model/types";
import "./Cart.scss";
import { CartItem } from "./CartItem";
import { useAddOrder } from "@/entities/user/model/useAddOrder";
import { useUser } from "@/entities/user";
import { toast } from "sonner";
import { useGetAddresses } from "@/entities/user/model/useGetAddreses";
import { useAddAddress } from "@/entities/user/model/useAddAddress";
import { YandexMapPicker } from "@/pages/settings/ui/YandexMapPicker";
import { useState } from "react";

export const Cart = () => {
    const { cart, removeFromCart } = useCartStore();
    const { selectedAddress, setSelectedAddress } = useUser();
    const { mutate: addOrder, isPending } = useAddOrder();
    const { data: addressesData } = useGetAddresses();
    const { mutate: addAddress } = useAddAddress();
    const [addressInputOpen, setAddressInputOpen] = useState(false);

    const handleConfirmAddress = (address: string) => {
        addAddress(address);
        setAddressInputOpen(false);
    };

    const priceWithoutDiscount = cart.reduce(
        (sum, item) => sum + item.oldPrice * item.amount,
        0,
    );
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.amount,
        0,
    );
    const discount = priceWithoutDiscount - totalPrice;

    const handleOrder = () => {
        if (!selectedAddress) {
            toast("Выберите адрес доставки");
            return;
        }
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const delivery_date = tomorrow.toISOString().split("T")[0];

        addOrder(
            {
                address: selectedAddress,
                total_price: String(totalPrice),
                delivery_date,
                items: cart.map((item) => ({
                    product_id: item.id,
                    quantity: item.amount,
                    price: item.price,
                })),
            },
            {
                onSuccess: () => {
                    cart.forEach((item) => removeFromCart(item.id));
                    toast("Заказ успешно оформлен!");
                },
                onError: () => toast("Ошибка при оформлении заказа"),
            },
        );
    };

    return (
        <div className="cart">
            <div className="cart__container _container">
                <h2 className="cart__title title">Корзина</h2>
                {cart.length > 0 ? (
                    <div className="cart__content">
                        <div className="cart__purchases">
                            {cart?.map((product: TCartItem) => (
                                <CartItem product={product} />
                            ))}
                        </div>
                        <div className="cart__price">
                            <h3 className="cart__price-title">
                                Оформление заказа
                            </h3>
                            <div className="cart__cost">
                                <p className="cart__cost-title">
                                    Стоимость товаров
                                </p>
                                <p className="cart__cost-value">
                                    {priceWithoutDiscount} ₽
                                </p>
                            </div>
                            <div className="cart__delivery">
                                <p className="cart__delivery-title">Доставка</p>
                                <p className="cart__delivery-value">
                                    Бесплатно
                                </p>
                            </div>
                            <div className="cart__discount">
                                <p className="cart__discount-title">Скидка</p>
                                <p className="cart__dicount-value">
                                    - {discount} ₽{" "}
                                </p>
                            </div>
                            <div className="cart__final-price">
                                <p className="cart__final-price-title">Итого</p>
                                <p className="cart__final-price-value">
                                    {totalPrice} ₽
                                </p>
                            </div>
                            <div className="cart__bonus">
                                <p className="cart__bonus-title">
                                    Вернется бонусами
                                </p>
                                <p className="cart__bonus-value">
                                    + {Math.floor(totalPrice * 0.05)} ₽
                                </p>
                            </div>
                            <div className="cart__addresses">
                                <p className="cart__addresses-title">Адрес доставки</p>
                                {addressesData?.data?.length > 0 ? (
                                    addressesData?.data.map((address: string, index: number) => (
                                        <label key={index} className="cart__address">
                                            <input
                                                type="radio"
                                                name="address"
                                                value={address}
                                                checked={selectedAddress === address}
                                                onChange={() => setSelectedAddress(address)}
                                            />
                                            <span>{address}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="cart__addresses-empty">Нет сохранённых адресов</p>
                                )}
                                {addressInputOpen && (
                                    <YandexMapPicker
                                        onConfirm={handleConfirmAddress}
                                        onClose={() => setAddressInputOpen(false)}
                                    />
                                )}
                                <div
                                    className="cart__addresses-add"
                                    onClick={() => setAddressInputOpen(!addressInputOpen)}
                                >
                                    <p>Добавить адрес</p>
                                </div>
                            </div>
                            <div
                                className="cart__btn"
                                onClick={handleOrder}
                            >
                                <div className="cart__btn-text">
                                    {isPending ? "Оформляем..." : "Оформить заказ"}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cart__empty">
                        Вы еще не добавили предметов в корзину
                    </div>
                )}
            </div>
        </div>
    );
};
