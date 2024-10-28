import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

const appointmentNoteSchema = z.object({
   id: z.string(),
   createdDate: z.string().refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: 'Invalid date format',
   }),
   note: z.string(),
   petName: z.string(),
})

export const pagedAppointmentNoteSchema = z.object({
   contents: z.array(appointmentNoteSchema),
   totalPages: z.number().int().nonnegative(),
   totalElements: z.bigint().nonnegative(),
})

export type AppointmentNoteResponse = ZodInfer<typeof appointmentNoteSchema>
export type PagedAppointmentNoteResponse = ZodInfer<typeof pagedAppointmentNoteSchema>
