import { Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState, useEffect } from 'react'
import ProductsTable from './products-table'
import ReceiptBill from './receipt-bill'
import ServicesTable from './services-table'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import useSWR from 'swr'
import { getReceipt } from '@/fetcher/customers-and-pets/queries/getReceipt'

export default function ReceiptDetails() {
   // TODO: Setup the actual data fetching when the API is ready
   // Might need to refactor the components according to the API schema.
   // Retrieve services, products and receipt bills from `receiptData` or integrate new APIs for these.
   // const { receiptData, fetchingReceipt } = useSWR(['RECEIPT_ENDPOINT', receiptId], ([url, id]) => getUserReceipts({url, receiptId: id}))
   const { selectedReceiptId } = useCustomerDetailsStore((state) => state)

   const {
      data: getReceiptData,
      isLoading: fetchingReceipt,
      mutate: refetchReceipt,
      isValidating,
   } = useSWR(
      selectedReceiptId ? ['/invoice/receipt', selectedReceiptId] : null,
      ([url, invoiceId]) => getReceipt({ url, invoiceId }),
   )

   // TODO: remove fake loading once API integrated
   const [loading, setLoading] = useState(true)

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
      <div>
         <div className="flex flex-col gap-10 px-10 pb-24 pt-6">
            <ServicesTable receiptData={getReceiptData} />
            <ProductsTable receiptData={getReceiptData} />
         </div>
         <ReceiptBill receiptData={getReceiptData} />
      </div>
   )
}
