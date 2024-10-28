import { apiClient } from '@/fetcher/instance'

import { Fetcher } from 'swr'
import { PetSizeListResponse, petSizeListSchema } from '@/schemas/pet/pet-size-schema'

export const getAllPetSizes: Fetcher<PetSizeListResponse, string> = async (url) => {
   try {
      const { data } = await apiClient.get(url)

      const responseValidationResult = petSizeListSchema.safeParse(data)
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
