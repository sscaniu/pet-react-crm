import { apiClient } from '@/fetcher/instance'
import { CreateCustomerArgs, customerActionSchema } from '@/schemas/customer/create-customer-schema'
import { customerSchema } from '@/schemas/customer/customer-information-schema'

export const createCustomer = async (
   url: string,
   { arg }: Readonly<{ arg: CreateCustomerArgs }>,
) => {
   const argsValidationResult = customerActionSchema.safeParse(arg)
   if (!argsValidationResult.success) {
      //TODO: To check the args schema for the api request and will be removed later
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.post(url, arg)

      const responseValidationResult = customerSchema.safeParse(data)
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
