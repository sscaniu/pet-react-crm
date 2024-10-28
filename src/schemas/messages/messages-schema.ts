import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const messageSchema = z.object({
   id: z.string(),
   content: z.string(),
   sentOnDay: z.string(), // EEEE, hh:mm a
   sentOnDate: z.string(), // dd MMM yyyy
})

export type MessageType = ZodInfer<typeof messageSchema>

export const messagesResponseSchema = z.array(messageSchema)

export type MessagesResponse = ZodInfer<typeof messagesResponseSchema>
