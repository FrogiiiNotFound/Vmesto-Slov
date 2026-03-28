import type { Product } from "@/shared/types";
import { oldPrice } from "@/shared/utils/helpers/oldPrice";

export class ProductMapper {
    static toCartItem(product: Product) {
        return {
            id: product._id as string,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            discount: product.discount,
            oldPrice: oldPrice(product),
            amount: 1,
        };
    }
}
