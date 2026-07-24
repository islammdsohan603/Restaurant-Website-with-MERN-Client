import { z } from 'zod';

export const userSignupSchema = z.object({
  fullName: z.string().min(1, 'FullName is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 charecters'),
  contact: z
    .string()
    .regex(/^[0-9]{11}/, 'Contact number must be exactly 11 digits')
    .max(11),
});

export type SignupState = z.infer<typeof userSignupSchema>;

export const userSigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 charecters'),
});

export type LoginInputState = z.infer<typeof userSigninSchema>;
