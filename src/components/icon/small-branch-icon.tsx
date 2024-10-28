import { IconProps } from '@/types/icon'
import React from 'react'

const SmallBranchIcon: React.FC<IconProps> = ({ color = 'none', ...attributes }) => {
   return (
      <svg width="11" height="9" viewBox="0 0 11 9" fill={color} xmlns="http://www.w3.org/2000/svg">
         <path
            d="M1 1V1C1 4.86599 4.13401 8 8 8H10"
            stroke="#666B75"
            strokeWidth="1.05882"
            strokeLinecap="round"
            {...attributes}
         />
      </svg>
   )
}

export default SmallBranchIcon
