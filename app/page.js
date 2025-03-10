import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold my-10 text-center">Welcome to Test Auth Web</h1>
      <div className='flex justify-center'>
        <Link href="/login">
          <div className='bg-green-500 text-white p-5'>
            <h1>Sign in</h1>
          </div></Link>
      </div>
    </div>
  );
}
