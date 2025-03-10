import React from 'react'
import Login from '../components/Login/Login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function page() {
    const session = await getServerSession(authOptions)
        if(session){
            redirect('/dashboard')
        }
  return (
    <div>
        <Login></Login>
    </div>
  )
}
