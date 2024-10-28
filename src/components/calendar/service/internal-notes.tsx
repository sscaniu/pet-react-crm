import TabGroup from '@/components/common/tab-group'
import AppointmentNotes from '@/components/customers/details/appointment-notes'
import CustomerNotes from '@/components/customers/details/customer-notes'
import PetNotes from '@/components/customers/details/pet-notes'
import { customerInternalNotesTabs, InternalNotesTabEnum } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/appointment/sidebar-nav-store-provider'

export default function InternalNotes() {
   const { internalNotesNav, setInternalNotesNav } = useSidebarNavStore((state) => state)

   // The API is ready.
   // TODO: Setup the actual data fetching when the other APIs are ready.
   // Transform this value into `Select` options
   // const { allPetsData, fetchingAllPets } = useSWR('ALL_PETS_ENDPOINT', getAllPetsByUserId)

   const element = {
      [InternalNotesTabEnum.APPOINTMENT]: <AppointmentNotes />,
      [InternalNotesTabEnum.PET]: <PetNotes />,
      [InternalNotesTabEnum.CUSTOMER]: <CustomerNotes />,
   }[internalNotesNav]

   return (
      <div>
         <div className="flex w-full items-center gap-10 py-4">
            <h4 className="text-xl font-semibold">Internal notes</h4>
         </div>
         <TabGroup
            items={[
               ...customerInternalNotesTabs.map((tab) => ({
                  text: tab.name,
                  tab: tab.tab,
               })),
            ]}
            activeTab={internalNotesNav}
            setActiveTab={setInternalNotesNav}
         />
         {element}
      </div>
   )
}
