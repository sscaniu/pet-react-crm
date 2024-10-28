import { apiClient } from '@/fetcher/instance'
import {
   customerFlagsResponseSchema,
   petFlagsResponseSchema,
} from '@/schemas/customers-and-pets/flags-schema'
import { Fetcher } from 'swr'

export enum FlagTypeEnum {
   CUSTOMER = 'CUSTOMER',
   PET = 'PET',
}

export type GenericFetcher<T> = Fetcher<T, { url: string; type: FlagTypeEnum }>

export const getAllFlags = async <T>({
   type,
   url,
}: {
   type: FlagTypeEnum
   url: string
}): Promise<T> => {
   try {
      const { data } = await apiClient.get(`${url}/${type}`)

      const responseValidationResult =
         type === FlagTypeEnum.CUSTOMER
            ? customerFlagsResponseSchema.safeParse(data)
            : petFlagsResponseSchema.safeParse(data)
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
