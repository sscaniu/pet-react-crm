import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const customerActionSchema = z
   .object({
      name: z.string().min(1, { message: FormErrorMessage.NAME_REQUIRED }),
      customerMobilePrefix: z.string().optional(),
      mobile: z.string().regex(/^\d+$/, { message: FormErrorMessage.INVALID_MOBILE }),
      email: z.string().email({ message: FormErrorMessage.INVALID_EMAIL }),
      telephone: z.string(),
      address: z.string().optional(),
      gender: z.string().min(1, { message: FormErrorMessage.GENDER_REQUIRED }),
      flags: z.object({ label: z.string(), value: z.string() }).array().nullable(),
      altContactName: z.string().optional(),
      altContactEmail: z
         .string()
         .email({ message: FormErrorMessage.INVALID_EMAIL })
         .or(z.literal(''))
         .optional(),
      altContactRelationshipToPrimaryContact: z.string().optional(),
      altContactMobilePrefix: z.string().optional(),
      altContactMobile: z
         .string()
         .optional()
         .refine((value) => value === '' || /^\d+$/.test(value as any), {
            message: FormErrorMessage.INVALID_MOBILE,
         }),
      altContactTelephone: z.string().optional(),
   })
   .refine(
      (data) => {
         if (data.mobile && !data.customerMobilePrefix) {
            return false
         }
         return true
      },
      {
         message: FormErrorMessage.MOBILE_PREFIX_REQUIRED,
         path: ['mobile'],
      },
   )
   .refine(
      (data) => {
         if (data.altContactMobile && !data.altContactMobilePrefix) {
            return false
         }
         return true
      },
      {
         message: FormErrorMessage.MOBILE_PREFIX_REQUIRED,
         path: ['altContactMobile'],
      },
   )

export type CustomerActionValues = ZodInfer<typeof customerActionSchema>
