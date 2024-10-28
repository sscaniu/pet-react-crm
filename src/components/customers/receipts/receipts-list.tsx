import TabGroup from '@/components/common/tab-group'
import { receiptTabs } from '@/constants/customers-tabs'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import ReceiptsTable from './receipts-table'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import useSWR from 'swr'
import { DateRangePicker, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import { subDays } from 'date-fns'
import { listInvoicesForCustomer } from '@/fetcher/invoice/queries/listInvoicesForCustomer'
import { format } from 'date-fns'
import EmptyPlaceholder from '@/components/ui/empty-placeholder'

interface DateRange {
   from: Date | undefined
   to?: Date | undefined
}

export default function ReceiptsList() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)
   const { receiptNav, setReceiptNav } = useSidebarNavStore((state) => state)
   const [date, setDate] = useState<DateRange>({
      from: subDays(new Date(), 7),
      to: new Date(),
   })

   const {
      data: listInvoicesData,
      isLoading: fetchingInvoices,
      mutate: refetchInvoices,
      isValidating,
   } = useSWR(
      date?.from && date?.to
         ? [
              '/invoice/listForCustomer',
              {
                 customerId: selectedCustomerId,
                 receiptType: receiptNav.toUpperCase(),
                 start: format(date.from, 'yyyy-MM-dd'),
                 end: format(date.to, 'yyyy-MM-dd'),
                 pageNum: 1,
                 pageSize: 20,
              },
           ]
         : null,
      ([url, args]) => listInvoicesForCustomer({ url, args }),
   )

   const receiptsCount = listInvoicesData?.contents?.length ?? 0
   const receiptsCountLabel = `${receiptsCount} Receipt${receiptsCount === 1 ? 'foo' : 's'}`

   const setDateAndRefetch = (selectedDate: DateRange) => {
      setDate(selectedDate)
      refetchInvoices()
   }

   if (fetchingInvoices || isValidating) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <>
         <TabGroup
            items={[
               ...receiptTabs.map((tab) => ({
                  text: tab.name,
                  tab: tab.tab,
               })),
            ]}
            activeTab={receiptNav}
            setActiveTab={setReceiptNav}
         />
         <div className="px-10 py-6">
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between">
                  <h4 className="text-xl font-medium">{receiptsCountLabel}</h4>
                  <DateRangePicker
                     name="receipts-date-range"
                     value={date}
                     onChange={setDateAndRefetch as any} // Pass the function directly
                     className="w-fit"
                  />
               </div>
               {receiptsCount > 0 ? (
                  <>
                     <ReceiptsTable receiptsListData={listInvoicesData} />
                  </>
               ) : (
                  <EmptyPlaceholder message="No receipt data found for this customer." />
               )}
            </div>
         </div>
      </>
   )
}
