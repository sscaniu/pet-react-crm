import { FormStatusEnum } from '@/types/utils'
import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const formsSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.nativeEnum(FormStatusEnum).nullable(),
   completedOn: z.string(),
   sentOn: z.string(),
   createdOn: z.string(),
})

export const formsResponseSchema = z.array(formsSchema)

export type FormsResponse = ZodInfer<typeof formsResponseSchema>
