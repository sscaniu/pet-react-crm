import { z } from 'zod'
import { ZodInfer } from '@/types/zod'

export const linkIdSchema = z.object({
   linkedId: z.string(),
   linkedIdType: z.string(),
   linkedEdId: z.string().optional(),
})

export const noteSchema = z.object({
   id: z.string().optional(),
   version: z.number().int().optional(),
   deleted: z.boolean().optional(),
   createdBy: z.string().optional(),
   createdDate: z.string().datetime().optional(),
   lastModifiedUser: z.string().optional(),
   lastModifiedDate: z.string().datetime().optional(),
   ownerId: z.string().optional(),
   linkIds: z.array(linkIdSchema),
   note: z.string(),
   variant: z.string(),
})

export type CreateNoteArgs = ZodInfer<typeof noteSchema>
export type LinkIdResponse = ZodInfer<typeof linkIdSchema>
