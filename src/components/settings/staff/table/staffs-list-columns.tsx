import { getStatusVariant } from '@/lib/utils'
import { Badge } from '@itsallsavvy/savvy-resuable-components'
import { ColumnDef } from '@tanstack/react-table'
import ActionsDropDown from './actions/actions-drop-down'

export enum StaffInviteStatusEnum {
   ACTIVE = 'active',
   PENDING = 'pending',
   NOT_INVITED = 'not invited',
}

export type Staff = {
   id: string
   name: string
   contact: {
      email: string
      mobile: string
   }
   storeLocation: string
   role: string
   permissionLevel: string
   inviteStatus: StaffInviteStatusEnum
}

export const staffsListColumns: ColumnDef<Staff>[] = [
   // TODO: Might be added later, hide cuz it's ugly
   // {
   //    accessorKey: 'id',
   //    header: '#',
   //    size: 10,
   // },

   {
      accessorKey: 'name',
      header: 'Name',
      size: 10,
   },

   {
      accessorKey: 'contact',
      header: 'Contact',

      cell: ({ row }) => (
         <div>
            <p className="text-sm font-medium">{row.original.contact.email}</p>
            <p className="text-xs font-medium text-grey-02">{row.original.contact.mobile}</p>
         </div>
      ),
   },

   {
      header: 'Store Location',
      accessorKey: 'storeLocation',
   },

   {
      header: 'Role',
      accessorKey: 'role',
      size: 10,
      cell: ({ row }) => {
         return <p className="font-medium capitalize">{row.original.role}</p>
      },
   },

   {
      header: 'Permission Level',
      accessorKey: 'permissionLevel',
      size: 10,
      cell: ({ row }) => {
         return <p className="font-medium capitalize">{row.original.permissionLevel}</p>
      },
   },

   {
      header: 'Invite Status',
      accessorKey: 'inviteStatus',
      cell: ({ row }) => {
         return (
            <Badge className="capitalize" variant={getStatusVariant(row.original.inviteStatus)}>
               {row.original.inviteStatus}
            </Badge>
         )
      },
   },

   {
      id: 'actions',
      cell: ({ row }) => {
         return (
            <div className="text-grey-04">
               <ActionsDropDown />
            </div>
         )
      },
      size: 10,
   },
]
