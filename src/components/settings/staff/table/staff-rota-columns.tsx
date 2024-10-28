import { TableTimeCell, TimeCellSlot } from '@itsallsavvy/savvy-resuable-components'
import { ColumnDef } from '@tanstack/react-table'
import { startOfWeek, addDays, format, isSameDay } from 'date-fns'
import StaffRotaCellDropdown from './actions/staff-rota-cell-dropdown-content'

export type StaffRota = {
   id: string
   name: string
   [key: string]:
      | {
           slots: TimeCellSlot[]
        }
      | string
      | number
}

// TODO: need to import this function from reusuable components
const generateWeeklySchedule = (startDate: Date) => {
   const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 }) // starts from Monday
   return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(startOfWeekDate, i)
      return {
         day,
         dayString: format(day, 'EEEE, dd MMM'),
      }
   })
}

const renderDropdownContent = (slot: TimeCellSlot, staffRota: StaffRota) => (
   <StaffRotaCellDropdown slot={slot} staffRota={staffRota} />
)

export const getstaffRotaColumns = (date: Date): ColumnDef<StaffRota>[] => [
   {
      accessorKey: 'id',
      header: '',
      size: 1,
   },
   {
      accessorKey: 'name',
      header: 'Name',
   },
   ...generateWeeklySchedule(date).map(
      (day) =>
         ({
            accessorKey: format(day.day, 'yyyy-MM-dd'),
            header: format(day.day, 'iii dd LLL'),

            cell: ({ row }) => {
               const dateString = format(day.day, 'yyyy-MM-dd')
               if (
                  !isSameDay(
                     new Date((row?.original?.[dateString] as any)?.slots?.[0].startDateTimeString),
                     day.day,
                  )
               )
                  return

               return (
                  <TableTimeCell
                     slots={(row?.original?.[dateString] as any)?.slots || []}
                     renderDropdownContent={(slot) => renderDropdownContent(slot, row.original)}
                  />
               )
            },
         }) as ColumnDef<StaffRota>,
   ),
]
