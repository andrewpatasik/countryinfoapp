'use client'
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='w-full flex flex-col h-full items-center justify-center'>
      <h2 className='text-4xl text-gray-400 font-bold mb-4'>Something went wrong!</h2>
      <Button
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}