import { apiClient } from '@/fetcher/instance'
import { ListStoredCardResponse, storedCardsListSchema } from '@/schemas/savvy-pay/stored-card-schema'
import { Fetcher } from 'swr'

export const listStoredCardsByCustomerId: Fetcher<
ListStoredCardResponse,
   { url: string; customerId: string }
> = async ({ url, customerId }) => {
   try {
      const { data } = await apiClient.get(`${url}/${customerId}`)

      const responseValidationResult = storedCardsListSchema.safeParse(data)
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
