import ActivityUpdate from './activity-update'
import { Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { getNotificationsByCustomerId } from '@/fetcher/customers-and-pets/queries/getNotifications'
import ActivityListEmptyPlaceholder from '@/components/customers/activity-updates/activity-list-empty-placeholder'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'

export type UpdateType = {
   title: string
   description: string
   dateIssued: Date
}

export default function ActivityUpdatesList() {
   const { selectedCustomerId } = useCustomerTableStore((state) => state)

   const {
      data: getNotificationsByCustomerData,
      isLoading: fetchingCustomerNotifications,
      mutate: refetchCustomerNotifications,
   } = useSWR(
      selectedCustomerId ? ['/notification/customer', selectedCustomerId, 1, 10] : null,
      ([url, id, pageNum, pageSize]) =>
         getNotificationsByCustomerId({ url, id, pageNum, pageSize }),
   )

   const notificationsCount = getNotificationsByCustomerData?.length ?? 0

   if (fetchingCustomerNotifications) {
      return (
         <div className="flex h-[400px] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   return (
      <div className="">
         {notificationsCount > 0 ? (
            <>
               {getNotificationsByCustomerData?.map((notification) => (
                  <ActivityUpdate key={notification.title} notification={notification} />
               ))}
            </>
         ) : (
            <ActivityListEmptyPlaceholder />
         )}
      </div>
   )
}
