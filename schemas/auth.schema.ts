import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email().toLowerCase().trim().nonempty({ message: 'Please enter the email' }),
  password: z.string().trim().nonempty({ message: 'Please enter the password' }),
});

export const registerSchema = z
  .object({
    email: z.email().toLowerCase().trim().nonempty({ message: 'Please enter the email' }),
    password: z.string().trim().nonempty(),
    confirm_password: z.string().trim().nonempty({ message: 'Please enter the password' }),
  })
  .refine((data) => data.email != data.password, {
    message: 'Password cannot be same as email',
    path: ['password'],
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password not matching',
    path: ['confirm_password'],
  });

export const refreshSchema = z.object({
  refresh_token: z.string().trim().nonempty({ message: 'Please enter the refresh token' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RefreshFormData = z.infer<typeof refreshSchema>;
