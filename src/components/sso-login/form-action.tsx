import { Button } from '@itsallsavvy/savvy-resuable-components'
import SocialLoginButtons from '../ui/social-login-buttons'
import AuthFormActionWrapper from '../ui/auth-form-action-wrapper'
import FormActionDivider from '../ui/form-action-divider'

export default function FormAction() {
   return (
      <AuthFormActionWrapper>
         <Button className="h-12 w-full">Continue</Button>
         <FormActionDivider />

         <div>
            <SocialLoginButtons />
         </div>
      </AuthFormActionWrapper>
   )
}
