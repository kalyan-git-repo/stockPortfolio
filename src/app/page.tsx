'use client'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import ChartAreaDefault from '@/components/common/chartForLanding'
import { useUser} from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default function Home() {
  
  const { user} = useUser()
  if (user) redirect("/stocks")

  const [date, setDate] = useState<Date | undefined>(undefined)
  useEffect(() => {
    setDate(new Date());
  }, [])

  if (!date) {
    return <p>Loading date...</p>; // or a loading spinner/skeleton
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-7.png" alt="Banner" style={{ objectFit: 'cover' }} sizes="100vw" />
      <div style={{
        position: 'absolute',
        right: '0px',
        top: '100px',
      }}>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]'
        />
        <p className='text-muted-foreground mt-3 text-center text-xs' role='region'>
            Variable size calendar
        </p>
      </div>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '7%',
        right: '7%',
        transform: 'translate(-10%, -10%)'
      }}>
        <ChartAreaDefault/>
      </div>
      <div className='absolute top-0 left-0 p-6'>
        <div className='flex items-center gap-3'>
          <SignInButton mode='modal' >
            <Button variant={"ghost"} size={"sm"} className="bg-blue-500 text-white hover:bg-blue-600">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button size={"sm"} className="bg-red-500 text-white hover:bg-red-600">
              Sign Up
            </Button>
          </SignUpButton>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
