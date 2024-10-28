import ChangePasswordForm from '@/components/change-password/change-password-form'
import AuthFormTitle from '@/components/ui/form-title'

export default function ChangePasswordTemplate() {
   const dummyEmail = 'sashafierce@gmail.com'

   return (
      <div className="flex flex-col gap-12">
         <div className="flex flex-col gap-9">
            <AuthFormTitle
               title={`Change Password`}
               subheading={`Please set a new password for ${dummyEmail}`}
            />
            <ChangePasswordForm />
         </div>
      </div>
   )
}
