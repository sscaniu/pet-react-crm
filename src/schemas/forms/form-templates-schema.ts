import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const formTemplateSchema = z.object({
   id: z.string(),
   name: z.string(),
   type: z.string(),
   sendTo: z.string(),
   sendOn: z.string(),
   status: z.string(), // 'Active' | 'Inactive'
})

export type FormTemplate = ZodInfer<typeof formTemplateSchema>

export const formTemplatesResponseSchema = z.array(formTemplateSchema)

export type FormTemplatesResponse = ZodInfer<typeof formTemplatesResponseSchema>
