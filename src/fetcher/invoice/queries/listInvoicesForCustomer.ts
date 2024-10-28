import { apiClient } from '@/fetcher/instance'
import {
   invoicesResponseSchema,
   ListInvoicesForCustomerArgs,
   listInvoicesForCustomerArgsSchema,
   ListInvoicesForCustomerResponse,
} from '@/schemas/invoice/invoices-schema'
import { Fetcher } from 'swr'

export const listInvoicesForCustomer: Fetcher<
   ListInvoicesForCustomerResponse,
   { url: string; args: ListInvoicesForCustomerArgs }
> = async ({ args, url }) => {
   const argsValidationResult = listInvoicesForCustomerArgsSchema.safeParse(args)
   if (!argsValidationResult.success) {
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.put(url, argsValidationResult.data)

      const responseValidationResult = invoicesResponseSchema.safeParse(data)
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
