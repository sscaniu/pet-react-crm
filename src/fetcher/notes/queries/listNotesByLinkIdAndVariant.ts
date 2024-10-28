import { apiClient } from '@/fetcher/instance'
import { PagedNoteResponse, pagedNoteSchema } from '@/schemas/notes/notes-schema'
import { Fetcher } from 'swr'

export const listNotesByLinkIdAndVariant: Fetcher<
   PagedNoteResponse,
   { url: string; linkId: string; linkIdType: string; variant: string }
> = async ({ url, linkId, linkIdType, variant }) => {
   try {
      /** Defaulting to 10 records only to prevent long vertical scroll*/
      const { data } = await apiClient.get(`${url}/${linkId}/${linkIdType}/${variant}/1/10`)

      const responseValidationResult = pagedNoteSchema.safeParse(data)
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
