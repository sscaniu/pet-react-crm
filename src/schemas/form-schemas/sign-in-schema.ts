import { FormErrorMessage } from '@/constants/message'
import { z } from 'zod'

export const signInSchema = z.object({
   email: z.string().email({ message: FormErrorMessage.INVALID_EMAIL }),
   password: z.string().min(1, { message: FormErrorMessage.PASSWORD_REQUIRED }),
})
