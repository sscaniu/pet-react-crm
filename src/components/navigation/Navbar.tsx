'use client'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faGear, faInbox, faUser } from '@fortawesome/free-solid-svg-icons'
import { AUTH_URLS } from '@/constants/auth-urls'
import { useNavMenuDrawerStore } from '@/providers/customer/nav-menu-drawer-store-provider'
import NavMenuDrawer from './nav-menu-drawer'
import { useRouter } from 'next/navigation'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'
import { useState } from 'react'
import StoreLocationDropdown from '../ui/store-location-dropdown'
import RescheduleIndicator from './reschedule-indicator'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'

export default function NavBar() {
   const pathname = usePathname()
   const { selectedLocationId, setSelectedLocationId } = useShopConfigStore((state) => state)
   const { isRescheduleMode } = useAppointmentPanelStore((state) => state)
   const { setOpenDrawer } = useNavMenuDrawerStore((state) => state)
   const [selectedLocation, setSelectedLocation] = useState(selectedLocationId ?? '')
   const router = useRouter()

   const shouldHideNav = AUTH_URLS.some((url) => pathname.includes(url))

   const handleChangeLocation = (value: string) => {
      setSelectedLocationId(value)
      setSelectedLocation(value)
   }

   if (shouldHideNav) {
      return <></>
   }

   return (
      <>
         <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-grey-00 bg-white px-8 py-3 shadow-01">
            <nav className="mx-auto flex w-full max-w-screen-2xl flex-1 items-center text-text-primary">
               <div className="flex items-center gap-10">
                  <div className="flex flex-shrink-0 items-center gap-10">
                     <Button
                        variant="icon"
                        onClick={() => {
                           setOpenDrawer(true)
                        }}
                     >
                        <FontAwesomeIcon icon={faBars} size="xl" />
                     </Button>

                     <Image
                        src="/assets/hero-logo.png"
                        className="h-auto w-full object-cover object-center"
                        width={80}
                        height={27.75}
                        priority
                        quality={100}
                        alt="Cat Banner Image"
                     />
                  </div>

                  <StoreLocationDropdown
                     name="Spa branch"
                     placeholder="Please choose shop location"
                     value={selectedLocation}
                     onChange={handleChangeLocation}
                  />
               </div>

               <div className="flex w-full flex-1 items-center justify-end gap-8">
                  <Button variant="icon" type="button" className="p-0">
                     <FontAwesomeIcon icon={faBell} size="xl" />
                  </Button>
                  <Button variant="icon" type="button" className="p-0">
                     <FontAwesomeIcon icon={faInbox} size="xl" />
                  </Button>
                  <Button
                     variant="icon"
                     type="button"
                     className="p-0"
                     onClick={() => router.push('/settings')}
                  >
                     <FontAwesomeIcon icon={faGear} size="xl" />
                  </Button>
                  <Button variant="icon" type="button" className="p-0">
                     <FontAwesomeIcon icon={faUser} size="xl" />
                  </Button>
               </div>
            </nav>
            <NavMenuDrawer />
            {isRescheduleMode && <RescheduleIndicator />}
         </header>
         {/* <div className="py-10" /> */}
      </>
   )
}
