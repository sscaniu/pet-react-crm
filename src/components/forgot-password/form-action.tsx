import { Button } from '@itsallsavvy/savvy-resuable-components'
import AuthFormActionWrapper from '../ui/auth-form-action-wrapper'

export default function FormAction() {
   return (
      <AuthFormActionWrapper>
         <Button className="h-12 w-full" type="submit">
            Reset Password
         </Button>
      </AuthFormActionWrapper>
   )
}
