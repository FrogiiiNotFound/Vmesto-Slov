import z from "zod";

export const productSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discount: z.number(),
    rating: z.number(),
    reviews: z.number(),
    flowersCount: z.array(
        z.object({
            title: z.string(),
            value: z.union([z.string(), z.number()]),
        }),
    ),
    tags: z.array(z.string()),
    image: z.string(),
    inStock: z.boolean(),
    category: z.string(),
});

export type Product = z.infer<typeof productSchema>;
