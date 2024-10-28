import { Button } from '@itsallsavvy/savvy-resuable-components'
import SocialLoginButtons from '../ui/social-login-buttons'
import FormActionDivider from '../ui/form-action-divider'
import AuthFormActionWrapper from '../ui/auth-form-action-wrapper'

export default function FormAction({
   loading = false,
   isDisabled = false,
}: {
   loading?: boolean
   isDisabled: boolean
}) {
   return (
      <AuthFormActionWrapper>
         <Button type="submit" isLoading={loading} isDisabled={isDisabled} className="h-12 w-full">
            Reset Password
         </Button>
         <FormActionDivider />
         <div>
            <SocialLoginButtons />
         </div>
      </AuthFormActionWrapper>
   )
}
