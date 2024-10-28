import FaIcon from '@/components/common/fa-icon'
import {
   Staff,
   StaffInviteStatusEnum,
   staffsListColumns,
} from '@/components/settings/staff/table/staffs-list-columns'
import StaffsListTable from '@/components/settings/staff/table/staffs-list-table'
import { useStaffTableStore } from '@/providers/staff/staff-table-store-provider'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchInput, Button } from '@itsallsavvy/savvy-resuable-components'
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { getStaffByLocation } from '@/fetcher/staff/queries/getStaffByLocation'
import StoreLocationDropdown from '@/components/ui/store-location-dropdown'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'

export default function StaffsListTableTemplate() {
   const { setRefetchStaffList, setOpenAddStaffModal } = useStaffTableStore((state) => state)
   const [tableData, setTableData] = useState<Staff[]>([])
   const { selectedLocationId } = useShopConfigStore((state) => state)
   const [selectedLocation, setSelectedLocation] = useState(selectedLocationId ?? '')

   const {
      data: getAllStaffListData,
      isLoading: fetchingStaffList,
      mutate: refetchStaffList,
      isValidating,
   } = useSWR(['/users/staffListByLocation', '123'], ([url, locationId]) =>
      getStaffByLocation({ url, locationId }),
   )

   const staffsListTable = useReactTable({
      data: tableData,
      columns: staffsListColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: true,
      getRowId: (originalRow) => originalRow.id,
   })

   useEffect(() => {
      if (!fetchingStaffList && getAllStaffListData) {
         const data: Staff[] =
            getAllStaffListData.length > 0
               ? getAllStaffListData.map((staff) => ({
                    id: staff.id ?? '',
                    name: staff.name,
                    contact: {
                       email: staff.email ?? '',
                       mobile: staff.mobile ?? '',
                    },

                    storeLocation: staff.storeLocation ?? '',
                    inviteStatus: staff.inviteStatus ?? StaffInviteStatusEnum.ACTIVE,
                    role: staff.role ?? '',
                    permissionLevel: staff.permissionLevel ?? '',
                 }))
               : []
         setTableData(data)
      }
   }, [fetchingStaffList, getAllStaffListData])

   useEffect(() => {
      if (getAllStaffListData) {
         setRefetchStaffList(refetchStaffList)
      }
   }, [getAllStaffListData, refetchStaffList, setRefetchStaffList])

   const handleOpenAddStaffModal = () => {
      setOpenAddStaffModal(true)
   }

   return (
      <>
         <div className="flex justify-between">
            <StoreLocationDropdown
               name="store location"
               className="w-fit"
               placeholder="Please choose store location"
               value={selectedLocation}
               onChange={setSelectedLocation}
            />
            <div className="flex w-full max-w-lg items-center gap-8">
               <SearchInput
                  className="flex-1"
                  name="Search for staffs"
                  placeholder="Search Names, Emails, Mobile..."
               />
               <Button
                  color="secondary"
                  onClick={handleOpenAddStaffModal}
                  rightIcon={<FaIcon icon={faPlus} size="sm" />}
                  className="relative"
               >
                  Add
               </Button>
            </div>
         </div>
         <StaffsListTable
            table={staffsListTable}
            columns={staffsListColumns}
            handleClickRow={() => {}}
         />
      </>
   )
}
