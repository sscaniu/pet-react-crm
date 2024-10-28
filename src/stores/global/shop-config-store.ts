import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { ListLocationsResponse } from '@/schemas/location/location-schema'

export type ShopConfigState = {
   selectedLocationId?: string
   locations?: ListLocationsResponse
   lastFetched?: number
}

export type ShopConfigActions = {
   setSelectedLocationId: (state: ShopConfigState['selectedLocationId']) => void
   setLocations: (state: ShopConfigState['locations']) => void
   setLastFetched: (state: ShopConfigState['lastFetched']) => void
}

export type ShopConfigStore = ShopConfigState & ShopConfigActions

export const initShopConfigStore = (): ShopConfigState => {
   return {}
}

export const defaultInitState: ShopConfigState = {}

export const createShopConfigStore = (initState: ShopConfigState = defaultInitState) => {
   return createStore<ShopConfigStore>()(
      persist(
         (set) => ({
            ...initState,
            setSelectedLocationId: (id) => set(() => ({ selectedLocationId: id })),
            setLocations: (locations) => set(() => ({ locations, lastFetched: Date.now() })),
            setLastFetched: (timestamp) => set(() => ({ lastFetched: timestamp })),
         }),
         {
            name: 'savvy-storage',
         },
      ),
   )
}
