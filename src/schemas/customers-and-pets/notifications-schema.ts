import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const notificationSchema = z.object({
   title: z.string(),
   description: z.string(),
   dateIssued: z.string(),
})

export type Notification = ZodInfer<typeof notificationSchema>

export const notificationsResponseSchema = z.array(notificationSchema)

export type NotificationsResponse = ZodInfer<typeof notificationsResponseSchema>
