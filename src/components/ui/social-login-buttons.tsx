'use client'
import { AUTH0_DOMAIN, AUTH0_LOGIN_REDIRECT_URI } from '@/constants/auth0-config'
import { socialMediaIcons } from '@/constants/social-media-icons'
import { auth } from '@/services/auth0'

export default function SocialLoginButtons() {
   const handleSocialSignin = () => {
      auth.authorize({
         redirectUri: AUTH0_LOGIN_REDIRECT_URI,
         connection: 'facebook',
         domain: AUTH0_DOMAIN,
         responseType: 'token',
      })
   }

   return (
      <div className="flex items-center justify-center gap-4">
         {socialMediaIcons.map((icon) => (
            <button
               key={icon.title}
               type="button"
               onClick={handleSocialSignin}
               className="flex aspect-square w-12 appearance-none items-center justify-center rounded-full border border-grey-02"
            >
               {<icon.element />}
            </button>
         ))}
      </div>
   )
}
