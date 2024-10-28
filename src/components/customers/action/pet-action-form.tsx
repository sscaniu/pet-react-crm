import FaIcon from '@/components/common/fa-icon'
import { SidebarActionEnum } from '@/constants/customers-tabs'
import { DynamicSuccessMessage, ErrorMessage } from '@/constants/message'
import { createCustomer } from '@/fetcher/customer/mutations/createCustomer'
import { createPet } from '@/fetcher/pet/mutations/createPet'
import { editPet } from '@/fetcher/pet/mutations/editPet'
import { useCustomerDetailsStore } from '@/providers/customer/customer-details-store-provider'
import { useCustomerDrawerStore } from '@/providers/customer/customer-drawer-store-provider'
import { useCustomerTableStore } from '@/providers/customer/customer-table-store-provider'
import { useSidebarNavStore } from '@/providers/customer/sidebar-nav-store-provider'
import { CustomerInformationResponse } from '@/schemas/customer/customer-information-schema'
import { formResolve } from '@/schemas/form-schemas'
import {
   petActionSchema,
   PetActionValues,
   petGenderSchema,
   yesOrNoEnum,
} from '@/schemas/form-schemas/pet-action-schema'
import { useTemporalSidebarNavStore } from '@/stores/customer/sidebar-nav-store'
import { FlagsData, SelectOption } from '@/types/utils'
import { faCircleInfo, faPaw, faUser } from '@fortawesome/free-solid-svg-icons'
import {
   Button,
   Checkbox,
   DatePicker,
   MultiSelectBox,
   MultiSelectOption,
   SelectBox,
   TextInput,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { useForm } from '@mantine/form'
import { formatISO } from 'date-fns'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function PetActionForm() {
   const { action, createCustomerFields } = useSidebarNavStore((state) => state)
   const { setOpenDrawer } = useCustomerDrawerStore((state) => state)
   const [isPetDataRevalidated, setIsPetDataRevalidated] = useState(false)
   const { breeds, petSizes, petTypes, refetchCustomersAndPets } = useCustomerTableStore(
      (state) => state,
   )
   const {
      petFlags,
      petInformationData,
      customerInformationData,
      refetchPetInformation,
      refetchCustomerInformation,
      refetchPetsList,
      refetchPetSizeList,
   } = useCustomerDetailsStore((state) => state)

   const { undo } = useTemporalSidebarNavStore((state) => state)

   const isEditAction = action === SidebarActionEnum.EDIT
   const isPetAddAction = action === SidebarActionEnum.PET_ADD
   const isCreateAction = action === SidebarActionEnum.CREATE

   const flagsOptions: MultiSelectOption[] = petFlags.map((flag) => ({
      label: flag.name,
      value: flag.id,
   }))

   const petTypesOptions: SelectOption[] = petTypes.map((type) => ({
      label: type.name,
      value: type.id,
   }))

   const petSizeOptions: SelectOption[] = petSizes.map((type) => ({
      label: type.name,
      value: type.id,
   }))

   const breedsOptions: SelectOption[] = breeds.map((breed) => ({
      label: breed.label,
      value: breed.name,
   }))

   const { trigger: updatePetMutation, isMutating: updatingPet } = useSWRMutation('/pet', editPet)
   const { trigger: createPetMutation, isMutating: creatingPet } = useSWRMutation('/pet', createPet)
   const { trigger: createCustomerMutation, isMutating: creatingCustomer } = useSWRMutation(
      '/customer/createCustomerForLoggedInUser',
      createCustomer,
   )

   const loading = updatingPet || creatingPet || creatingCustomer

   const form = useForm<PetActionValues>({
      // TODO: make the form to be uncontrolled to improve performance. (date picker not working currently)
      // mode: 'uncontrolled',
      initialValues: {
         name: '',
         type: '',
         breed: '',
         dob: new Date(),
         flags: [],
         sex: '',
         size: '',
         allergies: '',
         colour: '',
         insured: '',
         internalNotes: '',
         medicalConditions: '',
         neutrated: '',
         regularBlades: '',
         recommendedVisitFreq: '',
         specialConsiderations: '',
         weight: '',
         deceased: false,
      },
      transformValues: (values) => ({
         dob: values.dob,
         name: values.name,
         type: values.type,
         breed: values.breed,
         flags: values.flags,
         sex: values.sex,
         bitch: values.sex === petGenderSchema.Enum.FEMALE,
         size: values.size,
         allergies: values.allergies,
         colour: values.colour,
         internalNotes: values.internalNotes,
         medicalConditions: values.medicalConditions,
         regularBlades: values.regularBlades,
         recommendedVisitFreq: values.recommendedVisitFreq,
         specialConsiderations: values.specialConsiderations,
         weight: values.weight,
         neutrated: values.neutrated,
         transformedNeutrated: values.neutrated === yesOrNoEnum.Enum.YES,
         insured: values.insured,
         transformedInsured: values.insured === yesOrNoEnum.Enum.YES,
         deceased: values.deceased,
      }),
      validate: formResolve(petActionSchema),
   })

   const requiredFields = ['name', 'type', 'breed', 'dob', 'size', 'sex']

   const btnIsDisabled = !!requiredFields.some(
      (field) => !form.getTransformedValues()[field as keyof PetActionValues],
   )

   const refetchAllData = async () => {
      // Needs to be sequential like this to refetch properly.
      await refetchPetInformation?.()
      await refetchPetsList?.()
      await refetchPetSizeList?.()
      await refetchCustomerInformation?.()
      await refetchCustomersAndPets?.()
   }

   const handleSubmitAction = ({
      breed,
      dob,
      flags,
      name,
      size,
      deceased,
      type,
      allergies,
      colour,
      internalNotes,
      medicalConditions,
      recommendedVisitFreq,
      regularBlades,
      specialConsiderations,
      weight,
      transformedNeutrated,
      transformedInsured,
      bitch,
   }: PetActionValues) => {
      const flgs = flags ? flags.map((f) => f.value) : []

      const dobString = formatISO(dob ?? '', { representation: 'date' })

      if (isPetAddAction && customerInformationData) {
         createPetMutation(
            {
               petOwnerId: customerInformationData.id,
               dob: dobString,
               flags: flgs,
               breed,
               petType: type,
               petSizeId: size,
               name,
               bitch: bitch ?? false,
               allergies,
               colour,
               petNotes: internalNotes,
               medical: medicalConditions,
               spayedOrNeutered: transformedNeutrated ?? false,
               insured: transformedInsured ?? false,
               recommendedVisitFrequencyInWeeks: +(recommendedVisitFreq ?? 0),
               blades: regularBlades,
               specialConsiderations,
               weight: +(weight ?? 0),
            },
            {
               onSuccess: async () => {
                  {
                     const { firstName, lastName } = customerInformationData
                     const customerName = [firstName, lastName].join(' ')
                     toast.success(DynamicSuccessMessage.ADD_PET_COMPLETED(customerName), {
                        icon: <FaIcon icon={faPaw} />,
                     })
                     await refetchAllData()

                     // Double undos needed for pet_add action
                     undo()
                     undo()
                  }
               },
            },
         )
      }

      if (isEditAction && petInformationData) {
         updatePetMutation(
            {
               ...petInformationData,
               dob: dobString,
               flags: flgs,
               breed,
               petType: type,
               petSizeId: size,
               name,
               bitch: bitch ?? false,
               allergies,
               colour,
               deceased: deceased ?? false,
               petNotes: internalNotes,
               medical: medicalConditions,
               spayedOrNeutered: transformedNeutrated ?? false,
               insured: transformedInsured ?? false,
               recommendedVisitFrequencyInWeeks: +(recommendedVisitFreq ?? 0),
               blades: regularBlades,
               specialConsiderations,
               weight: +(weight ?? 0),
            },
            {
               onSuccess: async () => {
                  if (customerInformationData) {
                     const { firstName, lastName } = customerInformationData
                     const customerName = [firstName, lastName].join(' ')
                     toast.success(DynamicSuccessMessage.UPDATE_CUSTOMER_COMPLETED(customerName), {
                        icon: <FaIcon icon={faUser} />,
                     })
                  }
                  await refetchAllData()
                  undo()
               },
            },
         )
         return
      }
      if (isCreateAction) {
         if (createCustomerFields) {
            createCustomerMutation(createCustomerFields, {
               onSuccess: (customerResponseData: CustomerInformationResponse) => {
                  createPetMutation(
                     {
                        petOwnerId: customerResponseData.id,
                        dob: dobString,
                        flags: flgs,
                        breed,
                        petType: type,
                        petSizeId: size,
                        name,
                        bitch: bitch ?? false,
                        allergies,
                        colour,
                        petNotes: internalNotes,
                        medical: medicalConditions,
                        spayedOrNeutered: transformedNeutrated ?? false,
                        insured: transformedInsured ?? false,
                        recommendedVisitFrequencyInWeeks: +(recommendedVisitFreq ?? 0),
                        blades: regularBlades,
                        specialConsiderations,
                        weight: +(weight ?? 0),
                     },
                     {
                        onSuccess: async () => {
                           {
                              const { firstName, lastName } = customerResponseData
                              const customerName = [firstName, lastName].join(' ')
                              toast.success(
                                 DynamicSuccessMessage.CREATE_CUSTOMER_COMPLETED(customerName),
                              )

                              await refetchAllData()

                              setOpenDrawer(false)
                           }
                        },
                     },
                  )
               },
            })
            return
         } else {
            setOpenDrawer(false)
            toast.error(ErrorMessage.CREATE_CUSTOMER_FAILED)
         }
      }
   }

   useEffect(() => {
      if (petInformationData && isEditAction && !form.initialized && isPetDataRevalidated) {
         const flagsData = petFlags.reduce((acc, flag) => {
            acc[flag.id] = flag
            return acc
         }, {} as FlagsData)

         const flags = petInformationData.flags
            ? petInformationData.flags.map((f) => ({ label: flagsData[f].name, value: f }))
            : []

         const sex = petInformationData.bitch
            ? petGenderSchema.Enum.FEMALE
            : petGenderSchema.Enum.MALE

         const neutrated = petInformationData.spayedOrNeutered
            ? yesOrNoEnum.Enum.YES
            : yesOrNoEnum.Enum.NO
         const insured = petInformationData.insured ? yesOrNoEnum.Enum.YES : yesOrNoEnum.Enum.NO

         const dob = petInformationData?.dob ? new Date(petInformationData.dob) : new Date()

         // ! Using a promise to fix SelectBox is not being set the value from the customerInfomrationData.
         // Using a Promise with a tiny delay to ensure state updates are applied correctly.
         // This small delay helps to resolve potential race conditions where the state update
         // might be getting overridden or not applied as expected due to React's asynchronous
         // state update mechanism or re-rendering behavior.
         new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
            form.initialize({
               name: petInformationData.name ?? '',
               breed: petInformationData.breed ?? '',
               flags,
               sex,
               type: petInformationData.petType ?? '',
               size: 'L',
               neutrated,
               insured,
               deceased: petInformationData.deceased,
               weight: petInformationData.weight?.toString() ?? '',
               regularBlades: petInformationData.blades ?? '',
               allergies: petInformationData.allergies ?? '',
               dob,
               colour: petInformationData.colour ?? '',
               recommendedVisitFreq:
                  petInformationData.recommendedVisitFrequencyInWeeks?.toString() ?? '',
               specialConsiderations: petInformationData.specialConsiderations ?? '',
               medicalConditions: petInformationData.medical ?? '',
            })
         })
      }
      // ! form is not added in the dependency to prevent infinite re-rendering
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [petInformationData, isEditAction, isPetDataRevalidated])

   // To Ensure the feeded data is revalidated
   useEffect(() => {
      if (petInformationData && !isPetDataRevalidated) {
         refetchPetInformation?.()
         setIsPetDataRevalidated(true)
      }
   }, [isPetDataRevalidated, petInformationData, refetchPetInformation])

   return (
      <form onSubmit={form.onSubmit(handleSubmitAction)}>
         <div className="flex flex-col gap-4 px-10 pb-20 pt-6">
            <div className="flex items-center gap-2">
               <FaIcon icon={faPaw} />
               <h4 className="text-xl font-medium">
                  {action === SidebarActionEnum.EDIT
                     ? `Edit ${petInformationData?.name}`
                     : `Pet Information`}{' '}
               </h4>
            </div>
            <div className="flex gap-6">
               <TextInput
                  {...form.getInputProps('name')}
                  {...(form.errors['name'] && {
                     errorMessage: form.errors['name'] as string,
                  })}
                  required
                  label="Pet Name"
                  name="pet-name"
               />
               <SelectBox
                  {...form.getInputProps('type')}
                  {...(form.errors['type'] && {
                     errorMessage: form.errors['type'] as string,
                  })}
                  options={petTypesOptions}
                  required
                  label="Pet Type"
                  name="pet-type"
               />
            </div>
            <div className="flex gap-6">
               <SelectBox
                  {...form.getInputProps('breed')}
                  {...(form.errors['breed'] && {
                     errorMessage: form.errors['breed'] as string,
                  })}
                  required
                  options={breedsOptions}
                  label="Breed"
                  name="breed"
               />
               <SelectBox
                  {...form.getInputProps('size')}
                  {...(form.errors['size'] && {
                     errorMessage: form.errors['size'] as string,
                  })}
                  options={petSizeOptions}
                  required
                  label="Size"
                  name="size"
               />
            </div>
            <div className="flex gap-6">
               <DatePicker
                  label="Date of Birth"
                  name="dob"
                  {...form.getInputProps('dob')}
                  {...(form.errors['dob'] && {
                     errorMessage: form.errors['dob'] as string,
                  })}
                  maxDate={new Date()}
                  required
               />
               <SelectBox
                  options={[
                     { label: 'Male', value: petGenderSchema.Enum.MALE },
                     { label: 'Female', value: petGenderSchema.Enum.FEMALE },
                  ]}
                  {...form.getInputProps('sex')}
                  {...(form.errors['sex'] && {
                     errorMessage: form.errors['sex'] as string,
                  })}
                  required
                  label="Sex"
                  name="sex"
               />
            </div>
            <div className="flex gap-6">
               <TextInput
                  {...form.getInputProps('colour')}
                  {...(form.errors['colour'] && {
                     errorMessage: form.errors['colour'] as string,
                  })}
                  label="Color / Pattern"
                  name="color-pattern"
               />
               <SelectBox
                  {...form.getInputProps('neutrated')}
                  {...(form.errors['neutrated'] && {
                     errorMessage: form.errors['neutrated'] as string,
                  })}
                  options={[
                     { label: 'Yes', value: yesOrNoEnum.Enum.YES },
                     { label: 'No', value: yesOrNoEnum.Enum.NO },
                  ]}
                  label="Neutrated"
                  name="neutrated"
               />
            </div>

            <div className="flex gap-6">
               <TextInput
                  type="number"
                  {...form.getInputProps('weight')}
                  {...(form.errors['weight'] && {
                     errorMessage: form.errors['weight'] as string,
                  })}
                  label="Weight"
                  name="weight"
               />
               <TextInput
                  {...form.getInputProps('regularBlades')}
                  {...(form.errors['regularBlades'] && {
                     errorMessage: form.errors['regularBlades'] as string,
                  })}
                  label="Regular Blades"
                  name="regular-blades"
               />
            </div>
            <div className="flex gap-6">
               <SelectBox
                  {...form.getInputProps('insured')}
                  {...(form.errors['insured'] && {
                     errorMessage: form.errors['insured'] as string,
                  })}
                  options={[
                     { label: 'Yes', value: yesOrNoEnum.Enum.YES },
                     { label: 'No', value: yesOrNoEnum.Enum.NO },
                  ]}
                  label="Insured"
                  name="insured"
               />
               <TextInput
                  {...form.getInputProps('recommendedVisitFreq')}
                  {...(form.errors['recommendedVisitFreq'] && {
                     errorMessage: form.errors['recommendedVisitFreq'] as string,
                  })}
                  label="Recommended Visit Freq."
                  name="recommended visit freq"
               />
            </div>
            <TextInput
               {...form.getInputProps('specialConsiderations')}
               {...(form.errors['specialConsiderations'] && {
                  errorMessage: form.errors['specialConsiderations'] as string,
               })}
               label="Special Considerations"
               name="special considerations"
            />
            <TextInput
               {...form.getInputProps('medicalConditions')}
               {...(form.errors['medicalConditions'] && {
                  errorMessage: form.errors['medicalConditions'] as string,
               })}
               label="Medical Conditions"
               name="medical conditions"
            />
            <TextInput
               {...form.getInputProps('allergies')}
               {...(form.errors['allergies'] && {
                  errorMessage: form.errors['allergies'] as string,
               })}
               label="Allergies"
               name="allergies"
            />
            <MultiSelectBox
               options={flagsOptions}
               {...form.getInputProps('flags')}
               {...(form.errors['flags'] && {
                  errorMessage: form.errors['flags'] as string,
               })}
               label="Flags"
               name="flags"
            />
            <p className="text-xs font-medium text-grey-04">
               <FaIcon icon={faCircleInfo} className="pr-1" />
               Applying flags will allow you to categorise and filter customer/pet profiles.
            </p>
            <div className="pt-4">
               <h4 className="text-xl font-medium">Additional Information</h4>
            </div>
            <TextInput label="Internal Notes" name="internal-notes" />
            {isEditAction && (
               <div className="flex items-center gap-4 py-4">
                  <Checkbox
                     checked={form.values.deceased}
                     onCheckedChange={(checked: boolean) => form.setFieldValue('deceased', checked)}
                     name="pet deceased"
                  />
                  <p className="text-sm">Pet is deceased</p>
               </div>
            )}
         </div>

         <div className="border-t border-grey-06 bg-grey-00 p-6">
            <div className="flex justify-end">
               <Button
                  isDisabled={btnIsDisabled}
                  isLoading={loading}
                  type="submit"
                  color="secondary"
               >
                  Save {action === SidebarActionEnum.EDIT && `Changes`}
               </Button>
            </div>
         </div>
      </form>
   )
}
