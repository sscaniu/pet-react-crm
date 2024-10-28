import { apiClient } from '@/fetcher/instance'
import {
   ArchiveCustomerArgs,
   archiveCustomerResponse,
} from '@/schemas/customer/archive-customer-schema'

export const archiveCustomer = async (
   url: string,
   { arg }: Readonly<{ arg: ArchiveCustomerArgs }>,
) => {
   try {
      const { data } = await apiClient.delete(`${url}/${arg.customerId}`)

      const responseValidationResult = archiveCustomerResponse.safeParse(data)
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
