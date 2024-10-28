import FaIcon from '@/components/common/fa-icon'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import {
   DropdownMenu,
   DropdownMenuTrigger,
   Button,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
} from '@itsallsavvy/savvy-resuable-components'
import FilterDropdown from './filter-dropdown'

//TODO: Remove dummy data once API is integrated
const CUSTOMER = { id: '0001', name: 'Sasha Fierce' }
const PETS = [
   { id: '0002', name: 'Baron' },
   { id: '0003', name: 'Fira' },
]

export default function FilterDropdownButton() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               className="flex-shrink-0"
               variant="outlined"
               color="secondary"
               rightIcon={<FaIcon icon={faSliders} size="sm" />}
            >
               Filter
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-[600px] rounded-2xl">
            <FilterDropdown customer={CUSTOMER} pets={PETS} />
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
