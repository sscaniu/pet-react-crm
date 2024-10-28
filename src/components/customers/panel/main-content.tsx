'use client'
import FiltersMenu from '@/components/customers/panel/filters-menu'
import PanelContainer from '@/components/customers/panel/panel-container'
import useCustomerData from '@/hooks/use-customer'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import { getCoreRowModel, getFilteredRowModel, Row, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { columns, Customer } from '../table/columns'
import CustomersTable from '../table/customers-table'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'

export default function MainContent() {
   const [tableData, setTableData] = useState<Customer[]>([])
   const [openFiltersMenu, setOpenFiltersMenu] = useState<boolean>(false)

   const [rowSelection, setRowSelection] = useState({})
   const { pagination, onPaginationChange, flags, setSelectedCustomerId, setCustomerPetsCount } =
      useCustomerTableStore((state) => state)
   const { setOpenDrawer } = useCustomerDrawerStore((state) => state)

   const { customersAndPetsData, loading, getCustomerAndPetsCountSummaryData } = useCustomerData()

   const totalCustomersCount = getCustomerAndPetsCountSummaryData?.customerCount ?? 0
   const totalPetsCount = getCustomerAndPetsCountSummaryData?.petCount ?? 0
   const searchResultCustomersCount = customersAndPetsData?.totalElements ?? 0
   const searchResultPetCount =
      customersAndPetsData?.results?.reduce((acc: number, cur: any) => {
         acc += cur?.pets?.length
         return acc
      }, 0) ?? 0

   const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      onPaginationChange,
      manualPagination: true,
      state: {
         rowSelection,
         pagination,
      },
      rowCount: searchResultCustomersCount,
      getRowId: (originalRow) => originalRow.id,
   })

   const handleClickRow = (row: Row<Customer>) => {
      setOpenDrawer(true)
      setSelectedCustomerId(row.id)
      setCustomerPetsCount(row.original.pets.length)
   }

   useEffect(() => {
      if (!loading && customersAndPetsData?.results) {
         const data: Customer[] =
            customersAndPetsData?.results?.length > 0
               ? customersAndPetsData.results.map((customer) => ({
                    id: customer.customerId ?? '',
                    nameAndEmail: {
                       name: customer.fullName,
                       email: customer.email,
                    },
                    flags: customer.flags.map((flag) => {
                       const _flag = flags.find((flg) => flg.id === flag)
                       if (!_flag) {
                          return null
                       }
                       return { id: _flag?.id ?? '', name: _flag?.name ?? '' }
                    }),
                    mobile: customer.mobileInternational ?? '',
                    pets: customer.pets.map((pet) => ({
                       name: pet.petName,
                       breed: pet.petBreed ?? '',
                    })),
                 }))
               : []
         setTableData(data)
      }
   }, [customersAndPetsData?.results, flags, loading])

   return (
      <section className="flex gap-6">
         {/* Filters Panel */}
         <FiltersMenu
            open={openFiltersMenu}
            handleOpenFiltersMenu={() => setOpenFiltersMenu(false)}
         />

         {/* Main Panel */}
         <PanelContainer
            open={openFiltersMenu}
            handleOpenFiltersMenu={() => setOpenFiltersMenu(true)}
            totalTabCount={searchResultCustomersCount}
            totalTabPetCount={searchResultPetCount}
            totalCustomersCount={totalCustomersCount}
            totalPetsCount={totalPetsCount}
            table={table}
         >
            {loading ? (
               <div className="flex h-[400px] items-center justify-center rounded-xl">
                  <Loader />
               </div>
            ) : (
               <CustomersTable handleClickRow={handleClickRow} table={table} columns={columns} />
            )}
         </PanelContainer>
      </section>
   )
}
