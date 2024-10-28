import AuthFormTitle from '@/components/ui/form-title'
import { Button } from '@itsallsavvy/savvy-resuable-components'

const VerificationSuccessTemplate: React.FC = () => {
   return (
      <div className="flex flex-col gap-9">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title="Let's begin setting up your Savvy!"
               subheading="Your account has been verified. Click the button below to start setting up your shop on Savvy!"
            />
         </div>
         <Button className="mt-16 h-12 w-full lg:mt-0">Set up my shop</Button>
      </div>
   )
}

export default VerificationSuccessTemplate
