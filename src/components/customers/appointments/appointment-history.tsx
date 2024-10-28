import AppointmentHistoryTable from './appointent-history-table'
import Link from 'next/link'

export default function AppointmentHistory() {
   return (
      <div className="flex flex-col gap-6">
         <div className="flex items-end justify-between pb-4">
            <h4 className="text-xl font-medium">Appointment History</h4>

            <Link href={'/appointments'}>See more</Link>
         </div>
         <AppointmentHistoryTable />
      </div>
   )
}
