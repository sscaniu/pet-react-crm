import { apiClient } from '@/fetcher/instance'
import {
   ListAppointmentHistoryResponse,
   appointmentTableRowsSchema,
} from '@/schemas/appointment/appoinment-table-row-schema'
import { Fetcher } from 'swr'

export const listAppointmentHistoryByPetId: Fetcher<
   ListAppointmentHistoryResponse,
   { url: string; petId: string }
> = async ({ url, petId }) => {
   try {
      const { data } = await apiClient.get(`${url}/${petId}`)

      const responseValidationResult = appointmentTableRowsSchema.safeParse(data)
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
