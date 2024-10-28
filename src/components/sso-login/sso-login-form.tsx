'use client'
import { TextInput } from '@itsallsavvy/savvy-resuable-components'
import FormAction from './form-action'

const SSOLoginForm: React.FC = () => {
   return (
      <div className="flex h-full flex-col justify-between gap-6">
         <TextInput label="Email" name="email" placeholder="Email Address" type="email" required />
         <FormAction />
      </div>
   )
}

export default SSOLoginForm
