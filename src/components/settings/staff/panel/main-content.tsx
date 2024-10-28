'use client'
import StaffTablesTemplate from '@/templates/staff-tables-template'
import AddStaffModal from '../modals/add-staff-modal'
import PanelContainer from './panel-container'

export default function MainContent() {
   return (
      <>
         <PanelContainer>
            <StaffTablesTemplate />
         </PanelContainer>
         <AddStaffModal />
      </>
   )
}
