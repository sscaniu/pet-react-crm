import FaIcon from '@/components/common/fa-icon'
import { PetViewEnum } from '@/constants/customers-tabs'
import { cn } from '@/lib/utils'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { PetResponse, PetsListResponse } from '@/schemas/pet/pets-list-schema'
import { FlagsData } from '@/types/utils'
import { faChevronRight, faCross, faDog } from '@fortawesome/free-solid-svg-icons'
import {
   Table,
   TableHeader,
   TableRow,
   TableHead,
   TableBody,
   TableCell,
   Badge,
   Loader,
} from '@itsallsavvy/savvy-resuable-components'

interface Props {
   petsListData?: PetsListResponse
   isForDeceased?: boolean
}

export default function PetsTable({ petsListData, isForDeceased = false }: Props) {
   const { setPetView } = useSidebarNavStore((state) => state)
   const { setSelectedPet } = useCustomerTableStore((state) => state)

   const { fetchingFlags, petFlags } = useCustomerDetailsStore((state) => state)

   const flagsData = petFlags.reduce((acc, flag) => {
      acc[flag.id] = flag
      return acc
   }, {} as FlagsData)

   const handleSelectRow = (pet: PetResponse) => {
      setPetView(PetViewEnum.DETAILS)
      setSelectedPet(pet)
   }

   if (fetchingFlags) {
      return (
         <div className="flex h-[300px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <Table>
         <TableHeader>
            <TableRow>
               <TableHead className="w-8"></TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Breed</TableHead>
               <TableHead>Tags</TableHead>
               <TableHead></TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {petsListData?.map((pet) => (
               <TableRow key={pet.id} onClick={() => handleSelectRow(pet)}>
                  <TableCell
                     className={cn('text-primary', {
                        'text-grey-01': isForDeceased,
                     })}
                  >
                     <FaIcon icon={faDog} size="lg" />
                  </TableCell>
                  <TableCell className="flex">
                     {pet.name} {isForDeceased && `†`}
                  </TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell className="flex max-w-50 flex-wrap gap-1">
                     {pet.flags?.map((flag) => <Badge key={flag}>{flagsData?.[flag]?.name}</Badge>)}
                  </TableCell>
                  <TableCell>
                     <FaIcon icon={faChevronRight} />
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}
