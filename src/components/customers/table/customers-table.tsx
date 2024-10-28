'use client'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { DataTable } from '@itsallsavvy/savvy-resuable-components'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { Customer } from './columns'

interface Props {
   table: Table<Customer>
   columns: ColumnDef<Customer>[]
   handleClickRow: (row: Row<Customer>) => void
}

const CustomersTable = ({ table, columns, handleClickRow }: Props) => {
   const { filters } = useCustomerTableStore((state) => state)

   const isFiltered = filters.length > 0

   return (
      <DataTable
         columns={columns}
         handleClickRow={handleClickRow}
         table={table}
         isFiltered={isFiltered}
         actionCells={['select', 'actions', 'dropdown-menu']}
      />
   )
}

export default CustomersTable
