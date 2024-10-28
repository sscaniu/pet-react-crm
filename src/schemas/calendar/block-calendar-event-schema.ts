import { ZodInfer } from '@/types/zod'
import { z } from 'zod'

// Example usage of createCalendarEventSchema
// const example = {
//    timePeriodType: "DAYS",
//    blockCalendarEvent: {
//      startDateUtc: "2024-09-25T12:00:00Z",
//      endDateUtc: "2024-09-25T14:00:00Z",
//      startDate: "2024-09-25",
//      startTime: "12:00:00",
//      endDate: "2024-09-25",
//      endTime: "14:00:00"
//    }
//  };

// Schema for UserId
export const userIdSchema = z.object({
   id: z.string(),
   type: z.string(),
})

// Schema for BlockCalendarEvent
export const blockCalendarEventSchema = z.object({
   id: z.string().optional(),
   deleted: z.boolean().optional(),
   createdBy: z.string().optional(),
   createdDate: z.string().optional(), // You may want to parse this as a date if necessary
   lastModifiedUser: z.string().optional(),
   lastModifiedDate: z.string().optional(), // You may want to parse this as a date if necessary
   title: z.string(),
   description: z.string().optional(),
   startDateUtc: z.string().optional(), // You may want to parse this as a date-time
   endDateUtc: z.string().optional(), // You may want to parse this as a date-time
   startDate: z.string(), // You may want to parse this as a date
   startTime: z.string(), // You may want to parse this as a time
   endDate: z.string(), // You may want to parse this as a date
   endTime: z.string(), // You may want to parse this as a time
   ownerId: z.string().optional(), //filled in backend
   locationId: z.string(),
   userId: userIdSchema.optional(),
   userIds: z.array(userIdSchema),
   allStaff: z.boolean().optional(),
   eventColor: z.string().optional(),
   allDay: z.boolean().optional(),
   blockOnlineBooking: z.boolean().optional(),
})

export const FREQUENCY = z.enum([
   'DOES_NOT_REPEAT',
   'EVERY_DAY',
   'EVERY_WEEK',
   'EVERY_2_WEEK',
   'EVERY_3_WEEK',
   'EVERY_MONTH',
   'EVERY_YEAR',
])
// Define a mapping from enum values to labels
export const frequencyLabels: Record<FrequencyEnum, string> = {
   DOES_NOT_REPEAT: "Doesn't Repeat",
   EVERY_DAY: 'every day',
   EVERY_WEEK: 'every week',
   EVERY_2_WEEK: 'every 2 weeks',
   EVERY_3_WEEK: 'every 3 weeks',
   EVERY_MONTH: 'every month',
   EVERY_YEAR: 'every year',
}

export type FrequencyEnum = z.infer<typeof FREQUENCY>

// Schema for CreateCalendarEvent
export const createCalendarEventSchemaArgs = z.object({
   timePeriodType: z.enum(['DAYS', 'WEEKS', 'MONTHS', 'YEARS']),
   blockCalendarEvent: blockCalendarEventSchema,
})

export const addCalendarEventResponseSchema = z.object({
   blockCalendarEvent: blockCalendarEventSchema,
})

export type CreateCalendarEventArgs = ZodInfer<typeof createCalendarEventSchemaArgs>
export type BlockCalendarEventResponse = ZodInfer<typeof blockCalendarEventSchema>
export type AddCalendarEventResponse = ZodInfer<typeof addCalendarEventResponseSchema>
