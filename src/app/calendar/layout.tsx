import SidebarDrawer from '@/components/calendar/sidebar/drawer'
import { AppointmentDrawerStoreProvider } from '@/providers/appointment/appointment-drawer-store-provider'
import { AppointmentPanelStoreProvider } from '@/providers/appointment/appointment-panel-store-provider'

import { SidebarNavStoreProvider } from '@/providers/appointment/sidebar-nav-store-provider'

export default async function CalendarLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <AppointmentDrawerStoreProvider>
         <SidebarNavStoreProvider>
            <main className="bg-panel-primary py-6">
               <SidebarDrawer />
               {children}
            </main>
         </SidebarNavStoreProvider>
      </AppointmentDrawerStoreProvider>
   )
}
