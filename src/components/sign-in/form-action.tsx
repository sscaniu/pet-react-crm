import { Button } from '@itsallsavvy/savvy-resuable-components'
import SocialLoginButtons from '../ui/social-login-buttons'
import FormActionDivider from '../ui/form-action-divider'
import AuthFormActionWrapper from '../ui/auth-form-action-wrapper'

export default function FormAction({ loading = false }: { loading?: boolean }) {
   return (
      <AuthFormActionWrapper>
         <Button type="submit" isLoading={loading} className="h-12 w-full">
            Continue
         </Button>
         <FormActionDivider />
         <div>
            <SocialLoginButtons />
         </div>
      </AuthFormActionWrapper>
   )
}
