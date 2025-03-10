"use client"
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Spinner } from 'keep-react'

export default function Dashboard() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const handleSignOut = () => {
        setIsLoading(true)
        signOut()
        setIsLoading(false)
    }
    return (
        <div className=' h-[650px] lg:h-[950px] flex items-center justify-center'>
            <div className='w-[350px] lg:w-[750px] space-y-2 rounded-lg border p-8 shadow-md border-metal-50'>
                <h1 className='text-2xl font-semibold'>Name: {session?.user?.name}</h1>
                <h1 className='text-2xl font-semibold'>Email: {session?.user?.email}</h1>
                <div className='flex'>
                    {
                        isLoading ?
                            <div className='bg-red-500 text-white p-5'>
                                <Spinner/>
                            </div> : 
                            <div onClick={handleSignOut} className='bg-red-500 cursor-pointer text-white p-5'>
                            <h1>Logout</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
