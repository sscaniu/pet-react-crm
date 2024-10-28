import { apiClient } from '@/fetcher/instance'
import {
   CalendarResponse,
   calendarResponseSchmea,
   LoadCalendarEntriesByRangeArgs,
   loadCalendarEntriesByRangeArgsSchema,
} from '@/schemas/calendar/calendar-schema'
import { Fetcher } from 'swr'

export const loadCalendarEntriesByRange: Fetcher<
   CalendarResponse,
   { url: string; args: LoadCalendarEntriesByRangeArgs }
> = async ({ args, url }) => {
   const argsValidationResult = loadCalendarEntriesByRangeArgsSchema.safeParse(args)
   if (!argsValidationResult.success) {
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.put(url, argsValidationResult.data)

      const responseValidationResult = calendarResponseSchmea.safeParse(data)
      if (!responseValidationResult.success) {
         //TODO: To check the schema from the api response and will be removed later
         console.error('Response validation failed:', responseValidationResult.error.errors)
      }

      return responseValidationResult.success ? responseValidationResult.data : data
   } catch (error) {
      //TODO: To check the api req error log and will be removed later
      console.log('API requset failed:', error)
      throw error
   }
}
