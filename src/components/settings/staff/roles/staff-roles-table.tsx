import StaffRolesPermissions from './staff-roles-permissions'

export default function StaffRolesTable() {
   return (
      <div className="flex flex-col gap-6">
         <div className="flex flex-col gap-1">
            <h6 className="font-medium">Staff Roles</h6>
            <p className="text-sm text-grey-04">Set up permissions for each staff role.</p>
         </div>
         <StaffRolesPermissions />
      </div>
   )
}
