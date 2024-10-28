import { AUTH0_REALM } from '@/constants/auth0-config'
import { auth } from '.'

export interface Args {
   email: string
   password: string
   username: string
   mobile: string
   country: string
}

export async function signUp(
   _key: string,
   { arg: { username, email, password } }: Readonly<{ arg: Args }>,
) {
   return new Promise((resolve, reject) => {
      auth.signup(
         {
            username,
            email,
            password,
            connection: AUTH0_REALM,
         },

         function (error, result) {
            if (error) {
               reject(error)
            } else {
               resolve(result)
            }
         },
      )
   })
}
