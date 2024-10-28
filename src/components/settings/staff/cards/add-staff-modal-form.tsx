'use client'
import FaIcon from '@/components/common/fa-icon'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   Checkbox,
   PhoneNumberInput,
   ScrollArea,
   SelectBox,
   TextInput,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { useEffect, useState } from 'react'
import InviteEmployeeCard from './invite-employee-card'
import { useForm } from '@mantine/form'
import {
   createStaffActionSchema,
   CreateStaffActionValues,
} from '@/schemas/form-schemas/create-staff-action-schema'
import { formResolve } from '@/schemas/form-schemas'
import { COUNTRY, NATIONAL_NUMBER } from '@/constants/utils'
import useSWRMutation from 'swr/mutation'
import { createUser } from '@/fetcher/staff/mutations/createUser'
import {
   userRoleLabels,
   UserRole,
   dashboardPermissionLevelLabels,
   DashboardPermissionLevel,
   CreateUserArgs,
} from '@/schemas/staff/create-user-schema'
import { DynamicSuccessMessage } from '@/constants/message'
import { useStaffTableStore } from '@/providers/staff/staff-table-store-provider'
import { cn } from '@/lib/utils'
import StoreLocationDropdown from '@/components/ui/store-location-dropdown'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'

interface Props {
   closeAddStaffModal: () => void
}
export default function AddStaffModalForm({ closeAddStaffModal }: Props) {
   const [userMobilePrefix, setUserMobilePrefix] = useState('')
   const [isInviteEmployeeEnabled, setIsInviteEmployeeEnabled] = useState(false)

   const { refetchStaffList } = useStaffTableStore((state) => state)

   const loading = false
   const btnIsDisabled = false

   const { trigger: createUserMutation, isMutating: creatingUser } = useSWRMutation(
      '/users/createUser',
      createUser,
   )

   // Convert user role enum to options
   const userRoleOptions = Object.keys(userRoleLabels).map((value) => ({
      label: userRoleLabels[value as UserRole],
      value,
   }))

   // Convert dashboard permission level enum to options
   const dashboardPermLevelOptions = Object.keys(dashboardPermissionLevelLabels).map((value) => ({
      label: dashboardPermissionLevelLabels[value as DashboardPermissionLevel],
      value,
   }))

   const form = useForm<CreateStaffActionValues>({
      initialValues: {
         name: '',
         email: '',
         mobile: '',
         telephone: '',
         defaultLocationId: '',
         userMobilePrefix: '',
         userRole: '',
         enableOnlineBooking: false,
         inviteToDashboard: false,
         dashboardPermissionLevel: '',
      },
      validate: formResolve(createStaffActionSchema),
      transformValues: (values) => ({
         name: values.name,
         email: values.email,
         mobile: values.mobile,
         telephone: `${userMobilePrefix}${values.mobile}`,
         defaultLocationId: values.defaultLocationId,
         userMobilePrefix: values.userMobilePrefix,
         userRole: values.userRole,
         enableOnlineBooking: values.enableOnlineBooking,
         inviteToDashboard: isInviteEmployeeEnabled,
         dashboardPermissionLevel: values.dashboardPermissionLevel,
      }),
   })

   const handleSubmitAction = async ({
      name,
      email,
      telephone,
      defaultLocationId,
      userRole,
      enableOnlineBooking,
      inviteToDashboard,
      dashboardPermissionLevel,
   }: CreateStaffActionValues) => {
      const [firstName, ...lastName] = name.trim().split(' ')

      const createUserArgs: CreateUserArgs = {
         emailAddress: email,
         firstName,
         lastName: lastName.join(' '),
         mobilePhoneNumberObj: {
            country: COUNTRY,
            internationalNumber: telephone,
            nationalNumber: NATIONAL_NUMBER,
         },
         userRole: userRole as any,
         defaultLocationId,
         enableOnlineBooking,
         inviteToDashboard,
         dashboardPermissionLevel: dashboardPermissionLevel as any,
      }

      createUserMutation(createUserArgs, {
         onSuccess: async () => {
            await refetchStaffList?.()
            closeAddStaffModal()
            toast.success(DynamicSuccessMessage.CREATE_USER_COMPLETED(name))
         },
      })
   }

   useEffect(() => {
      if (userMobilePrefix) {
         form.setFieldValue('userMobilePrefix', userMobilePrefix)
      }
   }, [userMobilePrefix, form])

   return (
      <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSubmitAction)}>
         <ScrollArea className="h-[70vh]">
            <div className="flex flex-col gap-6">
               <TextInput
                  label="Full Name"
                  name="fullname"
                  required
                  {...form.getInputProps('name')}
                  {...(form.errors['name'] && {
                     errorMessage: form.errors['name'] as string,
                  })}
               />
               <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  {...form.getInputProps('email')}
                  {...(form.errors['email'] && {
                     errorMessage: form.errors['email'] as string,
                  })}
               />

               <PhoneNumberInput
                  name="contact number"
                  label="Contact Number"
                  numberPrefix={userMobilePrefix}
                  onNumberPrefixChange={(value) => setUserMobilePrefix(value)}
                  options={[
                     { label: '+44', value: '+44' },
                     { label: '+66', value: '+66' },
                  ]}
                  {...form.getInputProps('mobile')}
                  {...(form.errors['mobile'] && {
                     errorMessage: form.errors['mobile'] as string,
                  })}
               />

               <StoreLocationDropdown
                  required
                  label="Assigned to store location"
                  name="store location"
                  {...form.getInputProps('defaultLocationId')}
                  {...(form.errors['defaultLocationId'] && {
                     errorMessage: form.errors['defaultLocationId'] as string,
                  })}
               />

               <SelectBox
                  required
                  name="staff-role"
                  label="Role"
                  options={userRoleOptions}
                  placeholder="Role"
                  {...form.getInputProps('userRole')}
                  {...(form.errors['userRole'] && {
                     errorMessage: form.errors['userRole'] as string,
                  })}
               />

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <Checkbox
                        name="online appointment"
                        checked={form.values.enableOnlineBooking}
                        onCheckedChange={(checked: boolean) =>
                           form.setFieldValue('enableOnlineBooking', checked)
                        }
                     />
                     <p>Enable online appointment booking with this staff.</p>
                  </div>
                  <FaIcon icon={faCircleInfo} />
               </div>

               <InviteEmployeeCard
                  isInviteEmployeeEnabled={isInviteEmployeeEnabled}
                  setIsInviteEmployeeEnabled={setIsInviteEmployeeEnabled}
               />
               <div
                  className={cn(`transition-all duration-300 ease-in-out`, {
                     'max-h-screen opacity-100': isInviteEmployeeEnabled,
                     'max-h-0 overflow-hidden opacity-0': !isInviteEmployeeEnabled,
                  })}
               >
                  <SelectBox
                     name="permission-level"
                     label="Permission Level"
                     options={dashboardPermLevelOptions}
                     placeholder="Permission Level"
                     {...form.getInputProps('dashboardPermissionLevel')}
                     {...(form.errors['dashboardPermissionLevel'] && {
                        errorMessage: form.errors['dashboardPermissionLevel'] as string,
                     })}
                  />
               </div>
            </div>
         </ScrollArea>

         <div className="flex justify-end">
            <Button type="submit" color="secondary" isLoading={loading} isDisabled={btnIsDisabled}>
               Add
            </Button>
         </div>
      </form>
   )
}
