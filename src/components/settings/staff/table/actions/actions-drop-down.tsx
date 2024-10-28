import FaIcon from '@/components/common/fa-icon'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@itsallsavvy/savvy-resuable-components'

export default function ActionsDropDown() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="icon">
               <FaIcon icon={faEllipsisVertical} size="lg" className="text-grey-04" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center">
            <DropdownMenuItem>Revoke Access</DropdownMenuItem>
            <DropdownMenuItem className="text-red-01">Delete Staff</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
