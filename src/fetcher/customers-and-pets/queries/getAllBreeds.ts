import { apiClient } from '@/fetcher/instance'
import { breedsResponseSchema, BreedsResponse } from '@/schemas/customers-and-pets/breed-schema'
import { Fetcher } from 'swr'

export const getAllBreeds: Fetcher<BreedsResponse, string> = async (url) => {
   try {
      const { data } = await apiClient.get(`${url}/Breed`)

      const responseValidationResult = breedsResponseSchema.safeParse(data)
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
