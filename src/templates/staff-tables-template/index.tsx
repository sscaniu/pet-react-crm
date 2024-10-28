import { StaffTableTabEnum } from '@/constants/staff-tabs'
import { useStaffTableStore } from '@/providers/staff/staff-table-store-provider'
import StaffsListTableTemplate from '../staffs-list-table-template'
import StaffRotaTableTemplate from '../staff-rota-table-template'
import { StaffRotaTableStoreProvider } from '@/providers/staff/staff-rota-table-store-provider'
import StaffRolesTable from '@/components/settings/staff/roles/staff-roles-table'

export default function StaffTablesTemplate() {
   const { tableTab } = useStaffTableStore((state) => state)

   const tableElement = {
      [StaffTableTabEnum.LIST]: <StaffsListTableTemplate />,
      [StaffTableTabEnum.ROTA]: (
         <StaffRotaTableStoreProvider>
            <StaffRotaTableTemplate />
         </StaffRotaTableStoreProvider>
      ),
      [StaffTableTabEnum.ROLES]: <StaffRolesTable />,
   }[tableTab]

   return <>{tableElement}</>
}
