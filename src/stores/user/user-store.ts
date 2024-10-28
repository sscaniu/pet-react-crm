import { apiClient } from '@/fetcher/instance'
import { toast } from '@itsallsavvy/savvy-resuable-components'
import { createStore } from 'zustand/vanilla'

interface UserInfo {
   username: string
   email: string
   mobileNumber: string
}

interface AccessToken {
   token: string
   tokenExpiry: number
}

export type UserState = {
   userInfo: UserInfo | null
   accessToken: AccessToken | null
}

export type UserActions = {
   setUserInfo: (userInfo: UserState['userInfo']) => void
   setAccessToken: (token: UserState['accessToken']) => void
   fetchUserInfo: () => Promise<void>
}

export type UserStore = UserState & UserActions

export const initUserStore = (): UserState => {
   return {
      accessToken: null,
      userInfo: null,
   }
}

export const defaultInitState: UserState = {
   accessToken: null,
   userInfo: null,
}

export const createUserStore = (initState: UserState = defaultInitState) => {
   return createStore<UserStore>()((set, get) => ({
      ...initState,
      setUserInfo: (userInfo) => set({ userInfo }),
      setAccessToken: (accessToken) => set({ accessToken }),
      fetchUserInfo: async () => {
         const { accessToken } = get()
         if (accessToken) {
            try {
               const { data } = await apiClient.get('/ui/postLoginDataV3')
               set({
                  userInfo: {
                     username: data?.fullName ?? '',
                     email: data?.username ?? '',
                     mobileNumber: data?.currencyCode ?? '',
                  },
               })
            } catch (error) {
               //TODO: add more context to this error
               toast.error('Error fetching user info')
            }
         }
      },
   }))
}

export const userStore = createUserStore(initUserStore())
