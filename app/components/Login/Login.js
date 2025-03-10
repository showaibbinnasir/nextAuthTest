'use client'
import { Button, Input, InputIcon, Label, Spinner, toast } from 'keep-react'
import Link from 'next/link'
import { Envelope, Lock } from 'phosphor-react'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        const data = { email, password }
        try {
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res.error) {
                setError("Invalid Credentials")
                return
            }
            setError("")
            setIsLoading(false)
            toast.success("Logged in successfully")
            router.replace('dashboard')
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong")
        }

    }

    return (
        <div className=' h-[650px] lg:h-[950px] flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=" w-[350px] lg:w-[750px] space-y-2 rounded-lg border p-8 shadow-md border-metal-50 dark:border-metal-800/50">
                <fieldset className="space-y-1">
                    <Label htmlFor="name">Email</Label>
                    <div className="relative">
                        <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder="Enter email" className="ps-11" />
                        <InputIcon>
                            <Envelope size={19} color="#AFBACA" />
                        </InputIcon>
                    </div>
                </fieldset>
                <fieldset className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter password" type="password" className="ps-11" />
                        <InputIcon>
                            <Lock size={19} color="#AFBACA" />
                        </InputIcon>
                    </div>
                </fieldset>
                {
                    error && <div className='flex'>
                        <div className='bg-red-500 text-white px-5 py-2 rounded-lg'>
                            <h1>{error}</h1>
                        </div>
                    </div>
                }
                <div>
                    <h1>Havent created account yet? <Link href="/registration">Register now</Link></h1>
                </div>
                {
                    isLoading ?
                        <Button size="sm" color="secondary">
                            <Spinner />
                        </Button> :
                        <Button size="sm" color="secondary" type="submit">
                            Sign In
                        </Button>
                }
            </form>
        </div>
    )
}
