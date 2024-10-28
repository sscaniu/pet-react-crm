import ChatBox from './chat-box'
import ChatPanelFooter from './chat-panel-footer'
import ChatPanelHeader from './chat-panel-header'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import useSWR from 'swr'
import { loadAppointmentCustomerInfo } from '@/fetcher/appointment/queries/loadAppointmenCustomertInfo'

export default function ChatPanel() {
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

   return (
      <div className="w-full rounded-2xl border border-grey-06 bg-white shadow-01">
         <ChatPanelHeader appointmentCustomerInfo={appointmentCustomerInformationData} />
         <ChatBox />
         <ChatPanelFooter />
      </div>
   )
}
