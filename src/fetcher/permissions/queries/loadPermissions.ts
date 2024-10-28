import { apiClient } from '@/fetcher/instance'
import {
   PermissionGroupListResponse,
   permissionGroupSchemaList,
} from '@/schemas/permissions/permissions-schema'
import { Fetcher } from 'swr'

export const loadPermissions: Fetcher<PermissionGroupListResponse, { url: string }> = async ({
   url,
}) => {
   try {
      /** Defaulting to 10 records only to prevent long vertical scroll*/
      const { data } = await apiClient.get(`${url}`)

      const responseValidationResult = permissionGroupSchemaList.safeParse(data)
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
