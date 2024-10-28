import { PetViewEnum, SidebarActionEnum } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import PetActionForm from './pet-action-form'
import PetsList from '../pets/pets-list'

export default function PetsActionOverview() {
   const { action, petView } = useSidebarNavStore((state) => state)

   if (!action) {
      alert(`Error: failed to render action page.`)
      return <></>
   }

   if (action === SidebarActionEnum.CREATE) {
      return <PetActionForm />
   }

   const overviewElement = {
      [PetViewEnum.LIST]: <PetsList />,
      [PetViewEnum.DETAILS]: <PetActionForm />,
   }[petView]

   return overviewElement
}
