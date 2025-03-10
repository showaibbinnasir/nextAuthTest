import Link from 'next/link'
import React from 'react'

export default function NavigationBar() {
  return (
    <div className='p-5'>
        <Link href='/'><h1 className='text-2xl'>Home</h1></Link>
    </div>
  )
}
