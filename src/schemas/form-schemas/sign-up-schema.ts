import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const signUpSchema = z
   .object({
      email: z.string().email({ message: FormErrorMessage.EMAIL_REQUIRED }),
      firstname: z.string().min(1, { message: FormErrorMessage.FIRST_NAME_REQUIRED }),
      lastname: z.string().min(1, { message: FormErrorMessage.LAST_NAME_REQUIRED }),
      createPassword: z.string().min(1, { message: FormErrorMessage.PASSWORD_REQUIRED }),
      confirmPassword: z.string().min(1, { message: FormErrorMessage.PASSWORD_REQUIRED }),
      mobilePrefix: z.string().optional(),
      mobile: z
         .string()
         .optional()
         .refine((value) => value === '' || /^\d+$/.test(value as any), {
            message: FormErrorMessage.INVALID_MOBILE,
         }),
      country: z.string(),
      username: z.string(),
      telephone: z.string(),
   })
   .refine(
      (data) => {
         if (data.mobile && !data.mobilePrefix) {
            return false
         }
         return true
      },
      {
         message: FormErrorMessage.MOBILE_PREFIX_REQUIRED,
         path: ['mobile'],
      },
   )

export type SignUpFormValues = ZodInfer<typeof signUpSchema>
