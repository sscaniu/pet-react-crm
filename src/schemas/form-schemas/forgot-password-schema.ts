import { FormErrorMessage } from '@/constants/message'
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
   email: z.string().email({ message: FormErrorMessage.EMAIL_NOT_REGISTERD }),
})
