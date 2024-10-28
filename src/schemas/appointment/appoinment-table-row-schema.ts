import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const appointmentTableRowPetSchema = z.object({
   petId: z.string(),
   name: z.string(),
   scheduleTimeRange: z.string(),
   service: z.string(),
   additionalService: z.number(),
})

export const appointmentTableRowSchema = z.object({
   id: z.string(),
   appointmentDate: z.string(),
   pets: z.array(appointmentTableRowPetSchema),
})

export const appointmentTableRowsSchema = z.array(appointmentTableRowSchema)

export type ListAppointmentHistoryResponse = ZodInfer<typeof appointmentTableRowsSchema>
