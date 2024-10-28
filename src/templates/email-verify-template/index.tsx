import AuthFormTitle from '@/components/ui/form-title'

const EmailVerifyTemplate: React.FC = () => {
   return (
      <div className="flex flex-col gap-9">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title="Let's verify your email!"
               subheading="Please click the verification link on the email we've sent to your email to activate your account."
            />
         </div>

         <p className="text-sm font-medium text-grey">
            Didn&apos;t get the email? Check your junk folder or
            <a href="#" className="pl-1 text-primary underline">
               Resend
            </a>
         </p>
      </div>
   )
}

export default EmailVerifyTemplate
