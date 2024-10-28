import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const petSizeSchema = z.object({
   id: z.string(),
   name: z.string(),
   description: z.string(),
   ownerId: z.string(),
})

export type PetSize = ZodInfer<typeof petSizeSchema>

export const petSizeListSchema = z.array(petSizeSchema)

export type PetSizeListResponse = ZodInfer<typeof petSizeListSchema>
