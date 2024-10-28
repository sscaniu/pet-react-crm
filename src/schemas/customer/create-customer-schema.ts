import { z } from 'zod'
import { ZodInfer } from '@/types/zod'
import {
   addressSchema,
   alternateContactSchema,
   genderSchema,
   optInSchema,
   phoneNumberSchema,
} from './customer-information-schema'

export const customerActionSchema = z.object({
   firstName: z.string(),
   lastName: z.string(),
   username: z.string().email(),
   mobilePhoneNumberObj: phoneNumberSchema,
   address: addressSchema.optional(),
   optIn: optInSchema.optional(),
   gender: genderSchema.optional(),
   flags: z.array(z.string()).nullable(),
   alternateContact: alternateContactSchema.nullable(),
})

export type CreateCustomerArgs = ZodInfer<typeof customerActionSchema>
