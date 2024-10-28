import FaIcon from '@/components/common/fa-icon'
import { FlagTypeEnum, getAllFlags } from '@/fetcher/customers-and-pets/queries/getAllFlags'
import { CalendarAppointmentData } from '@/schemas/calendar/calendar-schema'
import { CustomerFlagsResponse } from '@/schemas/customers-and-pets/flags-schema'
import { FlagsData } from '@/types/utils'
import { faCheck, faDog, faHourglassHalf, faUser } from '@fortawesome/free-solid-svg-icons'
import { AppointmentProps, Badge } from '@itsallsavvy/savvy-resuable-components'
import { format } from 'date-fns'
import useSWR from 'swr'
import AppointmentFlagSkeleton from './appointment-flag-skeleton'

interface Props {
   appointment: AppointmentProps<CalendarAppointmentData>
}

export default function AppointmentBody({
   appointment: { data, endDateTimeString, startDateTimeString },
}: Props) {
   const { data: getAllCustomerFlagsData, isLoading: fetchingCustomerFlags } = useSWR(
      ['/flagDef/byType', FlagTypeEnum.CUSTOMER],
      ([url, type]) => getAllFlags<CustomerFlagsResponse>({ type, url }),
   )

   const { data: getAllPetFlagsData, isLoading: fetchingPetFlags } = useSWR(
      ['/flagDef/byType', FlagTypeEnum.PET],
      ([url, type]) => getAllFlags<CustomerFlagsResponse>({ type, url }),
   )

   const customerFlagsData = getAllCustomerFlagsData?.flagDefinitions.reduce((acc, flag) => {
      acc[flag.id] = flag
      return acc
   }, {} as FlagsData)

   const petFlagsData = getAllPetFlagsData?.flagDefinitions.reduce((acc, flag) => {
      acc[flag.id] = flag
      return acc
   }, {} as FlagsData)

   const renderAptStatusIcon = (status?: string) => {
      switch (status) {
         case 'CONFIRMED':
            return (
               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green">
                  <FaIcon icon={faCheck} size="xs" className="text-white" />
               </span>
            )

         case 'CREATED':
            return (
               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow">
                  <FaIcon icon={faHourglassHalf} size="xs" className="text-white" />
               </span>
            )

         default:
            return (
               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow">
                  <FaIcon icon={faHourglassHalf} size="xs" className="text-white" />
               </span>
            )
      }
   }

   return (
      <div className="flex flex-col gap-2 px-3 py-1.5">
         <div className="flex justify-between gap-1">
            <p className="truncate text-sm font-bold">{`${format(new Date(startDateTimeString), 'hh:mm')} - ${format(new Date(endDateTimeString), 'hh:mm a')}`}</p>
            <div className="">{renderAptStatusIcon(data?.status)}</div>
         </div>
         <div className="flex flex-col gap-1">
            <div className="flex gap-1">
               <FaIcon icon={faDog} size="xs" />
               <p className="truncate text-xs font-bold">{`${data?.petName} (${data?.petType})`}</p>
            </div>
            <div className="flex gap-1">
               <FaIcon icon={faUser} size="xs" />
               <p className="truncate text-xs font-bold">{data?.customerName}</p>
            </div>
         </div>
         <div className="flex gap-1">
            {(data?.customerFlags || data?.petFlags) && (
               <>
                  {fetchingCustomerFlags || fetchingPetFlags ? (
                     [...Array(3)].map((_, index) => <AppointmentFlagSkeleton key={index} />)
                  ) : (
                     <>
                        {data?.customerFlags?.map((cFlag) => (
                           <Badge
                              key={`${cFlag}-customer`}
                              className="border-0 bg-text-primary/5 text-text-primary"
                           >
                              {customerFlagsData?.[cFlag].name}
                           </Badge>
                        ))}
                        {data?.petFlags?.map((pFlag) => (
                           <Badge
                              key={`${pFlag}-customer`}
                              className="border-0 bg-text-primary/5 text-text-primary"
                           >
                              {petFlagsData?.[pFlag].name}
                           </Badge>
                        ))}
                     </>
                  )}
               </>
            )}
         </div>
      </div>
   )
}
