'use client'
import DateRangePicker from '@/components/settings/staff/date-range-picker'
import {
   getstaffRotaColumns,
   StaffRota,
} from '@/components/settings/staff/table/staff-rota-columns'
import StaffRotaTable from '@/components/settings/staff/table/staff-rota-table'
import { getRotaByLocationId } from '@/fetcher/staff-rota/queries/getRotaByLocationId'
import { useStaffRotaTableStore } from '@/providers/staff/staff-rota-table-store-provider'
import { SearchInput } from '@itsallsavvy/savvy-resuable-components'
import { getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import StoreLocationDropdown from '@/components/ui/store-location-dropdown'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'

export default function StaffRotaTableTemplate() {
   const { setRefetchStaffRotaList } = useStaffRotaTableStore((state) => state)

   const { selectedLocationId } = useShopConfigStore((state) => state)
   const [selectedLocation, setSelectedLocation] = useState(selectedLocationId ?? '')
   const [staffRotaTableData, setStaffRotaTableData] = useState<StaffRota[]>([])

   const [currentDate, setCurrentDate] = useState(new Date())

   const {
      data: getStaffRotaListData,
      isLoading: fetchingStaffRotaList,
      mutate: refetchStaffRotaList,
      isValidating,
   } = useSWR(['/shiftSlot/byLocation', '123'], ([url, locationId]) =>
      getRotaByLocationId({ url, locationId }),
   )

   const staffRotaTable = useReactTable({
      data: staffRotaTableData,
      columns: getstaffRotaColumns(currentDate),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: true,
      getRowId: (originalRow) => originalRow.id,
   })

   useEffect(() => {
      if (!fetchingStaffRotaList && getStaffRotaListData) {
         const data: StaffRota[] =
            getStaffRotaListData.staffRotas.length > 0
               ? getStaffRotaListData.staffRotas.map((staffRota) => ({
                    id: staffRota.id,
                    name: staffRota.name ?? '',
                    ...(staffRota.map as any),
                 }))
               : []

         setStaffRotaTableData(data)
      }
   }, [fetchingStaffRotaList, getStaffRotaListData])

   useEffect(() => {
      if (getStaffRotaListData) {
         setRefetchStaffRotaList(refetchStaffRotaList)
      }
      // So if setRefetchPetsList changes (ie. selected customer changes) it will automatically refresh the list
   }, [getStaffRotaListData, refetchStaffRotaList, setRefetchStaffRotaList])

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

            <DateRangePicker currentDate={currentDate} setCurrentDate={setCurrentDate} />

            <div className="flex max-w-lg items-center gap-8">
               <SearchInput
                  className="flex-1"
                  name="Search for staffs"
                  placeholder="Search Names, Emails, Mobile..."
               />
            </div>
         </div>
         <StaffRotaTable
            table={staffRotaTable}
            columns={getstaffRotaColumns(currentDate)}
            handleClickRow={() => {}}
         />
      </>
   )
}
