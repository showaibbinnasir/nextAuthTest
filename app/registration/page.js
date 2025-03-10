import React from 'react'
import Registration from '../components/Registration/Registration'
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
        <Registration></Registration>
    </div>
  )
}
