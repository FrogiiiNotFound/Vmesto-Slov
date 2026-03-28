import bin from "@shared/assets/images/bin.svg";
import minus from "@shared/assets/images/minus.svg";
import plus from "@shared/assets/images/plus.svg";

import type { CartItem as TCardItem } from "@/entities/cart/model/types";
import { useCartStore } from "@/entities/cart/model/useCartStore";
import "./CartItem.scss";
import { lengthLimit } from "@/shared/utils/helpers/lengthLimit";

const limit = window.innerWidth <= 528 ? 100 : 150;
const titleLimit = window.innerWidth <= 528 ? 30 : 150;

export const CartItem = ({ product }: { product: TCardItem }) => {
    const { removeFromCart, increaseAmount, decreaseAmount } = useCartStore();
    return (
        <div className="purchase">
            <div className="purchase__img">
                <img src={product.image} alt="purchase__img" />
            </div>
            <div className="purchase__content">
                <div>
                    <h3 className="purchase__title">
                        {lengthLimit(product.name, titleLimit)}
                    </h3>
                    <p className="purchase__text">
                        {lengthLimit(product.description, limit)}
                    </p>
                </div>
                <div className="purchase__bottom">
                    <div className="purchase__amount">
                        <div
                            className="purchase__amount-decrease"
                            onClick={() =>
                                product.amount > 1
                                    ? decreaseAmount(product.id)
                                    : removeFromCart(product.id)
                            }
                        >
                            <img src={minus} alt="minus" />
                        </div>
                        <p className="purchase__amount-value">
                            {product.amount}
                        </p>
                        <div
                            className="purchase__amount-increase"
                            onClick={() => increaseAmount(product.id)}
                        >
                            <img src={plus} alt="plus" />
                        </div>
                    </div>
                    <div className="purchase__pricing">
                        <p className="purchase__new-price">
                            {product.price * product.amount} ₽
                        </p>
                        <div className="purchase__old-price">
                            {product.oldPrice * product.amount} ₽
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="purchase__remove"
                onClick={() => removeFromCart(product.id)}
            >
                <img src={bin} alt="remove" />
            </div>
        </div>
    );
};
