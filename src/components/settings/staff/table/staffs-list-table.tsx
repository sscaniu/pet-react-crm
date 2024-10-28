'use client'
import { DataTable } from '@itsallsavvy/savvy-resuable-components'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { Staff } from './staffs-list-columns'

interface Props {
   table: Table<Staff>
   columns: ColumnDef<Staff>[]
   handleClickRow: (row: Row<Staff>) => void
}

const StaffsListTable = ({ table, columns, handleClickRow }: Props) => {
   return (
      <DataTable
         columns={columns}
         handleClickRow={handleClickRow}
         table={table}
         isFiltered={false}
      />
   )
}

export default StaffsListTable
