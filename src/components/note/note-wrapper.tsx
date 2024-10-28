import { cn } from '@/lib/utils'

interface Props {
   children: React.ReactNode
   isCard?: boolean
   openNote: () => void
}

export default function NoteWrapper({ children, isCard, openNote }: Props) {
   return (
      <div
         className={cn('flex w-full flex-1 cursor-pointer gap-3 border-b border-grey-06 p-6', {
            'rounded-md border': isCard,
         })}
         onClick={() => openNote()}
      >
         {children}
      </div>
   )
}
