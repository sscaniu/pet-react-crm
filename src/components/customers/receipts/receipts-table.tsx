import FaIcon from '@/components/common/fa-icon'
import { ReceiptViewEnum } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   Loader,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { ListInvoicesForCustomerResponse } from '@/schemas/invoice/invoices-schema'

interface Props {
   receiptsListData?: ListInvoicesForCustomerResponse
}

export default function ReceiptsTable({ receiptsListData }: Props) {
   const { setReceiptView } = useSidebarNavStore((state) => state)

   // TODO: Setup the actual data fetching when the API is ready
   //   const { receiptsData, fetchingReceipts } = useSWR('RECEIPTS_ENDPOINT', getReceipts)

   // TODO: remove fake loading once API integrated
   const [loading, setLoading] = useState(true)

   const handleSelectRow = (id: string) => {
      setReceiptView(ReceiptViewEnum.DETAILS)
   }

   const formatDateIssued = (date: Date) => {
      return format(date, 'dd MMM yyyy h:mma')
   }

   useEffect(() => {
      const timeout = setTimeout(() => {
         setLoading(false)
      }, 1000)
      return () => clearTimeout(timeout)
   }, [])

   if (loading) {
      return (
         <div className="flex h-[400px] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col gap-2">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Date Issued</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {receiptsListData?.contents?.map((receipt) => (
                  <TableRow key={receipt.id} onClick={() => handleSelectRow(receipt.id)}>
                     <TableCell>{receipt.dateIssued}</TableCell>
                     <TableCell>{receipt.invoiceNumber}</TableCell>
                     <TableCell>{receipt.amount}</TableCell>
                     <TableCell>
                        <FaIcon icon={faChevronRight} />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <Button className="font-medium hover:underline" variant="text">
            See all
         </Button>
      </div>
   )
}
