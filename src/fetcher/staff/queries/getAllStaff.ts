import { apiClient } from '@/fetcher/instance'
import { Fetcher } from 'swr'
import { ListStaffResponse, listStaffResponseSchema } from '@/schemas/staff/staff-schema'

export const getAllStaff: Fetcher<ListStaffResponse, { url: string }> = async ({ url }) => {
   try {
      const { data } = await apiClient.get(`${url}`)

      const responseValidationResult = listStaffResponseSchema.safeParse(data)
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
