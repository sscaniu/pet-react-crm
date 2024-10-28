'use client'
import { Button, TextInput } from '@itsallsavvy/savvy-resuable-components'
import FormAction from './form-action'
import useSWRMutation from 'swr/mutation'
import { signIn } from '@/services/auth0/sign-in'
import FaIcon from '../common/fa-icon'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '@mantine/form'
import { ZodInfer } from '@/types/zod'
import { signInSchema } from '@/schemas/form-schemas/sign-in-schema'
import { formResolve } from '@/schemas/form-schemas'
import { useRouter } from 'next/navigation'

type SignInFormValues = ZodInfer<typeof signInSchema>

const SignInForm: React.FC = () => {
   const { push } = useRouter()
   const form = useForm<SignInFormValues>({
      mode: 'uncontrolled',
      initialValues: {
         email: '',
         password: '',
      },
      validate: formResolve(signInSchema),
   })

   const { trigger, isMutating, error } = useSWRMutation('sign-in', signIn)

   const handleSignIn = async ({ email, password }: SignInFormValues) => {
      trigger({ email, password })
   }

   return (
      <>
         {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-01 bg-red-01/10 p-4">
               <FaIcon icon={faCircleExclamation} size="xl" className="text-red-02" />
               <p className="text-sm font-medium text-red-02">
                  Incorrect email or password. Please try again.
               </p>
            </div>
         )}
         <form className="flex flex-col gap-6" onSubmit={form.onSubmit(handleSignIn)}>
            <TextInput
               label="Email"
               name="email"
               placeholder="Email Address"
               required
               {...form.getInputProps('email')}
               {...(form.errors['email'] && { errorMessage: form.errors['email'] as string })}
            />
            <TextInput
               label="Password"
               name="password"
               placeholder="Password"
               type="password"
               required
               {...form.getInputProps('password')}
               {...(form.errors['password'] && { errorMessage: form.errors['password'] as string })}
            />
            <div className="-my-4 flex justify-end">
               <Button
                  variant="text"
                  type="button"
                  color="secondary"
                  className="hover:text-inherit hover:underline"
                  onClick={() => push('/forgot-password')}
               >
                  Forgot Password?
               </Button>
            </div>
            <FormAction loading={isMutating} />
         </form>
      </>
   )
}

export default SignInForm
