import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const appointmentServiceInfoSchema = z.object({
   title: z.string(),
   price: z.string(),
   scheduleTime: z.string(),
   duration: z.string(),
   petName: z.string(),
   breed: z.string(),
   groomer: z.string(),
})

export type AppointmentServiceType = ZodInfer<typeof appointmentServiceInfoSchema>

export const appointmentDayInfoSchema = z.object({
   date: z.string(),
   services: z.array(appointmentServiceInfoSchema),
})

export type AppointmentDayInfoType = ZodInfer<typeof appointmentDayInfoSchema>

export const appointmentInfoSchema = z.object({
   id: z.string(),
   balance: z.string(), // amount paid so far
   customerId: z.string(),
   customerName: z.string(),
   appointmentStatus: z.string(),
   date: z.string(),
   startEndTime: z.string(),
   petNames: z.array(z.string()),
   totalCost: z.string(), // €80.00
   taxPercent: z.number(), // 20
   depositPercent: z.number(), // 20
   invoiceStatus: z.string(),
   daysBookings: z.array(appointmentDayInfoSchema),
})

export const upcomingAppointmentSchema = z.object({
   appointmentServiceDayDtos: z.array(appointmentDayInfoSchema),
})

export type AppointmentInfoType = ZodInfer<typeof appointmentInfoSchema>

export type LoadAppointmentResponse = ZodInfer<typeof appointmentInfoSchema>

export type LoadUpcomingAppointmentsResponse = ZodInfer<typeof upcomingAppointmentSchema>
