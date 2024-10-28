import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const dataItemSchema = z.object({
   name: z.string(),
   label: z.string(),
})

const idSchema = z.object({
   id: z.string(),
   type: z.string(),
})

export const breedsResponseSchema = z.object({
   id: z.string(),
   version: z.string().nullable(),
   deleted: z.boolean(),
   createdDate: z.string().datetime().nullable(),
   lastModifiedDate: z.string().datetime().nullable(),
   lastModifiedBy: z.string().email().nullable(),
   name: z.string(),
   description: z.string().nullable(),
   ownerId: z.string(),
   dataItems: z.array(dataItemSchema),
   dataListId: idSchema,
   elementId: idSchema,
})

export type BreedType = ZodInfer<typeof dataItemSchema>

export type BreedsResponse = ZodInfer<typeof breedsResponseSchema>
