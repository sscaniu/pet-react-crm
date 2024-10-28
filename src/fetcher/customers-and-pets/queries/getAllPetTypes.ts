import { apiClient } from '@/fetcher/instance'
import { petTypesResponseSchema, PetTypesResponse } from '@/schemas/pet/pet-types-schema'
import { Fetcher } from 'swr'

export const getAllPetTypes: Fetcher<PetTypesResponse, string> = async (url) => {
   try {
      const { data } = await apiClient.get(url)

      const responseValidationResult = petTypesResponseSchema.safeParse(data)
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
