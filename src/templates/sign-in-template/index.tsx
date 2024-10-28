import SignInForm from '@/components/sign-in/sign-in-form'
import AuthFormTitle from '@/components/ui/form-title'

export default function SignInTemplate() {
   return (
      <div className="flex flex-col gap-12">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title={`Welcome to Savvy!`}
               subheading="Enter your password to log in to Savvy."
            />
            <SignInForm />
         </div>
      </div>
   )
}
