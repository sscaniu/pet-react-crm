import Seperator from '@/components/common/seperator'
import { DetailFieldType } from '@/types/utils'

export type PetDetailValueType = string | number | Date | undefined | boolean

type Props = {
   mainFields: DetailFieldType[]
   otherFields: DetailFieldType[]
}

export default function PetDetails({ mainFields, otherFields }: Props) {
   return (
      <div>
         <div className="grid grid-cols-2 gap-6">
            {mainFields.map((field) => (
               <div key={field.label} className="flex flex-col gap-1">
                  <h6 className="text-sm font-medium text-grey-02">{field.label}</h6>
                  <p className="font-semibold">{fieldValueResolver(field.value)}</p>
               </div>
            ))}
         </div>
         <Seperator />
         <div className="flex flex-col gap-6">
            {otherFields.map((field) => (
               <div key={field.label} className="flex flex-col gap-1">
                  <h6 className="text-sm font-medium text-grey-02">{field.label}</h6>
                  <p className="font-semibold">{fieldValueResolver(field.value)}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

function fieldValueResolver(value: PetDetailValueType): string {
   if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
   }
   if (value) {
      return value.toString()
   }
   return 'N/A'
}
