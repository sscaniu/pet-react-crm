import { DatePicker, SelectBox } from '@itsallsavvy/savvy-resuable-components'

export default function ScheduleRegularShiftFrequency() {
   return (
      <div className="flex flex-col gap-6 px-10 py-6">
         <h6 className="text-xl font-medium">Shift Frequency</h6>
         <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
               <h6 className="text-sm font-bold">Repeat this schedule</h6>
               <SelectBox name="repeat schedule" options={[]} />
            </div>
            <div className="flex flex-col gap-2">
               <h6 className="text-sm font-bold">Set Start & End Date</h6>
               <div className="flex items-center gap-6">
                  {/* Label should be inside */}
                  <DatePicker name="start-date" label="Start" />
                  <DatePicker name="end-date" label="End" />
               </div>
            </div>
         </div>
      </div>
   )
}
