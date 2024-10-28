import { apiClient } from '@/fetcher/instance'
import { petsListSchema } from '@/schemas/pet/pets-list-schema'
import { Fetcher } from 'swr'
import {
   editRegularShiftSchema,
   RegularShift,
   regularShiftSchema,
   StaffRotaResponse,
} from '@/schemas/staff/staff-rota-schema'

export const getRegularShiftByUserId: Fetcher<
   RegularShift,
   { url: string; userId: string }
> = async ({ url, userId }) => {
   try {
      const { data } = await apiClient.get(`${url}/${userId}`)

      const responseValidationResult = regularShiftSchema.safeParse(data)
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
