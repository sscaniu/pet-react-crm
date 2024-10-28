'use client'
import AuthFormTitle from '@/components/ui/form-title'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { useRouter } from 'next/navigation'

const PasswordUpdatedTemplate: React.FC = () => {
   const dummyEmail = 'sahsafierce@gmail.com'
   const router = useRouter()

   return (
      <div className="flex flex-col gap-9">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title="Password Updated"
               subheading={`You have successfully changed your password for ${dummyEmail}. You can now log in with your new password.`}
            />
         </div>
         <Button className="mt-16 h-12 w-full lg:mt-0" onClick={() => router.push('/sign-in')}>
            Back to log in
         </Button>
      </div>
   )
}

export default PasswordUpdatedTemplate
