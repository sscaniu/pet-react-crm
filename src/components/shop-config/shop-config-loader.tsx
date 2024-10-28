'use client'
import { useEffect, useCallback } from 'react'
import { getAllLocations } from '@/fetcher/location/queries/getAllLocations'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import useSWR from 'swr'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'
import { useUserStore } from '@/providers/user/user-store-provider'
import { FETCH_STALE_TIME } from '@/constants/shop-config'

export default function ShopConfigLoader({ children }: { children: React.ReactNode }) {
   const { locations, lastFetched, selectedLocationId, setSelectedLocationId, setLocations } =
      useShopConfigStore((state) => state)
   const { accessToken } = useUserStore((state) => state)

   const shouldFetch = useCallback(() => {
      if (!accessToken) return false // Don't fetch if not authenticated
      if (!locations || locations.length === 0) return true
      if (!lastFetched) return true
      return Date.now() - lastFetched > FETCH_STALE_TIME
   }, [locations, lastFetched, accessToken])

   const {
      data: locationsData,
      isLoading: fetchingLocations,
      error,
      mutate,
   } = useSWR(shouldFetch() ? ['/location/all'] : null, ([url]) => getAllLocations({ url }), {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   })

   useEffect(() => {
      if (locationsData) {
         setLocations(locationsData)
         if (!selectedLocationId) setSelectedLocationId(locationsData[0].id)
      }
   }, [locationsData, selectedLocationId, setLocations, setSelectedLocationId])

   if (fetchingLocations) {
      return (
         <div className="flex h-[calc(100vh-64px-24px)] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   //    if (error) {
   //       return (
   //          <div className="flex h-[calc(100vh-64px-24px)] items-center justify-center rounded-xl">
   //             <div>
   //                <p>Error loading locations. Please try again.</p>
   //                <button
   //                   onClick={() => mutate()}
   //                   className="mt-4 rounded bg-primary px-4 py-2 text-white"
   //                >
   //                   Retry
   //                </button>
   //             </div>
   //          </div>
   //       )
   //    }

   return children
}
