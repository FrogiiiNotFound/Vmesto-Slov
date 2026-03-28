import { SmallCard } from "@/entities/product";
import type { Product } from "@/shared/types";
import "./Favourites.scss";
import { Menu } from "@widgets/menu";
import { useGetFavourites } from "@/entities/user/model/useGetFavourites";
import { useMemo } from "react";

export const Favourites = () => {
    const { data } = useGetFavourites();

    const favouriteIds = useMemo<Set<string>>(
        () => new Set(data?.data?.map((fav: any) => String(fav._id)) || []),
        [data],
    );

    return (
        <div className="favourites">
            <div className="favourites__container _container">
                <h2 className="favourites__title title">Профиль</h2>
                <div className="favourites__content main-content">
                    <Menu />
                    <div className="favourites__info-wrapper">
                        <h2 className="favourites__title title">Избранное</h2>
                        <div className="favourites__cards">
                            {data?.data.length === 0 ? (
                                <div>Нет избранных товаров</div>
                            ) : (
                                data?.data.map((product: Product) => (
                                    <SmallCard
                                        key={product._id}
                                        product={product}
                                        favouriteIds={favouriteIds}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
