import { Loader } from '@itsallsavvy/savvy-resuable-components'

export default function Loading() {
   return (
      <div className="flex h-[calc(100vh-96px)] items-center justify-center rounded-xl">
         <Loader />
      </div>
   )
}
