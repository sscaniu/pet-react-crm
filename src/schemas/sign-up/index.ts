import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const appType = ['PET_GROOMING_SALON'] as const

export const signUpArgsSchema = z.object({
   firstname: z.string(),
   lastname: z.string(),
   username: z.string(),
   // email: z.string().email(),
   password: z.string(),
   appType: z.enum(appType),
   telephone: z.string(),
})

export const signUpResponseSchema = z.object({
   registrationAttemptId: z.string(),
   errorMessage: z.string().nullable(),
})

export type SignUpArgs = ZodInfer<typeof signUpArgsSchema>

export type SignUpResponse = ZodInfer<typeof signUpResponseSchema>
