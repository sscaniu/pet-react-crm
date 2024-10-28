import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const petTypeSchema = z.object({
   id: z.string(),
   version: z.string().nullable(),
   deleted: z.boolean(),
   createdBy: z.string().email().nullable(),
   createdDate: z.string().datetime().nullable(),
   lastModifiedUser: z.string().email().nullable(),
   lastModifiedDate: z.string().datetime().nullable(),
   ownerId: z.string(),
   name: z.string(),
   description: z.string().nullable(),
   colour: z.string().nullable(),
})

export const petTypesResponseSchema = z.array(petTypeSchema)

export type PetType = ZodInfer<typeof petTypeSchema>

export type PetTypesResponse = ZodInfer<typeof petTypesResponseSchema>
