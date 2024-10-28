import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import { FormsResponse, formsResponseSchema } from '@/schemas/forms/forms-schema'
import {
   NotificationsResponse,
   notificationsResponseSchema,
} from '@/schemas/customers-and-pets/notifications-schema'

export const getNotificationsByCustomerId: Fetcher<
   NotificationsResponse,
   { url: string; id: string; pageNum: number; pageSize: number }
> = async ({ url, id, pageNum, pageSize }) => {
   try {
      const { data } = await apiClient.get(`${url}/${id}/${pageNum}/${pageSize}`)

      const responseValidationResult = notificationsResponseSchema.safeParse(data)
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
