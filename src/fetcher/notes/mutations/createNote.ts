import { apiClient } from '@/fetcher/instance'
import { CreateNoteArgs, noteSchema } from '@/schemas/notes/create-note-schema'

export const createNote = async (url: string, { arg }: Readonly<{ arg: CreateNoteArgs }>) => {
   const argsValidationResult = noteSchema.safeParse(arg)
   if (!argsValidationResult.success) {
      //TODO: To check the args schema for the api request and will be removed later
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const { data } = await apiClient.post(url, arg)

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
