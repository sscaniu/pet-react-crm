'use client'

import TabGroup from '@/components/common/tab-group'
import { customerDetailsTabs, DetailsTabEnum } from '@/constants/customers-tabs'
import CustomerInformation from './customer-information'
import InternalNotes from './internal-notes'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { Loader } from '@itsallsavvy/savvy-resuable-components'

export default function CustomerDetails() {
   const { customerDetailsNav, setCustomerDetailsNav } = useSidebarNavStore((state) => state)

   const { customerInformationData } = useCustomerDetailsStore((state) => state)

   const element = {
      [DetailsTabEnum.INFORMATION]: (
         <CustomerInformation customerInformationData={customerInformationData} />
      ),
      [DetailsTabEnum.NOTES]: <InternalNotes />,
   }[customerDetailsNav]

   return (
      <>
         <TabGroup<DetailsTabEnum>
            items={[
               ...customerDetailsTabs.map((tab) => ({
                  text: tab.name,
                  tab: tab.tab,
               })),
            ]}
            activeTab={customerDetailsNav}
            setActiveTab={setCustomerDetailsNav}
         />

         {/* Small Interval the data still undefined while setting customer information data.*/}
         {customerInformationData ? (
            element
         ) : (
            <div className="flex h-[400px] w-full items-center justify-center">
               <Loader />
            </div>
         )}
      </>
   )
}
