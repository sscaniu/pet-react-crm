import { apiClient } from '@/fetcher/instance'
import { ReceiptResponse, receiptResponseSchema } from '@/schemas/invoice/receipt-schema'
import { Fetcher } from 'swr'

export const getReceipt: Fetcher<ReceiptResponse, { url: string; invoiceId: string }> = async <T>({
   url,
   invoiceId,
}: {
   url: string
   invoiceId: string
}): Promise<T> => {
   try {
      const { data } = await apiClient.get(`${url}/${invoiceId}`)

      console.log('data is', data)
      const responseValidationResult = receiptResponseSchema.safeParse(data)

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
