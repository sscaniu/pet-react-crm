import { ScrollArea } from '@itsallsavvy/savvy-resuable-components'
import MessageItem from './chat message'
import useSWR from 'swr'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { getAppointmentMessagesByLinkId } from '@/fetcher/appointment/queries/getAppointmentMessages'

// demo message

export default function ChatBox() {
   const { selectedAppointmentId, appointmentInformationData } = useAppointmentPanelStore(
      (state) => state,
   )

   const {
      data: getMessagesData,
      isLoading: fetchingMessagesList,
      isValidating,
   } = useSWR(
      selectedAppointmentId && appointmentInformationData
         ? [
              '/message/messageSummariesForLinkedInstance',
              appointmentInformationData.customerId,
              1,
              10,
           ]
         : null,
      ([url, linkId, pageNum, pageSize]) =>
         getAppointmentMessagesByLinkId({ url, linkId, pageNum, pageSize }),
   )

   return (
      <ScrollArea className="h-[50vh] bg-grey-00 px-8 py-2">
         <div className="flex w-full justify-end">
            <div className="flex flex-col gap-10">
               {getMessagesData?.map((message) => (
                  <MessageItem key={message.id} message={message} />
               ))}
            </div>
         </div>
      </ScrollArea>
   )
}
