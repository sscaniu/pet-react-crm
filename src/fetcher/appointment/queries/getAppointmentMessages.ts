import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import { FormsResponse, formsResponseSchema } from '@/schemas/forms/forms-schema'
import { MessagesResponse, messagesResponseSchema } from '@/schemas/messages/messages-schema'

export const getAppointmentMessagesByLinkId: Fetcher<
   MessagesResponse,
   { url: string; linkId: string; pageNum: number; pageSize: number }
> = async ({ url, linkId, pageNum, pageSize }) => {
   try {
      const { data } = await apiClient.get(`${url}/${linkId}/${pageNum}/${pageSize}`)

      const responseValidationResult = messagesResponseSchema.safeParse(data)
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
