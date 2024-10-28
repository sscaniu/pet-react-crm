import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const appointmentInvoiceLineSchema = z.object({
   id: z.string(),
   description: z.string(),
   unitPrice: z.string(), // $30.00
   qty: z.string(),
   discount: z.string(),
   amount: z.string(), // $30.00
})

export type AppointmentInvoiceItem = ZodInfer<typeof appointmentInvoiceLineSchema>

export const appointmentInvoiceInfoSchema = z.array(appointmentInvoiceLineSchema)

export type LoadAppointmentInvoiceResponse = ZodInfer<typeof appointmentInvoiceInfoSchema>
