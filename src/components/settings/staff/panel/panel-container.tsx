'use client'
import FaIcon from '@/components/common/fa-icon'
import TabGroup from '@/components/common/tab-group'
import { staffsTableTabs } from '@/constants/staff-tabs'
import { cn } from '@/lib/utils'
import { useStaffTableStore } from '@/providers/staff/staff-table-store-provider'
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

interface Props {
   children: React.ReactNode
}

export default function PanelContainer({ children }: Props) {
   const { setTableTab, tableTab } = useStaffTableStore((state) => state)

   return (
      <div
         className={cn(
            /**
             * @description
             * Navbar height - 64px,
             * Padding Y - 48px
             */
            'flex min-h-[calc(100vh-64px-48px)] flex-1 flex-col rounded-2xl bg-white shadow-03 transition-all',
            {
               /**
                * @description
                * Filter panel width - 300px,
                * Gap - 24px
                */
               //    '-ml-[calc(300px+24px)]': !open,
            },
         )}
      >
         <div className="flex items-start justify-between border-b border-grey-06 p-6">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-4">
                  <h4 className="text-xl font-medium tracking-tight">Staff</h4>
                  <p className="text-sm font-medium text-grey-02">
                     Total active across all location
                     <FaIcon icon={faUser} className="px-2 text-grey-02" />
                     100
                  </p>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-6 p-8 pt-4">
            <TabGroup
               items={[
                  ...staffsTableTabs.map((tab) => ({
                     text: tab.name,
                     tab: tab.tab,
                  })),
               ]}
               activeTab={tableTab}
               setActiveTab={setTableTab}
            />

            {children}
         </div>
      </div>
   )
}
