import React from 'react'
import { useShopConfigStore } from '@/providers/global/shop-config-store-provider'
import { SelectBox } from '@itsallsavvy/savvy-resuable-components'

interface Props {
   className?: string
   placeholder?: React.ReactNode
   label?: string
   name: string
   required?: boolean
   errorMessage?: string
   disabled?: boolean
   value?: string
   onChange?: (value: string) => void
}

const StoreLocationDropdown: React.FC<Props> = ({
   className,
   placeholder,
   label,
   name,
   errorMessage,
   required,
   disabled,
   value,
   onChange,
}) => {
   const { locations } = useShopConfigStore((state) => state)

   const locationOptions = locations
      ? locations.map((location) => ({
           label: location.name,
           value: location.id,
        }))
      : []

   return (
      <SelectBox
         className={className}
         placeholder={placeholder}
         required={required}
         label={label}
         name={name}
         errorMessage={errorMessage}
         options={locationOptions}
         disabled={disabled}
         value={value}
         onChange={onChange}
      />
   )
}

export default StoreLocationDropdown
