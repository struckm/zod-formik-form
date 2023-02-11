import { z } from 'zod';

export const UserSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required." }),
    lastName: z.string().min(1, { message: "Last Name is required." }),
    email: z.string().email().min(1, { message: "Email is required." })
})


export type TUser = z.infer<typeof UserSchema>;