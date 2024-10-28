import { apiClient } from '@/fetcher/instance'
import {
   customersAndPetsArgsSchema,
   CustomersAndPetsArgs,
   CustomersAndPetsResponse,
   customersAndPetsResponseSchmea,
} from '@/schemas/customers-and-pets/customers-and-pets-schema'
import { Fetcher } from 'swr'

export const getCustomersAndPets: Fetcher<
   CustomersAndPetsResponse,
   { url: string; args: CustomersAndPetsArgs }
> = async ({ args, url }) => {
   const argsValidationResult = customersAndPetsArgsSchema.safeParse(args)
   if (!argsValidationResult.success) {
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.put(url, argsValidationResult.data)

      const responseValidationResult = customersAndPetsResponseSchmea.safeParse(data)
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
