'use client'
import { FormErrorMessage, SuccessMessage } from '@/constants/message'
import { signUpUser } from '@/fetcher/auth/mutations/sign-up'
import { formResolve } from '@/schemas/form-schemas'
import { SignUpFormValues, signUpSchema } from '@/schemas/form-schemas/sign-up-schema'
import {
   PhoneNumberInput,
   SelectBox,
   TextInput,
   toast,
} from '@itsallsavvy/savvy-resuable-components'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import FormAction from './form-action'

const SignUpForm: React.FC = () => {
   const router = useRouter()
   const [mobilePrefix, setMobilePrefix] = useState('')

   const form = useForm<SignUpFormValues>({
      initialValues: {
         firstname: '',
         lastname: '',
         confirmPassword: '',
         createPassword: '',
         email: '',
         country: '',
         mobilePrefix: '',
         mobile: '',
         telephone: '',
         username: '',
      },
      validate: formResolve(signUpSchema),
      transformValues: (values) => ({
         firstname: values.firstname,
         lastname: values.lastname,
         confirmPassword: values.confirmPassword,
         createPassword: values.createPassword,
         email: values.email,
         country: values.country,
         mobilePrefix: values.mobilePrefix,
         mobile: values.mobile,
         username: `${values.firstname}${values.lastname}`,
         telephone: `${mobilePrefix}${values.mobile}`,
      }),
   })

   const { trigger, isMutating, error } = useSWRMutation(
      '/registration/registerOrgParamsBreakName',
      signUpUser,
   )

   useEffect(() => {
      //* To remove errors from the password fields when one of them is touched(re-type) again.
      if (
         Object.keys(form.errors).length > 0 &&
         (form.isDirty('createPassword') || form.isDirty('confirmPassword'))
      ) {
         form.clearFieldError('createPassword')
         form.clearFieldError('confirmPassword')
      }
   }, [form])

   const handleSignUp = async ({
      confirmPassword,
      createPassword,
      email,
      firstname,
      lastname,
      country,
      telephone,
      username,
   }: SignUpFormValues) => {
      if (createPassword !== confirmPassword) {
         form.setErrors({
            createPassword: FormErrorMessage.PASSWORD_DOES_NOT_MATCH,
            confirmPassword: FormErrorMessage.PASSWORD_DOES_NOT_MATCH,
         })
         form.resetDirty()
         return
      }

      // TODO: to omit the telephone field when the input is not filled
      trigger(
         {
            appType: 'PET_GROOMING_SALON',
            firstname,
            lastname,
            password: confirmPassword,
            username: email,
            // email,
            telephone,
         },
         {
            onSuccess: () => {
               toast.success(SuccessMessage.SIGN_UP_COMPLETED)
               router.push('/sign-in')
            },
         },
      )
   }

   // if (error) {
   //    alert('Fail to sign up')
   // }

   const requiredFields = [
      'firstname',
      'lastname',
      'email',
      'createPassword',
      'confirmPassword',
      'country',
   ]

   const btnIsDisabled = requiredFields.some(
      (field) => !form.getTransformedValues()[field as keyof SignUpFormValues],
   )

   useEffect(() => {
      if (mobilePrefix) {
         form.setFieldValue('mobilePrefix', mobilePrefix)
      }
   }, [mobilePrefix, form])

   return (
      <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSignUp)}>
         <div className="flex w-full flex-col gap-6 sm:flex-row">
            <TextInput
               label="First Name"
               name="firstname"
               required
               {...form.getInputProps('firstname')}
               {...(form.errors['firstname'] && {
                  errorMessage: form.errors['firstname'] as string,
               })}
            />
            <TextInput
               label="Last Name"
               name="lastname"
               required
               {...form.getInputProps('lastname')}
               {...(form.errors['lastname'] && {
                  errorMessage: form.errors['lastname'] as string,
               })}
            />
         </div>
         <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="sashafierce@gmail.com"
            required
            {...form.getInputProps('email')}
            {...(form.errors['email'] && {
               errorMessage: form.errors['email'] as string,
            })}
         />

         <TextInput
            label="Create Password"
            name="create-password"
            type="password"
            required
            {...form.getInputProps('createPassword')}
            {...(form.errors['createPassword'] && {
               errorMessage: form.errors['createPassword'] as string,
            })}
         />
         <TextInput
            label="Confirm Password"
            name="confirm-password"
            type="password"
            required
            {...form.getInputProps('confirmPassword')}
            {...(form.errors['confirmPassword'] && {
               errorMessage: form.errors['confirmPassword'] as string,
            })}
         />
         <div className="flex w-full flex-col gap-6 sm:flex-row">
            <PhoneNumberInput
               name="mobile-number"
               label="Mobile Number (optional)"
               numberPrefix={mobilePrefix}
               onNumberPrefixChange={(value) => setMobilePrefix(value)}
               {...form.getInputProps('mobile')}
               {...(form.errors['mobile'] && {
                  errorMessage: form.errors['mobile'] as string,
               })}
               options={[
                  { label: '+44', value: '+44' },
                  { label: '+66', value: '+66' },
               ]}
            />

            <SelectBox
               required
               name="country"
               label="Country"
               placeholder="Please choose a country"
               options={[
                  { label: 'United States', value: 'US' },
                  { label: 'Canada', value: 'CA' },
               ]}
               {...form.getInputProps('country')}
               {...(form.errors['country'] && {
                  errorMessage: form.errors['country'] as string,
               })}
            />
         </div>
         <FormAction loading={isMutating} btnIsDisabled={btnIsDisabled} />
      </form>
   )
}

export default SignUpForm
