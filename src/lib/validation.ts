import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	passowrd: z.string().min(8),
})

export const registerSchema = z
	.object({
		email: z.string().email(),
		passowrd: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine(data => data.passowrd === data.confirmPassword, {
		message: 'Parol mos kelmadi',
		path: ['confirmPassword'],
	})
