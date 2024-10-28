import { SetStateAction } from 'react'
import AddForm from '../../shared/add-form/add-form'
import { CustomerType, PetType } from '@/components/shared/add-form/customer-and-pets-form'
import AddFormModal from '@/components/shared/modals/add-form-modal'
import { FormTemplate } from '@/schemas/forms/form-templates-schema'

// Dummy data
const CUSTOMER: CustomerType = { id: '001', name: 'Sasha Fierce' }
const PETS: PetType[] = [
   { id: '001', name: 'Frya', petType: 'Pit Bull' },
   { id: '002', name: 'Kindo', petType: 'Retriever' },
]

const initialFormData: FormTemplate[] = [
   {
      id: '01',
      name: 'Appointment Check-In Form',
      type: 'Check-In Form',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
   {
      id: '02',
      name: 'Grooming Release Form',
      type: 'Contract',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
   {
      id: '03',
      name: 'Matted Fur',
      type: 'Contract',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
   {
      id: '04',
      name: 'Policies and Procedures',
      type: 'Other',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
   {
      id: '05',
      name: 'Policies and Procedures',
      type: 'Other',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
   {
      id: '06',
      name: 'Policies and Procedures',
      type: 'Other',
      sendTo: 'New Customers',
      sendOn: 'Before Appointment',
      status: 'Active',
   },
]

interface Props {
   openAddFormModal: boolean
   setOpenAddFormModal: React.Dispatch<SetStateAction<boolean>>
}

export default function CalendarAddForm({ openAddFormModal, setOpenAddFormModal }: Props) {
   // const { trigger: addFormMutation } = useSWRMutation('/customer/form', addForm)

   const handleSubmitForm = async (formData: any) => {
      // addFormMutation(formData)
   }

   return (
      <AddFormModal openModal={openAddFormModal} setOpenModal={setOpenAddFormModal}>
         <AddForm
            onSubmit={handleSubmitForm}
            customer={CUSTOMER}
            pets={PETS}
            closeModal={() => setOpenAddFormModal(false)}
            availableForms={initialFormData}
         />
      </AddFormModal>
   )
}
