import ForgotPasswordForm from '@/components/forgot-password/forgot-password-form'
import AuthFormTitle from '@/components/ui/form-title'

const ForgotPasswordTemplate: React.FC = () => {
   return (
      <div className="flex flex-col gap-9">
         <AuthFormTitle
            title={`Forgot Password`}
            subheading={`Please enter the registered email address you used for your account. We'll send you a link to create a new password`}
         />
         <ForgotPasswordForm />
      </div>
   )
}

export default ForgotPasswordTemplate
