import TabGroup from '@/components/common/tab-group'
import { customerInternalNotesTabs, InternalNotesTabEnum } from '@/constants/customers-tabs'
import { SearchInput, SelectBox } from '@itsallsavvy/savvy-resuable-components'
import AppointmentNotes from './appointment-notes'
import CustomerNotes from './customer-notes'
import PetNotes from './pet-notes'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import FaIcon from '@/components/common/fa-icon'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

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
      <>
         <div className="flex w-full items-center gap-10 px-6 py-4">
            <SearchInput
               name="Search internal notes"
               placeholder="Search Internal Notes..."
               className="w-full"
            />

            <SelectBox
               placeholder={
                  <div className="flex items-center gap-2">
                     <FaIcon icon={faPaw} />
                     All Pets
                  </div>
               }
               name="Select Pet"
               options={[{ label: 'All Pets', value: 'all' }]}
               className="h-9 w-[250px]"
            />
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
      </>
   )
}
