import FaIcon from '@/components/common/fa-icon'
import TabGroup from '@/components/common/tab-group'
import FormsListEmptyPlaceholder from '@/components/customers/forms/forms-list-empty-placeholder'
import { FormTabEnum, formTabs } from '@/constants/customers-tabs'
import { getFormsByCustomerId } from '@/fetcher/customers-and-pets/queries/getForms'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Loader, SearchInput } from '@itsallsavvy/savvy-resuable-components'
import { useState } from 'react'
import useSWR from 'swr'
import CustomerForm from './customer-form'
import FilterDropdownButton from './filter-dropdown-button'
import CustomerAddForm from '../add-form/customer-add-form'

export default function CustomerForms() {
   const [formNav, setFormNav] = useState<FormTabEnum>(FormTabEnum.CHECK_IN)
   const { selectedCustomerId } = useCustomerTableStore((state) => state)
   const [openAddFormModal, setOpenAddFormModal] = useState(false)

   const {
      data: getFormsData,
      isLoading: fetchingFormsList,
      isValidating,
   } = useSWR(
      selectedCustomerId
         ? ['/ui/loadCustomerForms', selectedCustomerId, formNav.toUpperCase()]
         : null,
      ([url, id, formType]) => getFormsByCustomerId({ url, id, formType }),
   )

   const formsCount = getFormsData?.length ?? 0

   const handleOpenAddForm = () => {
      setOpenAddFormModal(true)
   }

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
            <div className="flex flex-col gap-6">
               <h4 className="text-xl font-medium">Forms Applied</h4>
               <div className="flex items-center gap-4">
                  <SearchInput name="form-search" placeholder="Search Forms" />

                  <FilterDropdownButton />
                  <Button
                     className="flex-shrink-0"
                     color="secondary"
                     leftIcon={<FaIcon icon={faPlus} size="sm" />}
                     onClick={handleOpenAddForm}
                  >
                     Add Form
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
                           <CustomerForm customerForm={form} key={form.title} />
                        ))}
                     </div>
                  ) : (
                     <FormsListEmptyPlaceholder />
                  )}
               </>
            </div>
         </div>
         <CustomerAddForm
            openAddFormModal={openAddFormModal}
            setOpenAddFormModal={setOpenAddFormModal}
         />
      </>
   )
}
