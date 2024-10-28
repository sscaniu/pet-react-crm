import CustomerCardDetails from '@/components/ui/customer-card-details'
import CustomerInformation from './customer-information'
import PetInformation from './pet-information'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import useSWR from 'swr'
import { useEffect } from 'react'
import { loadAppointmentCustomerInfo } from '@/fetcher/appointment/queries/loadAppointmenCustomertInfo'
import { Loader } from '@itsallsavvy/savvy-resuable-components'

export default function AppointmentInformation() {
   const { appointmentInformationData } = useAppointmentPanelStore((state) => state)

   const {
      data: appointmentCustomerInformationData,
      isLoading: fetchingAppointmentCustomerInformation,
   } = useSWR(
      appointmentInformationData?.customerId
         ? ['/appointmentV3/customerInfo', appointmentInformationData.customerId]
         : null,
      ([url, id]) => loadAppointmentCustomerInfo({ url, id }),
   )

   if (fetchingAppointmentCustomerInformation) {
      return (
         <div className="flex h-[400px] w-full items-center justify-center">
            <Loader />
         </div>
      )
   }

   return (
      <div className="flex flex-col gap-10 px-10 py-6">
         <CustomerInformation
            appointmentCustomerInfo={appointmentCustomerInformationData}
            appointmentInfo={appointmentInformationData}
         />
         <PetInformation pets={appointmentCustomerInformationData?.pets} />(
         {appointmentCustomerInformationData && (
            <CustomerCardDetails
               nameOnCard={appointmentCustomerInformationData.nameOnCard}
               lastFourCardNumber={appointmentCustomerInformationData.cardNumber}
            />
         )}
         )
      </div>
   )
}
