import type { Product } from "@/shared/types";
import star from "@shared/assets/images/star.svg";
import like from "@shared/assets/images/like.svg";
import minus from "@shared/assets/images/minus.svg";
import plus from "@shared/assets/images/plus.svg";
import "./MiniCard.scss";
import { Link } from "react-router-dom";
import { lengthLimit } from "@/shared/utils/helpers/lengthLimit";
import { useCartStore } from "@/entities/cart";
import { useDeleteFavourite } from "@/entities/user/model/useDeleteFavourite";
import { useAddFavourite } from "@/entities/user/model/useAddFavourite";
import { useUser } from "@/entities/user";
import { ProductMapper } from "../model/mapper";
import { useLogin } from "@/widgets/login/model/useLoginStore";
import { toast } from "sonner";
import { oldPrice } from "@/shared/utils/helpers/oldPrice";

export const MiniCard = ({
    product,
    favouriteIds,
}: {
    product: Product;
    favouriteIds: Set<string>;
}) => {
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

    return (
        <Link to={`/product/${product?._id}`} className="mini-card-link">
            <div className="mini-card">
                <div className="mini-card__img">
                    <img src={product?.image} alt="card-img" />
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            onLikeClick(product._id);
                        }}
                        className="mini-card__like"
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
                <div className="mini-card__slide-content">
                    <h3 className="mini-card__title">{lengthLimit(product?.name, 25)}</h3>
                    <div className="mini-card__rating">
                        <div className="mini-card__star">
                            <img src={star} alt="star" />
                        </div>
                        <div className="mini-card__price-container">
                            <div className="mini-card__value">
                                {product?.rating}
                            </div>
                            <div className="mini-card__number">
                                ({product?.reviews})
                            </div>
                        </div>
                    </div>
                    <p className="mini-card__desc">
                        {lengthLimit(product?.description)}
                    </p>
                    <div className="mini-card__pricing">
                        <div className="mini-card__price">
                            <div className="mini-card__new-price">
                                {product?.price} ₽
                            </div>
                            <div className="mini-card__old-price">
                                {oldPrice(product)} ₽
                            </div>
                        </div>
                        {cart.find((p) => p.id === product._id) ? (
                            <div
                                className="mini-card__amount"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <div
                                    className="mini-card__amount-decrease"
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
                                <p className="mini-card__amount-value">
                                    {cartItem?.amount || 1}
                                </p>
                                <div
                                    className="mini-card__amount-increase"
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
                                className="mini-card__btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(item);
                                }}
                            >
                                <p className="mini-card__btn-text">В корзину</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
