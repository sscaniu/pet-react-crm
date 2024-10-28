import { auth } from '@/services/auth0'
import { userStore } from '@/stores/user/user-store'
import { toast } from '@itsallsavvy/savvy-resuable-components'
import axios from 'axios'

const apiClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
})

apiClient.interceptors.request.use(
   async (request) => {
      try {
         const { accessToken, setAccessToken } = userStore.getState()

         // If the token is expired, we need to revoke a new token.
         if (accessToken?.tokenExpiry && Date.now() >= accessToken.tokenExpiry) {
            const newAccessToken = await new Promise((resolve, reject) => {
               auth.checkSession({ responseType: 'token' }, (err, authResult) => {
                  if (err) {
                     reject(err)
                  } else if (authResult && authResult.accessToken) {
                     const newExpiry = Date.now() + authResult.expiresIn * 1000
                     setAccessToken({
                        token: authResult.accessToken,
                        tokenExpiry: newExpiry,
                     })
                     resolve(authResult.accessToken)
                  } else {
                     reject(new Error('No access token on refresh'))
                  }
               })
            })

            if (newAccessToken) {
               request.headers['Authorization'] = `Bearer ${newAccessToken}`
            }
         } else if (accessToken?.token) {
            request.headers['Authorization'] = `Bearer ${accessToken.token}`
         }

         return request
      } catch (error: any) {
         toast.error(error.code, { description: error.message })
         return Promise.reject(error)
      }
   },
   (error) => {
      return Promise.reject(error)
   },
)

apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response) {
         toast.error(error.code, { description: error.message })
         if (error.response.status === 401) {
            window.location.replace('/sign-in')
         }
      }
   },
)

const getPostLoginData = async (): Promise<string> => {
   // TODO: temp (this should be a type of { message: string, error: boolean })
   let responseMessage = ''

   try {
      const resp = await apiClient.get('/ui/postLoginDataV3')

      responseMessage = JSON.stringify(resp.data, null, 4)
   } catch (e: any) {
      responseMessage = `Error: failed to fetch with status ${e.code} and reason: ${e.message}. Check your console for the stack trace.`
   }

   return responseMessage
}

export { apiClient, getPostLoginData }
