import SidebarDrawer from '@/components/customers/sidebar/drawer'
import { CustomerDrawerStoreProvider } from '@/providers/customer/customer-drawer-store-provider'
import { CustomerTableStoreProvider } from '@/providers/customer/customer-table-store-provider'
import { SidebarNavStoreProvider } from '@/providers/customer/sidebar-nav-store-provider'

export default async function CustomersLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <CustomerDrawerStoreProvider>
         <SidebarNavStoreProvider>
            <main className="bg-panel-primary px-25 py-6">
               <CustomerTableStoreProvider>
                  <SidebarDrawer />
                  {children}
               </CustomerTableStoreProvider>
            </main>
         </SidebarNavStoreProvider>
      </CustomerDrawerStoreProvider>
   )
}
