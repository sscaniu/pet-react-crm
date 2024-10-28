export default function FormActionDivider() {
   return (
      <div className="relative flex justify-center">
         <div className="flex w-full items-center">
            <div className="z-0 h-[1px] flex-1 bg-grey-01" />
            <p className="z-10 flex-shrink-0 px-4 text-sm font-medium text-grey-04">
               or continue with
            </p>
            <div className="z-0 h-[1px] flex-1 bg-grey-01" />
         </div>
      </div>
   )
}
