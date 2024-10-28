import { updatePermission } from '@/fetcher/permissions/mutations/updatePermission'
import { loadPermissions } from '@/fetcher/permissions/queries/loadPermissions'
import {
   PermissionGroupListResponse,
   USER_ROLES,
   UserRole,
   userRoleValues,
} from '@/schemas/permissions/permissions-schema'
import { Checkbox, toast } from '@itsallsavvy/savvy-resuable-components'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function StaffRolesPermissions() {
   const [permissionGroups, setPermissionGroups] = useState<PermissionGroupListResponse>([])

   const { trigger: updatePermissionMutation } = useSWRMutation('/permissions', updatePermission)

   const handlePermissionChange = (
      groupIndex: number,
      permissionIndex: number,
      role: UserRole,
      checked: boolean,
   ) => {
      const roleKey = userRoleValues[role] as 'adminEnabled' | 'staffEnabled' | 'nonAdminEnabled' // Get the correct key from userRoleValues
      // Type assertion to indicate the exact structure
      const permission = permissionGroups[groupIndex].permissions[permissionIndex]

      // Assign the value
      permission[roleKey] = checked // Use roleKey

      console.log('got permission')
      console.log(permission)
      updatePermissionMutation(permission, {
         onSuccess: () => {
            setPermissionGroups((prevGroups) => {
               const newGroups = [...prevGroups]
               newGroups[groupIndex].permissions[permissionIndex] = permission
               return newGroups
            })
            toast.success('Permission has been saved')
         },
      })
   }

   const { data: loadPermissionsData } = useSWR(['/permissions/loadPermissions'], ([url]) =>
      loadPermissions({ url }),
   )

   useEffect(() => {
      if (loadPermissionsData) {
         setPermissionGroups(loadPermissionsData)
      }
   }, [loadPermissionsData])

   return (
      <div className="overflow-x-auto rounded-lg border border-grey-01">
         <table className="w-full">
            <thead>
               <tr className="bg-grey-06 align-top text-text-primary text-opacity-80">
                  <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">
                     <div className="flex flex-col gap-1">
                        <h6 className="text-sm font-medium">Non Grommer</h6>
                        <p className="text-xs font-medium text-grey-04">{`(Excluded from staff rota)`}</p>
                     </div>
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">Groomer</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">Admin</th>
               </tr>
            </thead>
            <tbody>
               {permissionGroups.map((group, groupIndex) => (
                  <React.Fragment key={group.name}>
                     <tr className="bg-primary/10">
                        <td colSpan={4} className="px-4 py-2 text-sm font-bold">
                           {group.name}
                        </td>
                     </tr>
                     {group.permissions.map((permission, permissionIndex) => (
                        <tr key={permission.id}>
                           <td className="px-4 py-2 text-sm text-opacity-80">
                              {permission.description}
                           </td>
                           <td className="px-4 py-2 text-center">
                              <Checkbox
                                 name={USER_ROLES.Enum.NON_ADMIN}
                                 checked={permission.nonAdminEnabled}
                                 onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                       groupIndex,
                                       permissionIndex,
                                       USER_ROLES.Enum.NON_ADMIN,
                                       checked as boolean,
                                    )
                                 }
                                 disabled={
                                    !!permission.lockedRoles?.find(
                                       (role) => role === USER_ROLES.Enum.NON_ADMIN,
                                    )
                                 }
                              />
                           </td>
                           <td className="px-4 py-2 text-center">
                              <Checkbox
                                 name={USER_ROLES.Enum.STAFF}
                                 checked={permission.staffEnabled}
                                 onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                       groupIndex,
                                       permissionIndex,
                                       USER_ROLES.Enum.STAFF,
                                       checked as boolean,
                                    )
                                 }
                                 disabled={
                                    !!permission.lockedRoles?.find(
                                       (role) => role === USER_ROLES.Enum.STAFF,
                                    )
                                 }
                              />
                           </td>
                           <td className="px-4 py-2 text-center">
                              <Checkbox
                                 name={USER_ROLES.Enum.ADMIN}
                                 checked={permission.adminEnabled}
                                 onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                       groupIndex,
                                       permissionIndex,
                                       USER_ROLES.Enum.ADMIN,
                                       checked as boolean,
                                    )
                                 }
                                 disabled={
                                    !!permission.lockedRoles?.find(
                                       (role) => role === USER_ROLES.Enum.ADMIN,
                                    )
                                 }
                              />
                           </td>
                        </tr>
                     ))}
                  </React.Fragment>
               ))}
            </tbody>
         </table>
      </div>
   )
}
