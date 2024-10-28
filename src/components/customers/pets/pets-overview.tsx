import PetsList from './pets-list'
import PetProfile from './pet-profile'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { PetViewEnum } from '@/constants/customers-tabs'

export default function PetsOverview() {
   const { petView } = useSidebarNavStore((state) => state)

   const petsElement = {
      [PetViewEnum.DETAILS]: <PetProfile />,
      [PetViewEnum.LIST]: <PetsList />,
   }[petView]

   return petsElement
}
