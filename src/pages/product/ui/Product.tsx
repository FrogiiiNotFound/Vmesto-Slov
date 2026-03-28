import { productsApi } from "@/entities/product/api/products";
import { useCartStore } from "@/entities/cart";
import { useAddFavourite } from "@/entities/user/model/useAddFavourite";
import { useDeleteFavourite } from "@/entities/user/model/useDeleteFavourite";
import { useGetFavourites } from "@/entities/user/model/useGetFavourites";
import { oldPrice } from "@/shared/utils/helpers/oldPrice";
import like from "@shared/assets/images/like.svg";
import share from "@shared/assets/images/share.svg";
import star from "@shared/assets/images/star.svg";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./Product.scss";
import { toast } from "sonner";

export const Product = () => {
    const { id } = useParams();
    if (!id) return <Navigate to={"/404"} replace />;

    const [product, setProduct] = useState<any>(null);
    const { cart, addToCart, increaseAmount, decreaseAmount, removeFromCart } = useCartStore();
    const { data: favourites } = useGetFavourites();
    const { mutate: addFavourite } = useAddFavourite();
    const { mutate: deleteFavourite } = useDeleteFavourite();

    const cartItem = cart.find((i) => i.id === id);
    const isLiked = favourites?.data?.some((f: any) => String(f._id) === id);

    useEffect(() => {
        productsApi.getProductById(id).then((res: any) => setProduct(res.data));
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLike = () => {
        if (isLiked) {
            deleteFavourite(id);
        } else {
            addFavourite(id);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast("Ссылка скопирована");
    };

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product._id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            oldPrice: oldPrice(product),
            amount: 1,
        });
    };

    return (
        <div className="product">
            <div className="product__container _container">
                <div className="product__upper-content">
                    <div className="product__perks">
                        <div className="product__perk">Выгодно</div>
                    </div>
                    <div className="product__title-wrapper">
                        <h2 className="product__title">{product?.name}</h2>
                        <div className="product__icons">
                            <div className="product__icon" onClick={handleLike} style={{ cursor: "pointer" }}>
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
                            <div className="product__icon" onClick={handleShare} style={{ cursor: "pointer" }}>
                                <img src={share} alt="share" />
                            </div>
                        </div>
                    </div>
                    <div className="product__reviews">
                        <div className="product__review-img">
                            <img src={star} alt="star" />
                        </div>
                        <div className="product__review-info">
                            <div className="product__review-value">
                                {product?.rating}
                            </div>
                            <div className="product__review-amount">
                                {product?.reviews} отзывов
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__content">
                    <div className="product__img">
                        <img src={product?.image} alt="product-img" />
                    </div>
                    <div className="product__info">
                        <div className="product__price-wrapper">
                            <div className="product__price-pricing">
                                <div className="product__new-price">
                                    {product?.price} ₽
                                </div>
                                <div className="product__old-price">
                                    {oldPrice(product)} ₽
                                </div>
                            </div>
                            <div className="product__discount">
                                -{product?.discount}%
                            </div>
                        </div>
                        <div className="product__in-stock">
                            {product?.inStock ? "Есть в наличии" : "Товар закончился"}
                        </div>
                        <div className="product__desc-wrapper">
                            <h3 className="product__desc-title">Описание</h3>
                            <p className="product__desc">{product?.description}</p>
                        </div>
                        <div className="product__comp-wrapper">
                            <h3 className="product__comp-title">Состав</h3>
                            <div className="product__comp-list">
                                {product?.flowersCount?.map((flower: any) => (
                                    <div
                                        key={`${product?._id ?? product?.id}-${flower?.title ?? ""}`}
                                        className="product__comp-item"
                                    >
                                        {flower.title} - {flower.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {cartItem ? (
                            <div className="product__amount">
                                <div className="product__amount-decrease" onClick={() => cartItem.amount > 1 ? decreaseAmount(id) : removeFromCart(id)}>−</div>
                                <span className="product__amount-value">{cartItem.amount}</span>
                                <div className="product__amount-increase" onClick={() => increaseAmount(id)}>+</div>
                            </div>
                        ) : (
                            <div className="product__btn" onClick={handleAddToCart}>Добавить в корзину</div>
                        )}
                    </div>
                </div>
                <Link to={"/"}>
                    <div className="product__btn-back">Вернутся назад</div>
                </Link>
            </div>
        </div>
    );
};
