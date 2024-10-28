import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const phoneNumberObjSchema = z.object({
   country: z.string(),
   nationalNumber: z.string(),
   internationalNumber: z.string(),
})

const fileSchema = z.object({
   fileName: z.string(),
   mimeType: z.string(),
   fileReferenceId: z.string(),
   usePublic: z.boolean(),
})

const customerFileSchema = z.object({
   fileReferenceId: z.string(),
   mimeType: z.string(),
   fileName: z.string(),
   publicBucket: z.boolean(),
})

const contactSchema = z.object({
   firstName: z.string(),
   lastName: z.string(),
   phoneNumberObj: phoneNumberObjSchema,
   mobilePhoneNumberObj: phoneNumberObjSchema,
   workPhoneNumberObj: phoneNumberObjSchema,
   whatsAppNumberObj: phoneNumberObjSchema,
})

const bespokePetServiceSchema = z.object({
   consumerServiceId: z.string(),
   serviceName: z.string(),
   description: z.string(),
   unitPrice: z.number(),
   tax: z.number(),
   taxId: z.string(),
   colour: z.string(),
   durationInMins: z.number(),
   position: z.number(),
   brandId: z.object({
      id: z.string(),
      type: z.string(),
   }),
   deleted: z.boolean(),
})

const entityDefinitionIdSchema = z.object({
   id: z.string(),
   type: z.string(),
})

export const petSchema = z.object({
   id: z.string(),
   created: z.boolean(),
   createdBy: z.string().nullish(),
   createdDate: z.string().datetime().nullish(),
   lastModifiedUser: z.string().nullish(),
   lastModifiedDate: z.string().datetime(),
   ownerId: z.string(),
   name: z.string(),
   breed: z.string(),
   breedLabel: z.string(),
   dob: z.string().date().nullish(),
   petType: z.string().nullish(),
   source: z.string().nullish(),
   entityDefinitionId: entityDefinitionIdSchema.nullish(),
   entityInstanceId: z.string().nullish(),
   recommendedVisitFrequencyInWeeks: z.number().nullish(),
   nextDueDate: z.string().date().nullish(),
   prevApptDate: z.string().date().nullish(),
   ignoreOverdue: z.boolean(),
   numOverdueMessagesSent: z.number(),
   spayedOrNeutered: z.boolean(),
   colour: z.string().nullish(),
   bitch: z.boolean(),
   vetName: z.string().nullish(),
   vetPhone: z.string().nullish(),
   petNotes: z.string().nullish(),
   customerNotes: z.string().nullish(),
   medical: z.string().nullish(),
   allergies: z.string().nullish(),
   vaccinated: z.string().nullish(),
   microChipped: z.boolean().nullish(),
   petOwnerId: z.string(),
   petOwnerFirstName: z.string(),
   petOwnerLastName: z.string(),
   blades: z.string().nullish(),
   secondPetOwnerId: z.string().nullish(),
   files: z.array(fileSchema).nullish(),
   groomPrice: z.number().nullish(),
   deceased: z.boolean(),
   customerFiles: z.array(customerFileSchema).nullish(),
   contacts: z.array(contactSchema).nullish(),
   profilePicReference: z.string().nullish(),
   coverPicReference: z.string().nullish(),
   mergedInto: z.string().nullish(),
   merged: z.boolean(),
   weight: z.number().nullish(),
   afraidOfNoises: z.boolean(),
   insured: z.boolean(),
   approvalNeeded: z.boolean(),
   bespokePetServices: z.array(bespokePetServiceSchema).nullish(),
   flags: z.array(z.string()).nullish(),
   specialConsiderations: z.string().nullish(),
   numDaysOverdue: z.number(),
   petSizeId: z.string(),
})

export const petsListSchema = z.array(petSchema)

export type PetResponse = ZodInfer<typeof petSchema>
export type PetsListResponse = ZodInfer<typeof petsListSchema>
