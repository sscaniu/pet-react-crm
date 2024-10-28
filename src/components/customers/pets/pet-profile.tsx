import TabGroup from '@/components/common/tab-group'
import { PetProfileTabEnum, petProfileTabs } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import AppointmentsOverview from './appointments-overview'
import PetInformation from './pet-information'

export default function PetProfile() {
   const { petProfileNav, setPetProfileNav } = useSidebarNavStore((state) => state)

   const element = {
      [PetProfileTabEnum.INFORMATION]: <PetInformation />,
      [PetProfileTabEnum.APPOINTMENTS]: <AppointmentsOverview />,
   }[petProfileNav]

   return (
      <>
         <TabGroup
            items={[
               ...petProfileTabs.map((tab) => ({
                  text: tab.name,
                  tab: tab.tab,
               })),
            ]}
            activeTab={petProfileNav}
            setActiveTab={setPetProfileNav}
         />

         {element}
      </>
   )
}
