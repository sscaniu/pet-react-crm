import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import {
   appointmentInfoSchema,
   LoadAppointmentResponse,
} from '@/schemas/appointment/appointment-info-schema'

export const loadAppointmentByAppointmentId: Fetcher<
   LoadAppointmentResponse,
   { url: string; id: string }
> = async ({ url, id }) => {
   try {
      /** Defaulting to 10 records only to prevent long vertical scroll*/
      const { data } = await apiClient.get(`${url}/${id}`)

      const responseValidationResult = appointmentInfoSchema.safeParse(data)
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
