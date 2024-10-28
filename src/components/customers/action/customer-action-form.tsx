import FaIcon from '@/components/common/fa-icon'
import { SidebarActionEnum, SidebarNavEnum } from '@/constants/customers-tabs'
import { DynamicSuccessMessage, FormErrorMessage } from '@/constants/message'
import { COUNTRY, NATIONAL_NUMBER, optIn } from '@/constants/utils'
import { createCustomer } from '@/fetcher/customer/mutations/createCustomer'
import { editCustomer } from '@/fetcher/customer/mutations/editCustomer'
import { cn, retrieveNumberAndPrefix } from '@/lib/utils'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import {
   altGenderSchema,
   CustomerInformationResponse,
   genderSchema,
} from '@/schemas/customer/customer-information-schema'
import { formResolve } from '@/schemas/form-schemas'
import {
   customerActionSchema,
   CustomerActionValues,
} from '@/schemas/form-schemas/customer-action-schema'
import { FlagsData } from '@/types/utils'
import { faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   MultiSelectBox,
   MultiSelectOption,
   PhoneNumberInput,
   SelectBox,
   TextInput,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function CustomerActionForm() {
   const { setOpenDrawer } = useCustomerDrawerStore((state) => state)
   const { action, setCreateCustomerFields, setMainNav, createCustomerFields } = useSidebarNavStore(
      (state) => state,
   )
   const { refetchCustomersAndPets, selectedCustomerId, flags } = useCustomerTableStore(
      (state) => state,
   )
   const { customerInformationData, refetchCustomerInformation } = useCustomerDetailsStore(
      (state) => state,
   )

   const [customerMobilePrefix, setCustomerMobilePrefix] = useState('')
   const [altContactMobilePrefix, setAltContactMobilePrefix] = useState('')
   const isEditAction = action === SidebarActionEnum.EDIT

   const flagsOptions: MultiSelectOption[] = flags.map((flag) => ({
      label: flag.name,
      value: flag.id,
   }))

   const { trigger: createCustomerMutation, isMutating: creatingCustomer } = useSWRMutation(
      '/customer/createCustomerForLoggedInUser',
      createCustomer,
   )

   const { trigger: updateCustomerMutation, isMutating: updatingCustomer } = useSWRMutation(
      '/customer/updateCustomerForLoggedInUser',
      editCustomer,
   )

   const loading = creatingCustomer || updatingCustomer

   const form = useForm<CustomerActionValues>({
      initialValues: {
         name: '',
         email: '',
         address: '',
         mobile: '',
         telephone: '',
         gender: '',
         flags: [],
         customerMobilePrefix: '',
         altContactMobilePrefix: '',
         altContactEmail: '',
         altContactRelationshipToPrimaryContact: '',
         altContactMobile: '',
         altContactName: '',
         altContactTelephone: '',
      },
      validate: formResolve(customerActionSchema),
      transformValues: (values) => ({
         name: values.name,
         email: values.email,
         address: values.address,
         mobile: values.mobile,
         customerMobilePrefix: values.customerMobilePrefix,
         gender: values.gender,
         telephone: `${customerMobilePrefix}${values.mobile}`,
         flags: values.flags,
         altContactEmail: values.altContactEmail,
         altContactRelationshipToPrimaryContact: values.altContactRelationshipToPrimaryContact,
         altContactMobilePrefix: values.altContactMobilePrefix,
         altContactMobile: values.altContactMobile,
         altContactName: values.altContactName,
         altContactTelephone: `${altContactMobilePrefix}${values.altContactMobile}`,
      }),
   })

   const requiredFields = ['name', 'email', 'gender', 'mobile']

   const btnIsDisabled = requiredFields.some(
      (field) => !form.getTransformedValues()[field as keyof CustomerActionValues],
   )

   const refetchAllData = async () => {
      await refetchCustomerInformation?.()
      await refetchCustomersAndPets?.()
   }

   const handleSubmitAction = async ({
      gender,
      name,
      address,
      email,
      telephone,
      flags: _flags,
      altContactEmail,
      altContactRelationshipToPrimaryContact,
      altContactName,
      altContactTelephone,
   }: CustomerActionValues) => {
      const [firstName, ...lastName] = name.trim().split(' ')
      const [altContactFirstName, ...altContactLastName] = altContactName
         ? altContactName.trim().split(' ')
         : ['']
      const flgs = _flags ? _flags.map((f) => f.value) : []
      if (isEditAction && customerInformationData) {
         updateCustomerMutation(
            {
               ...customerInformationData,
               id: selectedCustomerId ?? '',
               username: email,
               firstName,
               flags: flgs,
               lastName: lastName.join(' '),
               mobilePhoneNumberObj: {
                  ...customerInformationData.mobilePhoneNumberObj,
                  internationalNumber: telephone,
               },
               address: {
                  ...customerInformationData?.address,
                  address1: address,
               },
               gender: gender as any,
               optIn,
               alternateContact: {
                  firstName: altContactFirstName,
                  lastName: altContactLastName.join(' '),
                  email: altContactEmail,
                  relationshipToPrimaryContact: altContactRelationshipToPrimaryContact,
                  phoneNumber: {
                     ...customerInformationData?.alternateContact?.phoneNumber,
                     ...(altContactMobilePrefix
                        ? { internationalNumber: altContactTelephone ?? '' }
                        : {}),
                  },
               },
            },
            {
               onSuccess: async (updatedCustomerData: CustomerInformationResponse) => {
                  const { firstName, lastName } = updatedCustomerData
                  const customerName = [firstName, lastName].join(' ')
                  toast.success(DynamicSuccessMessage.UPDATE_CUSTOMER_COMPLETED(customerName), {
                     icon: <FaIcon icon={faUser} />,
                  })
                  await refetchAllData()
                  setOpenDrawer(false)
               },
            },
         )
         return
      }

      const createCustomerArgs = {
         username: email,
         firstName,
         flags: flgs,
         lastName: lastName.join(' '),
         mobilePhoneNumberObj: {
            country: COUNTRY,
            internationalNumber: telephone,
            nationalNumber: NATIONAL_NUMBER,
         },

         address: {
            address1: address,
         },
         gender: gender as any,
         optIn,
         alternateContact: {
            firstName: altContactFirstName,
            lastName: altContactLastName.join(' '),
            email: altContactEmail,
            relationshipToPrimaryContact: altContactRelationshipToPrimaryContact as any,
            phoneNumber: {
               country: COUNTRY,
               internationalNumber: altContactTelephone ?? '',
               nationalNumber: NATIONAL_NUMBER,
            },
         },
      }
      setCreateCustomerFields(createCustomerArgs)
      setMainNav(SidebarNavEnum.PET)
   }

   const handleSave = ({
      email,
      flags: _flags,
      gender,
      name,
      telephone,
      address,
      altContactName,
      altContactEmail,
      altContactRelationshipToPrimaryContact,
      altContactTelephone,
   }: CustomerActionValues) => {
      const [firstName, ...lastName] = name.trim().split(' ')
      const [altContactFirstName, ...altContactLastName] = altContactName
         ? altContactName.trim().split(' ')
         : ['']
      const flgs = _flags ? _flags.map((f) => f.value) : []

      //* Double Checking to prevent Create action on edit form
      if (isEditAction) {
         return
      }
      createCustomerMutation(
         {
            username: email,
            firstName,
            flags: flgs,
            lastName: lastName.join(' '),
            mobilePhoneNumberObj: {
               country: COUNTRY,
               internationalNumber: telephone,
               nationalNumber: NATIONAL_NUMBER,
            },
            address: {
               address1: address,
            },
            gender: gender as any,
            optIn,
            alternateContact: {
               firstName: altContactFirstName,
               lastName: altContactLastName.join(' '),
               email: altContactEmail,
               relationshipToPrimaryContact: altContactRelationshipToPrimaryContact,
               phoneNumber: {
                  country: COUNTRY,
                  internationalNumber: altContactTelephone ?? '',
                  nationalNumber: NATIONAL_NUMBER,
               },
            },
         },
         {
            onSuccess: async () => {
               toast.success(DynamicSuccessMessage.CREATE_CUSTOMER_COMPLETED(name))
               await refetchAllData()
               setOpenDrawer(false)
            },
         },
      )
   }

   function initFormFromCreateCustomerFieldsState() {
      const [_prefix, _mobile] = retrieveNumberAndPrefix(
         createCustomerFields?.mobilePhoneNumberObj?.internationalNumber ?? '',
      )

      const [_altPrefix, _altMobile] = retrieveNumberAndPrefix(
         createCustomerFields?.alternateContact?.phoneNumber?.internationalNumber ?? '',
      )

      const flagsData = flags.reduce((acc, flag) => {
         acc[flag.id] = flag
         return acc
      }, {} as FlagsData)

      const flgs = createCustomerFields?.flags
         ? createCustomerFields.flags.map((f) => ({ label: flagsData[f].name, value: f }))
         : []

      form.initialize({
         name: createCustomerFields
            ? `${createCustomerFields?.firstName ?? ''} ${createCustomerFields?.lastName ?? ''}`
            : '',
         email: createCustomerFields?.username ?? '',
         address: createCustomerFields?.address?.address1 ?? '',
         customerMobilePrefix: _prefix,
         mobile: _mobile,
         telephone: `${_prefix}${_mobile}`,
         gender: createCustomerFields?.gender ?? '',
         flags: flgs,
         altContactEmail: createCustomerFields?.alternateContact?.email ?? '',
         altContactMobilePrefix: _altPrefix,
         altContactMobile: _altMobile,
         altContactTelephone: `${_altPrefix}${_altMobile}`,
         altContactName: createCustomerFields
            ? `${createCustomerFields.alternateContact?.firstName ?? ''} ${createCustomerFields.alternateContact?.lastName ?? ''}`
            : '',
         altContactRelationshipToPrimaryContact:
            createCustomerFields?.alternateContact?.relationshipToPrimaryContact ?? '',
      })
   }

   useEffect(() => {
      if (customerInformationData && isEditAction && !form.initialized) {
         const [_prefix, _mobile] = retrieveNumberAndPrefix(
            customerInformationData?.mobilePhoneNumberObj?.internationalNumber ?? '',
         )

         const [_altPrefix, _altMobile] = retrieveNumberAndPrefix(
            customerInformationData?.alternateContact?.phoneNumber?.internationalNumber ?? '',
         )

         const flagsData = flags.reduce((acc, flag) => {
            acc[flag.id] = flag
            return acc
         }, {} as FlagsData)

         const flgs = customerInformationData.flags
            ? customerInformationData.flags.map((f) => ({ label: flagsData[f].name, value: f }))
            : []

         // ! Using a promise to fix SelectBox is not being set the value from the customerInfomrationData.
         // Using a Promise with a tiny delay to ensure state updates are applied correctly.
         // This small delay helps to resolve potential race conditions where the state update
         // might be getting overridden or not applied as expected due to React's asynchronous
         // state update mechanism or re-rendering behavior.
         new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
            setCustomerMobilePrefix(_prefix)
            setAltContactMobilePrefix(_altPrefix)
            form.initialize({
               name: customerInformationData
                  ? `${customerInformationData?.firstName ?? ''} ${customerInformationData?.lastName ?? ''}`
                  : '',
               email: customerInformationData?.username ?? '',
               address: customerInformationData?.address.address1 ?? '',
               customerMobilePrefix: _prefix,
               mobile: _mobile,
               telephone: `${_prefix}${_mobile}`,
               gender: customerInformationData?.gender ?? '',
               flags: flgs,
               altContactEmail: customerInformationData.alternateContact?.email ?? '',
               altContactMobilePrefix: _altPrefix,
               altContactMobile: _altMobile,
               altContactTelephone: `${_altPrefix}${_altMobile}`,
               altContactName: customerInformationData
                  ? `${customerInformationData.alternateContact?.firstName ?? ''} ${customerInformationData.alternateContact?.lastName ?? ''}`
                  : '',
               altContactRelationshipToPrimaryContact:
                  customerInformationData.alternateContact?.relationshipToPrimaryContact ?? '',
            })
         })
      } else if (createCustomerFields) {
         initFormFromCreateCustomerFieldsState()
      }
      // ! form is not added in the dependency to prevent infinite re-rendering
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [customerInformationData, isEditAction, createCustomerFields])

   useEffect(() => {
      if (customerMobilePrefix) {
         form.setFieldValue('customerMobilePrefix', customerMobilePrefix)
      }
   }, [customerMobilePrefix, form])

   useEffect(() => {
      if (altContactMobilePrefix) {
         form.setFieldValue('altContactMobilePrefix', altContactMobilePrefix)
      }
   }, [altContactMobilePrefix, form])

   return (
      <form onSubmit={form.onSubmit(handleSubmitAction)}>
         <div className="flex flex-col gap-4 px-10 pb-20 pt-6">
            <div className="flex items-center gap-2">
               <FaIcon icon={faUser} />
               <h4 className="text-xl font-medium">
                  {action === SidebarActionEnum.EDIT && 'Edit'} Customer Information
               </h4>
            </div>
            <div className="flex gap-6">
               <TextInput
                  label="Name"
                  name="name"
                  required
                  {...form.getInputProps('name')}
                  {...(form.errors['name'] && {
                     errorMessage: form.errors['name'] as string,
                  })}
               />
               <SelectBox
                  name="gender"
                  label="Gender"
                  required
                  options={[
                     { label: 'Male', value: genderSchema.Enum.MALE },
                     { label: 'Female', value: genderSchema.Enum.FEMALE },
                     { label: 'Other', value: genderSchema.Enum.OTHER },
                  ]}
                  placeholder="Gender"
                  {...form.getInputProps('gender')}
                  {...(form.errors['gender'] && {
                     errorMessage: form.errors['gender'] as string,
                  })}
               />
            </div>
            <div className="flex gap-6">
               <TextInput
                  required
                  label="Email Address"
                  name="email-address"
                  {...form.getInputProps('email')}
                  {...(form.errors['email'] && {
                     errorMessage: form.errors['email'] as string,
                  })}
               />
               <PhoneNumberInput
                  required
                  numberPrefix={customerMobilePrefix}
                  onNumberPrefixChange={setCustomerMobilePrefix}
                  // numberPlaceholder="+44"
                  label="Mobile Number"
                  name="mobile-number"
                  options={[
                     { value: '+44', label: '+44' },
                     { value: '+66', label: '+66' },
                  ]}
                  {...form.getInputProps('mobile')}
                  {...(form.errors['mobile'] && {
                     errorMessage: form.errors['mobile'] as string,
                  })}
               />
            </div>

            <TextInput
               label="Address"
               name="address"
               {...form.getInputProps('address')}
               {...(form.errors['address'] && {
                  errorMessage: form.errors['mobile'] as string,
               })}
            />
            <MultiSelectBox
               label="Flags"
               options={flagsOptions}
               {...form.getInputProps('flags')}
               {...(form.errors['flags'] && {
                  errorMessage: form.errors['flags'] as string,
               })}
               name="flags"
               className="w-full"
            />
            <p className="text-xs font-medium text-grey-04">
               <FaIcon icon={faCircleInfo} className="pr-1" />
               Applying flags will allow you to categorise and filter customer/pet profiles.
            </p>
            <div className="w-full py-6">
               <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-grey-06 to-transparent" />
            </div>
            <h4 className="text-xl font-medium">Alternative Contact</h4>
            <div className="flex gap-6">
               <TextInput
                  {...form.getInputProps('altContactName')}
                  {...(form.errors['altContactName'] && {
                     errorMessage: form.errors['altContactName'] as string,
                  })}
                  label="Contact Name"
                  name="alt-contact-name"
               />
               <TextInput
                  {...form.getInputProps('altContactRelationshipToPrimaryContact')}
                  {...(form.errors['altContactRelationshipToPrimaryContact'] && {
                     errorMessage: form.errors['altContactRelationshipToPrimaryContact'] as string,
                  })}
                  label="Relationship to primary contact"
                  name="alt-contact-relationship-to-primary-contact"
               />
            </div>
            <div className="flex gap-6">
               <PhoneNumberInput
                  numberPrefix={altContactMobilePrefix}
                  onNumberPrefixChange={setAltContactMobilePrefix}
                  label="Mobile Number"
                  name="alt-contact-mobile-number"
                  options={[
                     { value: '+44', label: '+44' },
                     { value: '+66', label: '+66' },
                  ]}
                  {...form.getInputProps('altContactMobile')}
                  {...(form.errors['altContactMobile'] && {
                     errorMessage: form.errors['altContactMobile'] as string,
                  })}
               />
               <TextInput
                  {...form.getInputProps('altContactEmail')}
                  {...(form.errors['altContactEmail'] && {
                     errorMessage: form.errors['altContactEmail'] as string,
                  })}
                  label="Email Address"
                  name="alt-contact-email-address"
               />
            </div>
         </div>

         <div className="border-t border-grey-06 bg-grey-00 p-6">
            <div
               className={cn('flex', {
                  'justify-between': !isEditAction,
                  'justify-end': isEditAction,
               })}
            >
               {!isEditAction && (
                  <Button
                     //! Type error because onClick is not form event. But it works
                     onClick={form.onSubmit(handleSave) as any}
                     type="button"
                     variant="outlined"
                     color="secondary"
                     isLoading={loading}
                     isDisabled={btnIsDisabled}
                  >
                     Save
                  </Button>
               )}
               <Button
                  type="submit"
                  color="secondary"
                  isLoading={loading}
                  isDisabled={btnIsDisabled}
               >
                  Save {isEditAction ? `Changes` : `and Continue`}
               </Button>
            </div>
         </div>
      </form>
   )
}
