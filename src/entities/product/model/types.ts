import z from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
});
