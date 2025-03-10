import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1 className="text-4xl font-bold my-10 text-center">Welcome to Test Auth Web</h1>
      <div className='flex justify-center'>
        {
          session?.user ?
            <Link href="/dashboard">
              <div className='bg-green-500 text-white p-5'>
                <h1>Dashboard</h1>
              </div></Link> :
            <Link href="/login">
              <div className='bg-green-500 text-white p-5'>
                <h1>Sign in</h1>
              </div></Link>
        }
      </div>
    </div>
  );
}
