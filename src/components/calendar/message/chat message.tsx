import { MessageType } from '@/schemas/messages/messages-schema'

interface Props {
   message: MessageType
}

export default function MessageItem({ message }: Props) {
   return (
      <div className="flex flex-col items-end gap-3">
         <div className="flex w-full justify-center">
            <span className="rounded-full border border-white px-2 py-1 text-xs font-medium shadow-01">
               {message.sentOnDate}
            </span>
         </div>
         <div className="broder-grey-06 flex w-3/4 justify-end rounded-2xl border bg-white p-6">
            <div className="flex flex-col gap-1">
               <p>{message.content}</p>
               <div className="flex justify-end">
                  <p className="text-xs font-medium text-grey-02">{message.sentOnDay}</p>
               </div>
            </div>
         </div>
      </div>
   )
}
