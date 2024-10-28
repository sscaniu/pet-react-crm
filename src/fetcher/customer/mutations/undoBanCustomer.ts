import { apiClient } from '@/fetcher/instance'
import {
   UndoBanCustomerArgs,
   undoBanCustomerResponse,
} from '@/schemas/customer/undo-ban-customer-schema'

export const undoBanCustomer = async (
   url: string,
   { arg }: Readonly<{ arg: UndoBanCustomerArgs }>,
) => {
   try {
      const { data } = await apiClient.put(`${url}/${arg.customerId}`)

      const responseValidationResult = undoBanCustomerResponse.safeParse(data)
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
