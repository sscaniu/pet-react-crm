import { useCallback, useRef } from 'react'

type Callback = (...args: any[]) => void

export default function useDebounce(callback: Callback, delay: number) {
   const timeoutRef = useRef<NodeJS.Timeout | null>(null)

   const debouncedCallback = useCallback(
      (...args: any[]) => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }
         timeoutRef.current = setTimeout(() => {
            callback(...args)
         }, delay)
      },
      [callback, delay],
   )

   return debouncedCallback
}
