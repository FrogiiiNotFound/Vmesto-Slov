import { useCartStore } from "@/entities/cart";
import { useAddFavourite } from "@/entities/user/model/useAddFavourite";
import { useDeleteFavourite } from "@/entities/user/model/useDeleteFavourite";
import type { Product } from "@/shared/types";
import { lengthLimit } from "@/shared/utils/helpers/lengthLimit";
import like from "@shared/assets/images/like.svg";
import minus from "@shared/assets/images/minus.svg";
import plus from "@shared/assets/images/plus.svg";
import { Link } from "react-router-dom";
import { ProductMapper } from "../model/mapper";
import "./SmallCard.scss";
import { oldPrice } from "@/shared/utils/helpers/oldPrice";

export const SmallCard = ({
    product,
    favouriteIds,
}: {
    product: Product;
    favouriteIds: Set<string>;
}) => {
    const { cart, addToCart, increaseAmount, decreaseAmount, removeFromCart } = useCartStore();
    const { mutate: removeUserFavourite } = useDeleteFavourite();
    const { mutate: addUserFavourite } = useAddFavourite();

    const item = ProductMapper.toCartItem(product);
    const cartItem = cart.find((i) => i.id === product._id);
    const isLiked = favouriteIds.has(product._id);

    const onLikeClick = (itemId: string) => {
        if (isLiked) {
            removeUserFavourite(itemId);
        } else {
            addUserFavourite(itemId);
        }
    };

    return (
        <Link to={`/product/${product._id}`} className="small-card-link">
            <div className="small-card">
                <div className="small-card__img">
                    <img src={product?.image} alt="card-img" />
                </div>
                <div className="small-card__content">
                    <h3 className="small-card__title">
                        {lengthLimit(product?.name, 30)}
                    </h3>
                    <p className="small-card__text">
                        {lengthLimit(product?.description)}
                    </p>
                    <div className="small-card__bottom">
                        <div className="small-card__pricing">
                            <p className="small-card__new-price">
                                {product?.price} ₽
                            </p>
                            <p className="small-card__old-price">
                                {oldPrice(product)} ₽
                            </p>
                        </div>
                        {cartItem ? (
                            <div
                                className="small-card__amount"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            >
                                <div
                                    className="small-card__amount-decrease"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        cartItem.amount > 1 ? decreaseAmount(product._id) : removeFromCart(product._id);
                                    }}
                                >
                                    <img src={minus} alt="minus" />
                                </div>
                                <p className="small-card__amount-value">{cartItem.amount}</p>
                                <div
                                    className="small-card__amount-increase"
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(item);
                                }}
                                className="small-card__btn"
                            >
                                <p className="small-card__btn-text">В корзину</p>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        onLikeClick(product._id);
                    }}
                    className="small-card__like"
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
