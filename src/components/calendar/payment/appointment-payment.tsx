import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState, useEffect } from 'react'

import PaymentTable from './payment-table'
import FaIcon from '@/components/common/fa-icon'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { getInvoiceForAppointment } from '@/fetcher/appointment/queries/getInvoiceForAppointment'

export default function AppointmentPayment() {
   const { selectedAppointmentId } = useAppointmentPanelStore((state) => state)

   const {
      data: getAppointmentInvoiceData,
      isLoading: fetchingAppointmentInvoice,
      mutate: refetchAppointmentInvoice,
   } = useSWR(
      selectedAppointmentId ? ['/appointmentV3/payments', selectedAppointmentId] : null,
      ([url, appointmentId]) => getInvoiceForAppointment({ url, appointmentId }),
   )

   if (fetchingAppointmentInvoice) {
      return (
         <div className="flex h-[400px] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   return (
      <div className="px-10 py-6">
         <div className="flex items-start gap-2">
            <h4 className="text-xl font-medium">Invoice ID 00120-5678-GO</h4>
            <Button variant="icon" className="p-0 pt-2">
               <FaIcon icon={faArrowUpRightFromSquare} size="xs" className="text-primary" />
            </Button>
         </div>
         <div className="flex flex-col gap-10 py-2">
            <PaymentTable invoiceItem={getAppointmentInvoiceData} />
         </div>
      </div>
   )
}
