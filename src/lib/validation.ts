import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email noto‘g‘ri kiritilgan' }),
  passowrd: z.string().min(8, { message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' }),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'Ism kamida 2 ta belgidan iborat bo‘lishi kerak' }),
    lastName: z
      .string()
      .min(2, { message: 'Familiya kamida 2 ta belgidan iborat bo‘lishi kerak' }),
    email: z.string().email({ message: 'Email noto‘g‘ri kiritilgan' }),
    passowrd: z.string().min(8, { message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.passowrd === data.confirmPassword, {
    message: 'Parol mos kelmadi',
    path: ['confirmPassword'],
  });
