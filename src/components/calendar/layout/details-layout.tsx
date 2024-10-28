import FaIcon from '@/components/common/fa-icon'
import { sidebarNavs } from '@/constants/appointment-tabs'
import { useAppointmentDrawerStore } from '@/providers/appointment/appointment-drawer-store-provider'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { faBell, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import InvoiceFooter from './invoice-footer'
import SidebarNavigation from './sidebar-nav'
import useSWR from 'swr'
import { Fragment, useEffect } from 'react'
import { loadAppointmentByAppointmentId } from '@/fetcher/appointment/queries/loadAppointmentInfoByAppointmentId'

interface Props {
   children: React.ReactNode
}

export default function AppointmentDetailsLayout({ children }: Props) {
   const { setOpenDrawer } = useAppointmentDrawerStore((state) => state)
   const { selectedAppointmentId, setAppointmentInformationData } = useAppointmentPanelStore(
      (state) => state,
   )

   const { data: appointmentInformationData, isLoading: fetchingAppointmentInformation } = useSWR(
      selectedAppointmentId ? ['/appointmentV3', selectedAppointmentId] : null,
      ([url, id]) => loadAppointmentByAppointmentId({ url, id }),
   )

   const detailsElement = (
      <>
         <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4">
               <>
                  <div className="flex items-center gap-4">
                     <h4 className="text-2xl font-medium">{appointmentInformationData?.date}</h4>
                  </div>

                  <div className="flex flex-col gap-1 text-xs font-medium">
                     <div className="flex items-center gap-2">
                        <p className="font-medium">{appointmentInformationData?.startEndTime}</p>
                        <span className="h-1 w-1 rounded-full bg-text-primary" />
                        <p className="font-medium">{`Doesn't repeat`}</p>
                     </div>
                     <div className="flex items-center gap-2">
                        {appointmentInformationData?.petNames.map((petName, index) => (
                           <Fragment key={index}>
                              {index > 0 ? (
                                 <span className="h-1 w-1 rounded-full bg-text-primary" />
                              ) : (
                                 ''
                              )}
                              <p key={index} className="font-medium">
                                 {petName}
                              </p>
                           </Fragment>
                        ))}
                     </div>
                  </div>
               </>
            </div>
         </div>
         <div className="flex items-center gap-6 text-grey-04">
            <Badge className="gap-2">
               <FaIcon icon={faCircleCheck} className="h-4 w-4" />
               {appointmentInformationData?.appointmentStatus}
            </Badge>
            <Button variant="icon">
               <FaIcon icon={faBell} size="xl" />
            </Button>

            <Button variant="icon" onClick={() => setOpenDrawer(false)}>
               <FaIcon icon={faXmark} size="xl" />
            </Button>
         </div>
      </>
   )

   useEffect(() => {
      if (appointmentInformationData) {
         setAppointmentInformationData(appointmentInformationData)
      }
   }, [appointmentInformationData, setAppointmentInformationData])

   return (
      <aside className="flex items-stretch">
         <SidebarNavigation navs={sidebarNavs} />
         {fetchingAppointmentInformation ? (
            <div className="flex h-screen w-full items-center justify-center">
               <Loader />
            </div>
         ) : (
            <div className="flex min-h-screen w-full flex-1 flex-col justify-between">
               <div className="">
                  <div className="flex flex-col gap-6 pt-10">
                     <div className="flex items-start px-10">{detailsElement}</div>
                     <div className="w-full px-10">
                        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
                     </div>
                  </div>

                  {children}
               </div>

               <InvoiceFooter appointment={appointmentInformationData} />
            </div>
         )}
      </aside>
   )
}
