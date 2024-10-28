import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import {
   FormTemplatesResponse,
   formTemplatesResponseSchema,
} from '@/schemas/forms/form-templates-schema'

export const getFormTemplates: Fetcher<FormTemplatesResponse, { url: string }> = async ({
   url,
}) => {
   try {
      const { data } = await apiClient.get(`${url}`)

      const responseValidationResult = formTemplatesResponseSchema.safeParse(data)
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
