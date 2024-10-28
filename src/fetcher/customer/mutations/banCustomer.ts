import { apiClient } from '@/fetcher/instance'
import { BanCustomerArgs, banCustomerResponse } from '@/schemas/customer/ban-customer-schema'

export const banCustomer = async (url: string, { arg }: Readonly<{ arg: BanCustomerArgs }>) => {
   try {
      const { data } = await apiClient.put(`${url}/${arg.customerId}`)

      const responseValidationResult = banCustomerResponse.safeParse(data)
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
