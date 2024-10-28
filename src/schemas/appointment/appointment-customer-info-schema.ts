import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const appointmentCustomerPetInfoSchema = z.object({
   petId: z.string(),
   petName: z.string(),
   petTypeLabel: z.string(),
   petBreedLabel: z.string(),
   petSizeLabel: z.string(),
})

export type AppointmentCustomerPetType = ZodInfer<typeof appointmentCustomerPetInfoSchema>

export const appointmentCustomerInfoSchema = z.object({
   customerId: z.string(),
   customerName: z.string(),
   customerEmail: z.string(),
   customerPhoneNumber: z.string(),
   customerBalance: z.string(),
   customerCurrencyCode: z.string(),
   nameOnCard: z.string(),
   cardNumber: z.string(),
   pets: z.array(appointmentCustomerPetInfoSchema),
})

export type AppointmentCustomerInfoType = ZodInfer<typeof appointmentCustomerInfoSchema>

export type LoadAppointmentCustomerResponse = ZodInfer<typeof appointmentCustomerInfoSchema>
