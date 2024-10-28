'use client'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import AuthFormActionWrapper from '../ui/auth-form-action-wrapper'

export default function FormAction({
   loading = false,
   btnIsDisabled = false,
}: {
   loading?: boolean
   btnIsDisabled: boolean
}) {
   return (
      <AuthFormActionWrapper>
         <p className="text-xs font-medium text-grey">
            By proceeding, you accept the terms and conditions of creating an account, including our
            <a href="#" className="px-1 text-primary">
               privacy policy
            </a>
            and
            <a href="#" className="px-1 text-primary">
               data usage
            </a>
            agreements. Please review these documents carefully before continuing.
         </p>
         <Button
            isLoading={loading}
            isDisabled={btnIsDisabled}
            type="submit"
            className="h-12 w-full"
         >
            Create Account
         </Button>
      </AuthFormActionWrapper>
   )
}
