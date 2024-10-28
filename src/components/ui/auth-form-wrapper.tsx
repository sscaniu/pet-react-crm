import { cn } from '@/lib/utils'

interface Props {
   children: React.ReactNode
}
export default function AuthFormWrapper({ children }: Props) {
   return (
      <div
         className={cn(
            'z-10 flex items-center justify-center rounded-2xl border border-grey-01 bg-white bg-opacity-90 from-white to-grey-06 px-6 py-10 shadow-01',
            'sm:px-12 sm:py-6',
            'md:px-20',
            'lg:flex-initial lg:border-0 lg:bg-white lg:bg-none lg:px-10 lg:py-6 lg:shadow-none',
            'xl:px-25',
            '2xl:px-40',
         )}
      >
         <div className="mx-auto w-full pb-6 pt-10 lg:w-120">{children}</div>
      </div>
   )
}
