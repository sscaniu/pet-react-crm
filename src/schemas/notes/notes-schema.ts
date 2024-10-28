import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const noteSchema = z.object({
   id: z.string(),
   createdDate: z.string().refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: 'Invalid date format',
   }),
   note: z.string(),
   customerName: z.string(),
   petName: z.string(),
})

export const pagedNoteSchema = z.object({
   contents: z.array(noteSchema),
   totalPages: z.number().int().nonnegative(),
   totalElements: z.number().nonnegative(),
})

export const updateNoteSchema = z.object({
   id: z.string().optional(),
   note: z.string(),
})

export type UpdateNoteArgs = ZodInfer<typeof updateNoteSchema>
export type NoteResponse = ZodInfer<typeof noteSchema>
export type PagedNoteResponse = ZodInfer<typeof pagedNoteSchema>
