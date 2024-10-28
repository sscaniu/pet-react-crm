import { apiClient } from '@/fetcher/instance'
import {
   CustomersAndPetsCountSummaryResponse,
   customersAndPetsCountSummaryResponseSchema,
} from '@/schemas/customers-and-pets/customers-and-pets-schema'
import { Fetcher } from 'swr'

export const getCustomerAndPetsCountSummary: Fetcher<
   CustomersAndPetsCountSummaryResponse,
   { url: string }
> = async ({ url }) => {
   try {
      const { data } = await apiClient.get(url)

      const responseValidationResult = customersAndPetsCountSummaryResponseSchema.safeParse(data)
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
