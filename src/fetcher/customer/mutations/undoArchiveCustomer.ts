import { apiClient } from '@/fetcher/instance'
import {
   UndoArchiveCustomerArgs,
   undoArchiveCustomerResponse,
} from '@/schemas/customer/undo-archive-customer-schema'

export const undoArchiveCustomer = async (
   url: string,
   { arg }: Readonly<{ arg: UndoArchiveCustomerArgs }>,
) => {
   try {
      const { data } = await apiClient.put(`${url}/${arg.customerId}`)

      const responseValidationResult = undoArchiveCustomerResponse.safeParse(data)
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
