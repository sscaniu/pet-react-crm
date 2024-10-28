import { getAllStaff } from '@/fetcher/staff/queries/getAllStaff'
import { ListStaffResponse } from '@/schemas/staff/staff-schema'
import { STAFFS } from '@/stores/appointment/appointment-panel-store'
import { Badge, TextInput } from '@itsallsavvy/savvy-resuable-components'
import { SetStateAction, useEffect, useState } from 'react'
import useSWR from 'swr'

interface Props {
   setSelectedUsers: React.Dispatch<SetStateAction<string[]>>
}

/** TODO: Move this to global store maybe? List of users available for the logged in user might be reusable */
export default function AddEventStaff({ setSelectedUsers }: Props) {
   const { data: getAllStaffListData } = useSWR(['/users/staffList'], ([url]) =>
      getAllStaff({ url }),
   )

   const [filteredStaff, setFilteredStaff] = useState<ListStaffResponse>([])
   const [searchQuery, setSearchQuery] = useState('') // For holding search input

   // Whenever the full staff list changes, reset the filtered staff list
   useEffect(() => {
      if (getAllStaffListData) {
         setFilteredStaff(getAllStaffListData)
      }
   }, [getAllStaffListData])

   // Filter staff function based on search input
   const filterStaff = (query: string) => {
      if (!getAllStaffListData) return

      // Convert query to lowercase to allow case-insensitive matching
      const lowerCaseQuery = query.toLowerCase()

      // Filter staff based on name matching the search query
      const filtered = getAllStaffListData.filter((staff) =>
         staff.name.toLowerCase().includes(lowerCaseQuery),
      )

      setFilteredStaff(filtered) // Update the filtered staff list

      // Map filtered staff to an array of their IDs
      const staffIds = filtered.map((staff) => staff.id)

      // Pass the list of IDs to setSelectedUsers prop
      setSelectedUsers(staffIds)
   }

   return (
      getAllStaffListData?.length && (
         <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
               <p className="text-sm font-medium text-grey-04">Search Staff</p>

               {/* TextInput to handle search query */}
               <TextInput
                  placeholder="Search Staff(s)"
                  name="search-staff"
                  value={searchQuery}
                  onChange={(e) => {
                     setSearchQuery(e.target.value) // Update search query state
                     filterStaff(e.target.value) // Trigger filter on every input change
                  }}
               />
            </div>

            <div className="w-full px-10">
               <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-4">
               {/* Display filtered staff instead of the full list */}
               {filteredStaff.map((staff) => (
                  <Badge key={staff.id} className="border-0 bg-grey-04 px-4 py-2 text-text-primary">
                     {staff.name}
                  </Badge>
               ))}
            </div>
         </div>
      )
   )
}
