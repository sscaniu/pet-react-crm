import SSOLoginForm from '@/components/sso-login/sso-login-form'
import AuthFormTitle from '@/components/ui/form-title'

const SSOLoginTemplate: React.FC = () => {
   return (
      <div className="flex flex-col gap-9">
         <AuthFormTitle
            title={`Welcome to Savvy!`}
            subheading={`Create an account or log in to manage your pet grooming business.`}
         />
         <SSOLoginForm />
      </div>
   )
}

export default SSOLoginTemplate
