import AddStaffModalForm from './add-staff-modal-form'
interface Props {
   closeAddStaffModal: () => void
}
export default function AddStaffModalCard({ closeAddStaffModal }: Props) {
   return (
      <div className="flex flex-col gap-6 rounded-2xl bg-white p-10">
         <h4 className="text-2xl font-medium">Add Staff</h4>
         <AddStaffModalForm closeAddStaffModal={closeAddStaffModal} />
      </div>
   )
}
