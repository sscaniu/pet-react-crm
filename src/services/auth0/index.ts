import {
   AUTH0_CLIENT_ID,
   AUTH0_DOMAIN,
   AUTH0_LOGIN_REDIRECT_URI,
   AUTH0_USER_SCOPE,
} from '@/constants/auth0-config'
import auth0 from 'auth0-js'

export const auth = new auth0.WebAuth({
   domain: AUTH0_DOMAIN,
   clientID: AUTH0_CLIENT_ID,
   scope: AUTH0_USER_SCOPE,
   redirectUri: AUTH0_LOGIN_REDIRECT_URI,
})
