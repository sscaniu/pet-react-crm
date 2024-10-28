'use client'
import AuthFormTitle from '@/components/ui/form-title'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { useRouter } from 'next/navigation'

const PasswordResetEmailSentTemplate: React.FC = () => {
   const router = useRouter()

   return (
      <div className="flex flex-col gap-9">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title="Password reset email sent!"
               subheading="Please check your inbox to reset your password. If you don't see the email, please check your spam or junk mail folder."
            />
         </div>
         <Button className="mt-16 h-12 w-full lg:mt-0" onClick={() => router.push('/sign-in')}>
            Back to log in
         </Button>
      </div>
   )
}

export default PasswordResetEmailSentTemplate
