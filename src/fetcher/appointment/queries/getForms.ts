import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import { FormsResponse, formsResponseSchema } from '@/schemas/forms/forms-schema'

export const getFormsByAppointmentId: Fetcher<
   FormsResponse,
   { url: string; appointmentId: string; customerId: string; formType: string }
> = async ({ url, appointmentId, customerId, formType }) => {
   try {
      const { data } = await apiClient.get(`${url}/${appointmentId}/${customerId}/${formType}`)

      const responseValidationResult = formsResponseSchema.safeParse(data)
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
