import FaIcon from '@/components/common/fa-icon'
import { faEllipsisVertical, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons'
import {
   Checkbox,
   DropdownMenu,
   DropdownMenuTrigger,
   Button,
   DropdownMenuContent,
   DropdownMenuItem,
   Badge,
} from '@itsallsavvy/savvy-resuable-components'

import { ColumnDef } from '@tanstack/react-table'
import ActionsDropDown from '../layout/actions-drop-down'
import { Fragment } from 'react'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'

export type Customer = {
   id: string
   mobile: string
   nameAndEmail: {
      name: string
      email: string | null
   }
   flags: ({ id: string; name: string } | null)[]
   pets: { name: string; breed: string }[]
}

export const columns: ColumnDef<Customer>[] = [
   {
      id: 'select',
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            // Prevents the checkbox click event from propagating to the parent row,
            // which would otherwise trigger the row's onClick handler, causing
            // unintended actions.
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      size: 10,
   },

   {
      accessorKey: 'nameAndEmail',
      header: 'Name',
      size: 10,
      cell: ({ row }) => (
         <div>
            <div>{row.original.nameAndEmail.name}</div>
            {row.original.nameAndEmail.email && (
               <div className="text-sm text-grey-04">{row.original.nameAndEmail.email}</div>
            )}
         </div>
      ),
      filterFn: (row, _columnId, filterValue) => {
         const { name, email } = row.original.nameAndEmail || {}
         const filterText = filterValue?.toLowerCase() || ''

         const nameMatches = name?.toLowerCase().includes(filterText)
         const emailMatches = email ? email.toLowerCase().includes(filterText) : false

         return nameMatches || emailMatches
      },
   },

   {
      header: 'Mobile',
      accessorKey: 'mobile',
      size: 50,
   },

   {
      header: 'Pets',
      accessorKey: 'pets',
      cell: ({ row }) => {
         const petsCount = row.original.pets.length
         const isMoreThanThree = petsCount > 3
         return (
            <div className="flex flex-col gap-2">
               {!isMoreThanThree
                  ? row.original.pets.map((pet) => (
                       <div key={pet.name} className="flex flex-col gap-1">
                          <div>{pet.name}</div>
                          <div className="text-sm text-grey-04">{pet.breed}</div>
                       </div>
                    ))
                  : row.original.pets.slice(0, 3).map((pet, index) => {
                       return (
                          <div key={pet.name} className="flex flex-col gap-1">
                             <div>{pet.name}</div>
                             <div className="text-sm text-grey-04">{pet.breed}</div>
                             {index === 2 && (
                                <span className="text-xs text-grey-02">+{petsCount - 3} more</span>
                             )}
                          </div>
                       )
                    })}
            </div>
         )
      },
   },
   {
      header: 'Flags',
      accessorKey: 'flags',
      cell: ({ row }) => {
         const flags = row.original.flags.filter((flag) => !!flag)
         const flagsCount = flags.length
         const isMoreThanThree = flagsCount > 3
         return (
            <div className="flex flex-wrap gap-2">
               {!isMoreThanThree
                  ? flags.map((flag) => (
                       <Fragment key={`${flag.id}-${Math.random().toString()}`}>
                          {flag && <Badge>{flag.name}</Badge>}
                       </Fragment>
                    ))
                  : flags.slice(0, 3).map((flag, index) => {
                       return (
                          <Fragment key={`${flag.id}-${Math.random().toString()}`}>
                             {flag && <Badge>{flag.name}</Badge>}
                             {index === 2 && <Badge>+{flagsCount - 3}</Badge>}
                          </Fragment>
                       )
                    })}
            </div>
         )
      },
   },
   {
      header: 'Actions',
      id: 'actions',
      cell: () => {
         return (
            <div className="flex gap-2">
               <Button variant="icon">
                  <FaIcon icon={faEye} />
               </Button>
               <Button variant="icon">
                  <FaIcon icon={faEnvelope} />
               </Button>
            </div>
         )
      },
      size: 10,
   },
   {
      id: 'actions',

      cell: ({ row }) => {
         return (
            <div className="text-grey-04">
               <ActionsDropDown customerId={row.id} />
            </div>
         )
      },
      size: 10,
   },
]
