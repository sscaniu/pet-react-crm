'use client'
import { AUTH0_LOGOUT_URL } from '@/constants/auth0-config'
import { getPostLoginData } from '@/fetcher/instance'
import { auth } from '@/services/auth0'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { Auth0UserProfile } from 'auth0-js'
// import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
   const [username, setUsername] = useState('')
   const [loading, setLoading] = useState(false)

   // const { replace } = useRouter()

   const [data, setData] = useState<string | null>(null)
   const [token, setToken] = useState<string | null>(null)

   useEffect(() => {
      setLoading(true)
      auth.checkSession(
         {
            responseType: 'token',
         },
         async (err, authResult) => {
            if (err) {
               setLoading(false)
               return
            } else {
               const { accessToken } = authResult
               if (accessToken) {
                  auth.client.userInfo(
                     accessToken,
                     function (error: any, profile: Auth0UserProfile) {
                        if (error) {
                           setLoading(false)
                           return
                        }

                        setUsername(profile.email ?? profile.name)
                        setLoading(false)
                        setToken(accessToken)
                     },
                  )
               }
            }
         },
      )
   }, [])

   //temp code, will delete
   useEffect(() => {
      if (token) {
         getData()
      }
   }, [token])

   const getData = async () => {
      try {
         const d = await getPostLoginData()
         if (d !== null) {
            setData(d)
         }
      } catch (e: any) {
         alert('Check console for error message')
      }
   }

   const handleLogout = () => {
      auth.logout({
         returnTo: AUTH0_LOGOUT_URL,
      })
   }

   return (
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center py-10">
         <h1 className="text-4xl font-bold">Savvy!</h1>
         {!loading ? (
            <h6>{username ? `Username: ${username}` : 'No logged in user found'}</h6>
         ) : (
            <p>Loading</p>
         )}

         {data && (
            <pre className="m-6 mx-auto w-2/3 whitespace-pre-wrap rounded-lg bg-gray-200 px-4 py-2">
               {data}
            </pre>
         )}
         <Button onClick={handleLogout}>Logout</Button>
      </div>
   )
}
