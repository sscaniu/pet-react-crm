// import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// import {
//    useReactTable,
//    getCoreRowModel,
//    getFilteredRowModel,
//    Table,
//    ColumnFiltersState,
//    ColumnDef,
//    getSortedRowModel,
//    getPaginationRowModel,
// } from '@tanstack/react-table'
// import { Customer } from '@/components/customers/table/columns'

// interface TableContextInterface {
//    table: Table<Customer>
//    filter: ColumnFiltersState
//    setFilter: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
//    columns: ColumnDef<Customer, any>[]
//    loading: boolean
//    customersCount: number
//    petsCount: number
// }

// const TableContext = createContext<TableContextInterface | null>(null)

// export const TableProvider = ({
//    columns,
//    data,
//    children,
//    loading,
//    petsCount,
//    customersCount,
//    pagination,
//    onPaginationChange,
//    rowCount,
// }: {
//    children: React.ReactNode
//    data: Customer[]
//    columns: ColumnDef<Customer, any>[]
//    loading: boolean
//    customersCount: number
//    petsCount: number
//    pagination: { pageSize: number; pageIndex: number }
//    onPaginationChange: Dispatch<
//       SetStateAction<{
//          pageSize: number
//          pageIndex: number
//       }>
//    >
//    rowCount: number
// }) => {
//    const [filter, setFilter] = useState<ColumnFiltersState>([])
//    const [rowSelection, setRowSelection] = useState({})

//    const table = useReactTable({
//       data,
//       columns,
//       getCoreRowModel: getCoreRowModel(),
//       getFilteredRowModel: getFilteredRowModel(),
//       onRowSelectionChange: setRowSelection,
//       onPaginationChange,
//       manualPagination: true,
//       state: {
//          rowSelection,
//          pagination,
//       },
//       rowCount,
//    })

//    return (
//       <TableContext.Provider
//          value={{ table, filter, setFilter, columns, loading, customersCount, petsCount }}
//       >
//          {children}
//       </TableContext.Provider>
//    )
// }

// export const useTableContext = () => {
//    const context = useContext(TableContext)
//    if (context === null) {
//       throw new Error('useTableContext must be used within the useTableProvider.')
//    }
//    return context
// }
