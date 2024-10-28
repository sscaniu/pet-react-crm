'use client'
import { DataTable } from '@itsallsavvy/savvy-resuable-components'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { StaffRota } from './staff-rota-columns'

interface Props {
   table: Table<StaffRota>
   columns: ColumnDef<StaffRota>[]
   handleClickRow: (row: Row<StaffRota>) => void
}

const StaffRotaTable = ({ table, columns, handleClickRow }: Props) => {
   return (
      <DataTable
         isTimeSlotTable
         columns={columns}
         handleClickRow={handleClickRow}
         table={table}
         isFiltered={false}
      />
   )
}

export default StaffRotaTable
