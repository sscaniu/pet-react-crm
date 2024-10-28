'use client'
import { FormErrorMessage } from '@/constants/message'
import { formResolve } from '@/schemas/form-schemas'
import { changePasswordSchema } from '@/schemas/form-schemas/change-password-schema'
import { ZodInfer } from '@/types/zod'
import { TextInput } from '@itsallsavvy/savvy-resuable-components'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import FormAction from './form-action'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

type ChangePasswordFormValues = ZodInfer<typeof changePasswordSchema>

const ChangePasswordForm: React.FC = () => {
   const router = useRouter()
   const form = useForm<ChangePasswordFormValues>({
      initialValues: {
         password: '',
         confirmPassword: '',
      },
      validate: formResolve(changePasswordSchema),
   })

   const parseNonEmptySchema = z.string().min(1)

   const btnIsDisabled = !Object.values(form.values).every(
      (value) => parseNonEmptySchema.safeParse(value).success,
   )

   useEffect(() => {
      //* To remove errors from the password fields when one of them is touched(re-type) again.
      if (
         Object.keys(form.errors).length > 0 &&
         (form.isDirty('password') || form.isDirty('confirmPassword'))
      ) {
         form.clearFieldError('password')
         form.clearFieldError('confirmPassword')
      }
   }, [form])

   const handleChangePassword = async ({ password, confirmPassword }: ChangePasswordFormValues) => {
      if (password !== confirmPassword) {
         form.setErrors({
            password: FormErrorMessage.PASSWORD_DOES_NOT_MATCH,
            confirmPassword: FormErrorMessage.PASSWORD_DOES_NOT_MATCH,
         })
         form.resetDirty()
         return
      }

      router.push('/password-updated')
   }

   return (
      <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleChangePassword)}>
         <TextInput
            label="New Password"
            name="password"
            required
            type="password"
            {...form.getInputProps('password')}
            {...(form.errors['password'] && { errorMessage: form.errors['password'] as string })}
         />
         <TextInput
            label="Confirm New Password"
            name="confirm-password"
            type="password"
            required
            {...form.getInputProps('confirmPassword')}
            {...(form.errors['confirmPassword'] && {
               errorMessage: form.errors['confirmPassword'] as string,
            })}
         />
         <FormAction isDisabled={btnIsDisabled} />
      </form>
   )
}

export default ChangePasswordForm
