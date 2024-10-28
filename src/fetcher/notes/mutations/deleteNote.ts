import { apiClient } from '@/fetcher/instance'
import { noteSchema } from '@/schemas/notes/create-note-schema'

export const deleteNote = async (url: string) => {
   try {
      const { data } = await apiClient.delete(`${url}`)

      const responseValidationResult = noteSchema.safeParse(data)
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
