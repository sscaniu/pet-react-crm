import { FormErrorMessage } from '@/constants/message'
import { z } from 'zod'

export const changePasswordSchema = z.object({
   password: z.string().min(1, { message: FormErrorMessage.PASSWORD_REQUIRED }),
   confirmPassword: z.string().min(1, { message: FormErrorMessage.PASSWORD_REQUIRED }),
})
