import { apiClient } from '@/fetcher/instance'
import { petsListSchema } from '@/schemas/pet/pets-list-schema'
import { Fetcher } from 'swr'
import { StaffRotaResponse } from '@/schemas/staff/staff-rota-schema'

export const getRotaByLocationId: Fetcher<
   StaffRotaResponse,
   { url: string; locationId: string }
> = async ({ url, locationId }) => {
   try {
      const { data } = await apiClient.get(`${url}/${locationId}`)

      const responseValidationResult = petsListSchema.safeParse(data)
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
