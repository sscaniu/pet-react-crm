import qs from 'qs'

import { SignUpArgs, signUpArgsSchema, signUpResponseSchema } from '@/schemas/sign-up'
import axios from 'axios'

export const signUpUser = async (url: string, { arg }: Readonly<{ arg: SignUpArgs }>) => {
   const argsValidationResult = signUpArgsSchema.safeParse(arg)
   if (!argsValidationResult.success) {
      //TODO: To check the args schema for the api request and will be removed later
      console.error('Args validation failed:', argsValidationResult.error.errors)
   }

   try {
      const options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         data: qs.stringify(argsValidationResult.data),
         baseURL: 'https://devapi.itsallsavvy.com/rest',
      }

      // TODO: use existiing apiClient and remove auth-check Interceptor for this request
      const { data } = await axios(url, options)

      const responseValidationResult = signUpResponseSchema.safeParse(data)
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
