import { FormErrorMessage } from '@/constants/message'
import { ZodInfer } from '@/types/zod'
import { StaffSelectionEnum } from '@itsallsavvy/savvy-resuable-components'
import { z } from 'zod'

export const calendarEventActionSchema = z.object({
   title: z.string().min(1, { message: FormErrorMessage.CALENDAR_EVENT_TITLE_REQUIRED }),
   description: z.string().optional(),
   startDate: z.date({
      errorMap: (issue, { defaultError }) => ({
         message:
            issue.code === 'invalid_date' ? "That's not a date!" : FormErrorMessage.INVALID_DOB,
      }),
   }),
   endDate: z.date({
      errorMap: (issue, { defaultError }) => ({
         message:
            issue.code === 'invalid_date' ? "That's not a date!" : FormErrorMessage.INVALID_DOB,
      }),
   }),
   startTime: z.string().min(1, { message: FormErrorMessage.CALENDAR_EVENT_START_TIME_REQUIRED }),
   endTime: z.string().min(1, { message: FormErrorMessage.CALENDAR_EVENT_END_TIME_REQUIRED }),
   userIds: z.object({ label: z.string(), value: z.string() }).array().nullable(),
   allStaff: z.boolean(),
   staffSelection: z.nativeEnum(StaffSelectionEnum),
   allDay: z.boolean(),
   blockOnlineBooking: z.boolean(),
   frequency: z.string(),
})

export type CalendarEventActionValues = ZodInfer<typeof calendarEventActionSchema>
