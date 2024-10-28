import { apiClient } from '@/fetcher/instance'
import { CreatePetArgs, createPetArgsSchema } from '@/schemas/pet/creat-pet-schema'

import { petSchema } from '@/schemas/pet/pets-list-schema'

export const createPet = async (url: string, { arg }: Readonly<{ arg: CreatePetArgs }>) => {
   const argsValidationResult = createPetArgsSchema.safeParse(arg)
   if (!argsValidationResult.success) {
      //TODO: To check the args schema for the api request and will be removed later
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.post(url, arg)

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
