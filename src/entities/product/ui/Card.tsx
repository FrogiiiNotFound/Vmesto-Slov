import { useCartStore } from "@/entities/cart";
import { useUser } from "@/entities/user";
import { useAddFavourite } from "@/entities/user/model/useAddFavourite";
import { useDeleteFavourite } from "@/entities/user/model/useDeleteFavourite";
import { oldPrice } from "@/shared/utils/helpers/oldPrice";
import { useLogin } from "@/widgets/login/model/useLoginStore";
import like from "@shared/assets/images/like.svg";
import minus from "@shared/assets/images/minus.svg";
import plus from "@shared/assets/images/plus.svg";
import star from "@shared/assets/images/star.svg";
import { Link } from "react-router-dom";
import { ProductMapper } from "../model/mapper";
import "./Card.scss";
import type { CardProps } from "./types";
import { toast } from "sonner";
import { lengthLimit } from "@/shared/utils/helpers/lengthLimit";

export const Card: React.FC<CardProps> = ({ product, favouriteIds }) => {
    const { toggleLogin } = useLogin();

    const { cart, decreaseAmount, increaseAmount, removeFromCart, addToCart } =
        useCartStore();
    const { mutate: removeUserFavourite } = useDeleteFavourite();
    const { mutate: addUserFavourite } = useAddFavourite();
    const { accessToken } = useUser();

    const item = ProductMapper.toCartItem(product);

    const cartItem = cart.find((item) => item.id === product?._id);

    const isLiked = favouriteIds.has(product._id);

    const onLikeClick = (itemId: string) => {
        if (!accessToken) {
            toggleLogin();
            toast("Требуется вход или регистрация");
            return;
        }
        if (isLiked) {
            return removeUserFavourite(itemId);
        }

        addUserFavourite(itemId);
    };

    const limit = window.innerWidth < 530 ? 25 : 30;
    const descLimit = window.innerWidth < 530 ? 50 : 70;

    return (
        <Link to={`/product/${product?._id}`} className="card-link">
            <div className="card">
                <div className="card__img">
                    <img src={product?.image} alt="card-img" />
                </div>
                <div className="card__content">
                    <div className="card__info">
                        <h3 className="card__slide-title">
                            {lengthLimit(product?.name, limit)}
                        </h3>
                        <div className="card__rating">
                            <div className="card__star">
                                <img src={star} alt="star" />
                            </div>
                            <div className="card__price-container">
                                <div className="card__value">
                                    {product?.rating}
                                </div>
                                <div className="card__number">
                                    ({product?.reviews})
                                </div>
                            </div>
                        </div>
                        <p className="card__desc">
                            {lengthLimit(product?.description, descLimit)}
                        </p>
                    </div>
                    <div className="card__pricing">
                        <div className="card__price">
                            <p className="card__new-price">
                                {product?.price} ₽
                            </p>
                            <p className="card__old-price">
                                {oldPrice(product)} ₽
                            </p>
                        </div>
                        {cart.find((p) => p.id === product._id) ? (
                            <div
                                className="card__amount"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <div
                                    className="card__amount-decrease"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        if (!cartItem) return;

                                        if (cartItem.amount > 1) {
                                            decreaseAmount(product._id);
                                        } else {
                                            removeFromCart(product._id);
                                        }
                                    }}
                                >
                                    <img src={minus} alt="minus" />
                                </div>
                                <p className="card__amount-value">
                                    {cartItem?.amount || 1}
                                </p>
                                <div
                                    className="card__amount-increase"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        increaseAmount(product._id);
                                    }}
                                >
                                    <img src={plus} alt="plus" />
                                </div>
                            </div>
                        ) : (
                            <div
                                className="card__btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(item);
                                }}
                            >
                                <p className="card__btn-text">В корзину</p>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        onLikeClick(product._id);
                    }}
                    className="card__like"
                >
                    <img
                        src={like}
                        alt="like"
                        style={{
                            filter: isLiked
                                ? "invert(74%) sepia(24%) saturate(631%) hue-rotate(326deg) brightness(105%) contrast(101%)"
                                : "none",
                        }}
                    />
                </div>
            </div>
        </Link>
    );
};
