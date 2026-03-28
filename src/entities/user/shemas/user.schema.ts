import z from "zod";

export const UserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    gender: z.string(),
    contacts: z.object({
        phone: z.string(),
        email: z.string(),
    })
});

export type User = z.infer<typeof UserSchema>;
