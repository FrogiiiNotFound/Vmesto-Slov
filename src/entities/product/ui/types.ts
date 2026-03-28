import type { Product } from "@/shared/types";

export type CardProps = {
    product: Product;
    favouriteIds: Set<string>;
};
