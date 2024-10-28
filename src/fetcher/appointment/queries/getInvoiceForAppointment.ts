import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import {
   appointmentInvoiceInfoSchema,
   LoadAppointmentInvoiceResponse,
} from '@/schemas/appointment/appointment-invoice-schema'

export const getInvoiceForAppointment: Fetcher<
   LoadAppointmentInvoiceResponse,
   { url: string; appointmentId: string }
> = async ({ url, appointmentId }) => {
   try {
      const { data } = await apiClient.get(`${url}/${appointmentId}`)

      const responseValidationResult = appointmentInvoiceInfoSchema.safeParse(data)
      if (!responseValidationResult.success) {
         //TODO: To check the schema from the api response and will be removed later
         console.error('Response validation failed:', responseValidationResult.error.errors)
      }

      return responseValidationResult.success ? responseValidationResult.data : data
   } catch (error) {
      //TODO: To check the api req error log and will be removed later
      console.log('API request failed:', error)
      throw error
   }
}
