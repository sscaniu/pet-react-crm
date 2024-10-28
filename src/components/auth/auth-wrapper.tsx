'use client'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/providers/user/user-store-provider'
import { auth } from '@/services/auth0'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import { usePathname, useRouter } from 'next/navigation'
import { AUTH_URLS } from '@/constants/auth-urls'

interface Props {
   children: React.ReactNode
}

export default function AuthWrapper({ children }: Props) {
   const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
   const { replace } = useRouter()
   const pathname = usePathname()
   const { setAccessToken, fetchUserInfo } = useUserStore((state) => state)

   const isAuthRoutes = AUTH_URLS.some((url) => pathname.includes(url))

   useEffect(() => {
      const loadUserInfo = async () => {
         try {
            const authResult: any = await new Promise((resolve, reject) => {
               auth.checkSession({ responseType: 'token' }, (err: any, authResult: any) => {
                  if (err) {
                     reject(err)
                  } else if (authResult && authResult.accessToken) {
                     resolve(authResult)
                  } else {
                     reject(new Error('No access token'))
                  }
               })
            })

            if (authResult && authResult.accessToken) {
               const tokenExpiry = Date.now() + authResult.expiresIn * 1000
               setAccessToken({ token: authResult.accessToken, tokenExpiry })
               await fetchUserInfo()
               setIsAuthenticated(true)
            }
         } catch (error) {
            console.error('Authentication error:', error)
            setIsAuthenticated(false)
            if (!isAuthRoutes) {
               replace('/sign-in')
            }
         } finally {
            setIsAuthChecked(true)
         }
      }

      if (!isAuthChecked && !isAuthRoutes) {
         loadUserInfo()
      } else {
         setIsAuthChecked(true)
      }
   }, [fetchUserInfo, setAccessToken, replace, isAuthRoutes, isAuthChecked])

   if (!isAuthChecked) {
      return (
         <div className="flex h-[calc(100vh-64px-24px)] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   // If it's an auth route or the user is authenticated, render children
   if (isAuthRoutes || isAuthenticated) {
      return children
   }

   // If not authenticated and not on an auth route, render nothing (or a placeholder)
   return null
}
