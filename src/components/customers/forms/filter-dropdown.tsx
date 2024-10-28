import FaIcon from '@/components/common/fa-icon'
import { faPaw, faUser } from '@fortawesome/free-solid-svg-icons'
import { Button, Checkbox, DropdownMenuLabel } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   customer: { id: string; name: string }
   pets: { id: string; name: string }[]
}

export default function FilterDropdown({ customer, pets }: Props) {
   return (
      <div className="px-10">
         <DropdownMenuLabel className="px-0 py-6 text-lg font-semibold">
            Forms Filter
         </DropdownMenuLabel>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>

         <div className="flex flex-col gap-6 py-6">
            <div className="flex flex-col gap-2">
               <h6 className="font-medium">Status</h6>
               <div className="grid grid-cols-2">
                  <div className="flex items-center gap-2">
                     <Checkbox name="completed" />
                     <p className="text-sm">Completed</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Checkbox name="incomplete" />
                     <p className="text-sm">Incomplete</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <h6 className="font-medium">Applied To</h6>
               <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                     <Checkbox name={customer.name} />
                     <div className="flex items-center gap-2">
                        <FaIcon icon={faUser} className="text-grey-04" />
                        <p className="text-sm">{customer.name}</p>
                     </div>
                  </div>
                  {pets.map((pet) => (
                     <div key={pet.id} className="flex items-center gap-2">
                        <Checkbox name={pet.name} />
                        <div className="flex items-center gap-2">
                           <FaIcon icon={faPaw} className="text-grey-04" />
                           <p className="text-sm">{pet.name}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="w-full">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
         </div>
         <div className="flex items-center justify-between py-6">
            <Button color="secondary" variant="text">
               Clear All
            </Button>
            <Button color="secondary">Filter forms</Button>
         </div>
      </div>
   )
}
