'use client'

import { ReactNode } from 'react'

import { NavMenuDrawerStoreProvider } from '@/providers/customer/nav-menu-drawer-store-provider'
import { Toast } from '@itsallsavvy/savvy-resuable-components'
import FaIcon from '@/components/common/fa-icon'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { UserStoreProvider } from './user/user-store-provider'
import { ShopConfigStoreProvider } from './global/shop-config-store-provider'
import AuthWrapper from '@/components/auth/auth-wrapper'
import ShopConfigLoader from '@/components/shop-config/shop-config-loader'
import { AppointmentPanelStoreProvider } from './appointment/appointment-panel-store-provider'

export function Providers({ children, navbar }: { children: ReactNode; navbar: ReactNode }) {
   return (
      <UserStoreProvider>
         <ShopConfigStoreProvider>
            <AuthWrapper>
               <ShopConfigLoader>
                  <AppointmentPanelStoreProvider>
                     <NavMenuDrawerStoreProvider>
                        <Toast
                           errorIcon={<FaIcon icon={faCircleXmark} />}
                           successIcon={<FaIcon icon={faCircleCheck} />}
                        />
                        {navbar}
                     </NavMenuDrawerStoreProvider>
                     {children}
                  </AppointmentPanelStoreProvider>
               </ShopConfigLoader>
            </AuthWrapper>
         </ShopConfigStoreProvider>
      </UserStoreProvider>
   )
}
