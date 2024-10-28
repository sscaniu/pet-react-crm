import { useState } from 'react'

export default function usePagination(initialSize = 10) {
   const [pagination, setPagination] = useState({
      pageSize: initialSize,
      pageIndex: 0,
   })
   const { pageSize, pageIndex } = pagination

   return {
      onPaginationChange: setPagination,
      pagination,
      pageSize,
      pageIndex,
   }
}
