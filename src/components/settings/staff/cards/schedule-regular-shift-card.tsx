import TabGroup from '@/components/common/tab-group'
import { StaffRota } from '../table/staff-rota-columns'
import { RegularShiftTabEnum, regularShiftTabs } from '@/constants/staff-rota-regular-shift-tabs'
import { useStaffRotaTableStore } from '@/providers/staff/staff-rota-table-store-provider'
import ScheduleRegularShiftTimes from './schedule-regular-shift-times'
import { Button, ScrollArea } from '@itsallsavvy/savvy-resuable-components'
import ScheduleRegularShiftFrequency from './schedule-regular-shift-frequency'
import { useState } from 'react'
import ConfirmationRegularShift from './confirmation-regular-shift'

interface Props {
   staffRota: StaffRota
   closeRegularShiftModal: () => void
}

export default function ScheduleRegularShiftCard({ staffRota, closeRegularShiftModal }: Props) {
   const { regularShiftTab, setRegularShiftTab } = useStaffRotaTableStore((state) => state)

   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

   const element = {
      [RegularShiftTabEnum.SHIFT_TIME]: <ScheduleRegularShiftTimes staffRota={staffRota} />,
      [RegularShiftTabEnum.SHIFT_FREQUENCY]: <ScheduleRegularShiftFrequency />,
   }[regularShiftTab]

   const handleSaveChanges = () => {
      setIsConfirmationOpen(true)
   }

   if (isConfirmationOpen) {
      return (
         <ConfirmationRegularShift
            closeRegularShiftModal={closeRegularShiftModal}
            staffRota={staffRota}
         />
      )
   }

   return (
      <div className="flex w-full flex-col rounded-2xl border border-grey-06 bg-white shadow-01">
         <div className="border-b border-grey-01 px-10 py-6">
            <div>
               <div className="flex flex-col gap-1">
                  <h5 className="text-2xl font-medium">{staffRota.name}</h5>
               </div>
            </div>
         </div>
         <TabGroup
            items={[
               ...regularShiftTabs.map((tab) => ({
                  text: tab.name,
                  tab: tab.tab,
               })),
            ]}
            activeTab={regularShiftTab}
            setActiveTab={setRegularShiftTab}
         />
         <ScrollArea className="h-[70vh]">{element}</ScrollArea>
         <ActionButtons handleSaveChanges={handleSaveChanges} />
      </div>
   )
}

interface ActionButtonsProps {
   handleSaveChanges: () => void
}

const ActionButtons = ({ handleSaveChanges }: ActionButtonsProps) => (
   <div className="flex items-center justify-between border-t border-grey-06 px-10 py-6">
      <Button variant="text" className="text-red-01 hover:text-red-02">
         Delete
      </Button>
      <Button color="secondary" onClick={handleSaveChanges}>
         Save
      </Button>
   </div>
)
