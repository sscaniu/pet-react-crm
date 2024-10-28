import { Label, RadioGroupItem } from '@itsallsavvy/savvy-resuable-components'

export interface RadioItemProps {
   value: string
   label?: React.ReactNode
   children?: React.ReactNode
   id: string
}

const RadioItem = ({ value, label, children, id }: RadioItemProps) => {
   return (
      <div className="rounded-2xl border border-grey-06 p-4">
         <div className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={id} className="border-2 border-gray-300" />
            <Label htmlFor={id} className="flex-grow text-sm">
               {label}
            </Label>
         </div>

         {children}
      </div>
   )
}

export default RadioItem
