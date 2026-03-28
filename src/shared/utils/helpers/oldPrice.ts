import type { Product } from "@/shared/types";

export const oldPrice = (product: Product) => {
    return product?.price + Math.round((product?.discount / 100) * product?.price);
}
