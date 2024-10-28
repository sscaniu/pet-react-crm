import { AUTH0_REALM } from '@/constants/auth0-config'
import { auth } from '.'

export interface Args {
   email: string
   password: string
}

export async function signIn(_key: string, { arg: { email, password } }: Readonly<{ arg: Args }>) {
   return new Promise((resolve, reject) => {
      auth.login(
         {
            email,
            password,
            realm: AUTH0_REALM,
            responseType: 'token id_token',
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
