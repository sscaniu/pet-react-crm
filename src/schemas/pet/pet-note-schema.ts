import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const petNoteSchema = z.object({
   id: z.string(),
   createdDate: z.string().refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: 'Invalid date format',
   }),
   note: z.string(),
   petName: z.string(),
})

export const pagedPetNoteSchema = z.object({
   contents: z.array(petNoteSchema),
   totalPages: z.number().int().nonnegative(),
   totalElements: z.bigint().nonnegative(),
})

export type PetNoteResponse = ZodInfer<typeof petNoteSchema>
export type PagedPetNoteResponse = ZodInfer<typeof pagedPetNoteSchema>
