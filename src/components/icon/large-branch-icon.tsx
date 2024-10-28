import { IconProps } from '@/types/icon'
import React from 'react'

const LargeBranchIcon: React.FC<IconProps> = ({ color = 'none', ...attributes }) => {
   return (
      <svg
         width="14"
         height="90"
         viewBox="0 0 11 60"
         fill={color}
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M1 1V43C1 47.4183 4.58172 51 9 51H10"
            stroke="#666B75"
            strokeWidth="1.05882"
            strokeLinecap="round"
         />
      </svg>
   )
}

export default LargeBranchIcon
