import TabGroup from '@/components/common/tab-group'
import { FormTabEnum, formTabs } from '@/constants/customers-tabs'
import { Button, Loader } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import AppointmentForm from './appointment-form'
import useSWR from 'swr'
import { useAppointmentPanelStore } from '@/providers/appointment/appointment-panel-store-provider'
import { getFormsByAppointmentId } from '@/fetcher/appointment/queries/getForms'
import FormsListEmptyPlaceholder from '@/components/calendar/forms/forms-list-empty-placeholder'
import CalendarAddForm from '../add-form/calendar-add-form'

export default function AppointmentForms() {
   const [formNav, setFormNav] = useState<FormTabEnum>(FormTabEnum.CHECK_IN)
   const { selectedAppointmentId, appointmentInformationData } = useAppointmentPanelStore(
      (state) => state,
   )

   const [openAddFormModal, setOpenAddFormModal] = useState(false)

   const {
      data: getFormsData,
      isLoading: fetchingFormsList,
      isValidating,
   } = useSWR(
      selectedAppointmentId && appointmentInformationData
         ? [
              '/ui/loadAppointmentForms',
              selectedAppointmentId,
              appointmentInformationData.customerId,
              formNav.toUpperCase(),
           ]
         : null,
      ([url, appointmentId, customerId, formType]) =>
         getFormsByAppointmentId({ url, appointmentId, customerId, formType }),
   )

   const formsCount = getFormsData?.length ?? 0

   if (fetchingFormsList || isValidating) {
      return (
         <div className="flex h-[400px] items-center justify-center rounded-xl">
            <Loader />
         </div>
      )
   }

   return (
      <>
         <div className="px-10 py-6">
            <div className="flex flex-col gap-4">
               <div className="flex w-full justify-between">
                  <h4 className="text-xl font-medium">Forms Applied</h4>
                  <Button
                     color="secondary"
                     variant="text"
                     onClick={() => setOpenAddFormModal(true)}
                  >
                     + Add Form
                  </Button>
               </div>

               <div className="-mx-10">
                  <TabGroup
                     items={[
                        ...formTabs.map((tab) => ({
                           text: tab.name,
                           tab: tab.tab,
                        })),
                     ]}
                     activeTab={formNav}
                     setActiveTab={setFormNav}
                  />
               </div>
               <>
                  {formsCount > 0 ? (
                     <div className="grid grid-cols-2 justify-between gap-4">
                        {getFormsData?.map((form) => (
                           <AppointmentForm appointmentForm={form} key={form.title} />
                        ))}
                     </div>
                  ) : (
                     <FormsListEmptyPlaceholder />
                  )}
               </>
            </div>
         </div>
         <CalendarAddForm
            openAddFormModal={openAddFormModal}
            setOpenAddFormModal={setOpenAddFormModal}
         />
      </>
   )
}
