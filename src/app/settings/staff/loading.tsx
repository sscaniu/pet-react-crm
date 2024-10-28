import { Loader } from '@itsallsavvy/savvy-resuable-components'

export default function StaffPageLoading() {
   return (
      <div className="flex h-[80vh] w-full items-center justify-center rounded-xl">
         <Loader />
      </div>
   )
}
