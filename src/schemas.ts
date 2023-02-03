import { z } from 'zod';

export const UserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email()
})

export type TUser = z.infer<typeof UserSchema>;