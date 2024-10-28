import { cn } from '@/lib/utils'

interface Props {
   className?: string
}

export default function Seperator({ className }: Props) {
   return (
      <div className={cn('w-full px-10 py-6', className)}>
         <hr className="bg-gey-06 h-[1px] w-full" />
      </div>
   )
}
