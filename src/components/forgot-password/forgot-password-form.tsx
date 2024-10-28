'use client'
import { formResolve } from '@/schemas/form-schemas'
import { forgotPasswordSchema } from '@/schemas/form-schemas/forgot-password-schema'
import { ZodInfer } from '@/types/zod'
import { TextInput } from '@itsallsavvy/savvy-resuable-components'
import { useForm } from '@mantine/form'
import FormAction from './form-action'
import { useRouter } from 'next/navigation'

type ForgotPasswordFormValues = ZodInfer<typeof forgotPasswordSchema>

const ForgotPasswordForm: React.FC = () => {
   const router = useRouter()
   const form = useForm<ForgotPasswordFormValues>({
      initialValues: {
         email: '',
      },
      validate: formResolve(forgotPasswordSchema),
   })

   const handleRequestResetPassword = async ({ email }: ForgotPasswordFormValues) => {
      //   form.setErrors({ email: FormErrorMessage.EMAIL_NOT_REGISTERD })
      router.push('/password-reset-email-sent')
   }

   return (
      <form
         className="flex h-full flex-col justify-between gap-6"
         onSubmit={form.onSubmit(handleRequestResetPassword)}
      >
         <TextInput
            label="Email"
            name="email"
            placeholder="sashafierce@gmail.com"
            type="email"
            {...form.getInputProps('email')}
         />
         <FormAction />
      </form>
   )
}

export default ForgotPasswordForm
