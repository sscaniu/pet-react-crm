'use client'
import FaIcon from '@/components/common/fa-icon'
import { cn } from '@/lib/utils'
import {
   faBell,
   faBoltLightning,
   faFileInvoice,
   faPaperclip,
   faPaperPlane,
   faSmile,
} from '@fortawesome/free-solid-svg-icons'
import { Button, SearchInput } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'

export default function ChatPanelFooter() {
   const [openChatOptions, setOpenChatOptions] = useState(false)

   return (
      <div className="flex flex-col gap-4 rounded-b-2xl border-t border-grey-06 p-6 shadow-01">
         <div className="flex items-center gap-4">
            <Button variant="icon" className="p-0">
               <FaIcon icon={faSmile} />
            </Button>
            <Button variant="icon" className="p-0">
               <FaIcon icon={faPaperclip} />
            </Button>
            <div
               className="broder-grey-01 flex cursor-pointer items-center gap-4 rounded-full border px-4 py-1"
               onMouseEnter={() => setOpenChatOptions(true)}
               onMouseLeave={() => setOpenChatOptions(false)}
            >
               <p className="cursor-pointer select-none font-medium transition-all">
                  Other Options
               </p>

               <div
                  className={cn('flex gap-4 transition-all duration-300 ease-in-out', {
                     'max-w-0 translate-x-[-20px] overflow-hidden opacity-0': !openChatOptions,
                     'max-w-[200px] translate-x-0 opacity-100': openChatOptions,
                  })}
               >
                  <span className="h-4 w-[1px] bg-grey-01" />

                  <div className="flex items-center gap-6">
                     <Button variant="icon" className="p-0">
                        <FaIcon icon={faBell} />
                     </Button>
                     <Button variant="icon" className="p-0">
                        <FaIcon icon={faFileInvoice} />
                     </Button>

                     <Button variant="icon" className="p-0">
                        <FaIcon icon={faBoltLightning} />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            {/* Will need to build ChatInput for this case */}
            <SearchInput name="chat-message" placeholder="Type your message" />
            <Button variant="icon" className="aspect-square h-10 rounded-full bg-primary p-0">
               <FaIcon icon={faPaperPlane} size="lg" className="text-white" />
            </Button>
         </div>
      </div>
   )
}
