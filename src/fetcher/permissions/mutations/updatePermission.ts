import { apiClient } from '@/fetcher/instance'
import { PermissionResponse, permissionSchema } from '@/schemas/permissions/permissions-schema'

export const updatePermission = async (
   url: string,
   { arg }: Readonly<{ arg: PermissionResponse }>,
) => {
   console.log(arg)
   const argsValidationResult = permissionSchema.safeParse(arg)
   if (!argsValidationResult.success) {
      //TODO: To check the args schema for the api request and will be removed later
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.put(url, arg)

      const responseValidationResult = permissionSchema.safeParse(data)
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