import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

export const appointmentDataSchema = z.object({
   serviceId: z.string(),
   eventType: z.string().nullable(),
   startDate: z.date().nullable(),
   endDate: z.date().nullable(),
   startTime: z.string(),
   endTime: z.string(),
   customerName: z.string(),
   customerFlags: z.array(z.string()).nullable(),
   petFlags: z.array(z.string()).nullable(),
   status: z.string(),
   invoiceTotal: z.number(),
   petName: z.string(),
   petType: z.string(),
   petBreed: z.string(),
   serviceName: z.string(),
   serviceUser: z.string(),
})

export const blockCalendarEventSchema = z.object({
   id: z.string(),
   title: z.string(),
   description: z.string(),
   startDateTimeString: z.string(),
   endDateTimeString: z.string(),
   userIds: z.array(z.string()),
   allStaff: z.boolean(),
   allDay: z.boolean(),
   blockOnlineBooking: z.boolean(),
})

export const calendarEntrySchema = z.object({
   id: z.string(),
   title: z.string(),
   startDateTimeString: z.string(),
   endDateTimeString: z.string(),
   data: appointmentDataSchema,
})

export const calendarResponseSchmea = z.object({
   appointments: z.array(calendarEntrySchema),
   events: z.array(blockCalendarEventSchema),
})

export const loadCalendarEntriesByRangeArgsSchema = z.object({
   start: z.string(),
   end: z.string(),
   filterLocations: z.array(z.string()).optional(),
   filterUserIds: z.string().optional(),
})

export type CalendarEntryResponse = ZodInfer<typeof calendarEntrySchema>
export type CalendarResponse = ZodInfer<typeof calendarResponseSchmea>
export type LoadCalendarEntriesByRangeArgs = ZodInfer<typeof loadCalendarEntriesByRangeArgsSchema>
export type CalendarAppointmentData = ZodInfer<typeof appointmentDataSchema>
