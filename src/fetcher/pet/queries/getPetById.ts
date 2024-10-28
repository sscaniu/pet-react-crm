import { apiClient } from '@/fetcher/instance'
import { PetResponse, petSchema } from '@/schemas/pet/pets-list-schema'
import { Fetcher } from 'swr'

export const getPetById: Fetcher<PetResponse, { url: string; id: string }> = async ({
   url,
   id,
}) => {
   try {
      const { data } = await apiClient.get(`${url}/${id}`)

      const responseValidationResult = petSchema.safeParse(data)
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
