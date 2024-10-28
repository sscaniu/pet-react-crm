import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const phoneNumberSchema = z.object({
   country: z.string().nullish(),
   nationalNumber: z.string().nullish(),
   internationalNumber: z.string().nullish(),
})

export const addressSchema = z.object({
   label: z.string().nullish(),
   googlePlacesAddress: z.string().nullish(),
   address1: z.string().nullish(),
   address2: z.string().nullish(),
   address3: z.string().nullish(),
   city: z.string().nullish(),
   state: z.string().nullish(),
   zipCode: z.string().nullish(),
   country: z.string().nullish(),
   latitude: z.string().nullish(),
   longitude: z.string().nullish(),
   directions: z.string().nullish(),
})

export const optInSchema = z.object({
   allowEmailMarketing: z.boolean(),
   allowWhatsAppMarketing: z.boolean(),
   allowSmsMarketing: z.boolean(),
   allowEmail: z.boolean(),
   allowWhatApp: z.boolean(),
   allowSms: z.boolean(),
})

const fileSchema = z.object({
   fileReferenceId: z.string().nullable(),
   mimeType: z.string().nullable(),
   fileName: z.string().nullable(),
   publicBucket: z.boolean().nullable(),
})

export const genderSchema = z.enum(['MALE', 'FEMALE', 'OTHER'])
export const altGenderSchema = z.enum(['MALE', 'FEMALE', 'UNKNOWN'])

export const alternateContactSchema = z.object({
   firstName: z.string().nullish(),
   lastName: z.string().nullish(),
   email: z
      .string()
      .email({ message: FormErrorMessage.INVALID_EMAIL })
      .or(z.literal(''))
      .optional(),
   phoneNumber: phoneNumberSchema.nullish(),
   relationshipToPrimaryContact: z.string().nullish(),
})

export const customerSchema = z.object({
   id: z.string(),
   version: z.number().nullable(),
   deleted: z.boolean(),
   createdBy: z.string().nullable(),
   createdDate: z.string().nullable(),
   lastModifiedUser: z.string().nullable(),
   lastModifiedDate: z.string().datetime().nullable(),
   archivedDate: z.string().datetime().nullable(),
   invitedViaEmailDate: z.string().datetime().nullable(),
   formSubmittedDate: z.string().datetime().nullable(),
   ownerId: z.string(),
   userId: z.string().nullable(),
   companyName: z.string().nullable(),
   emailVerified: z.boolean(),
   companyNumber: phoneNumberSchema.nullable(),
   companyPhoneNumber: phoneNumberSchema.nullable(),
   address: addressSchema,
   altAddresses: z.array(addressSchema).nullable(),
   notes: z.string().nullable(),
   customerSource: z.string().nullable(),
   externalCustomerId: z.string().nullable(),
   banned: z.boolean(),
   firstName: z.string(),
   lastName: z.string(),
   phoneNumberObj: phoneNumberSchema.nullable(),
   mobilePhoneNumberObj: phoneNumberSchema.nullable(),
   workPhoneNumberObj: phoneNumberSchema.nullable(),
   whatsAppNumberObj: phoneNumberSchema.nullable(),
   username: z.string(),
   onboarded: z.boolean(),
   approvalNeeded: z.boolean(),
   profilePicReference: z.string().nullable(),
   coverPicReference: z.string().nullable(),
   files: z.array(fileSchema).nullable(),
   mergedInto: z.string().nullable(),
   optIn: optInSchema,
   flags: z.array(z.string()).nullable(),
   languageCode: z.string().nullable(),
   gender: genderSchema.nullable(),
   customerId: z.object({
      id: z.string(),
      type: z.string(),
   }),
   alternateContact: alternateContactSchema.nullable(),
})

export type CustomerInformationResponse = ZodInfer<typeof customerSchema>
