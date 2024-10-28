'use client'
import FaIcon from '@/components/common/fa-icon'
import SignUpForm from '@/components/sign-up/sign-up-form'
import AuthFormTitle from '@/components/ui/form-title'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@itsallsavvy/savvy-resuable-components'
import { useRouter } from 'next/navigation'

export default function SignUpTemplate() {
   const { push } = useRouter()
   return (
      <div className="flex flex-col gap-12">
         <div className="relative flex flex-col gap-9">
            <Button
               variant="icon"
               onClick={() => push('/sso-login')}
               className="absolute -top-10 left-0 z-20 text-lg font-bold text-primary sm:top-0"
            >
               <FaIcon icon={faArrowLeft} size="lg" />
            </Button>
            <AuthFormTitle title={`Welcome to Savvy!`} />

            <SignUpForm />
         </div>
      </div>
   )
}
