'use client'
import React, { useState } from 'react'
import { Button, Input, InputIcon, Label, Spinner, toast } from 'keep-react'
import { Envelope, Lock } from 'phosphor-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



export default function Registration() {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const handleFormData = async e => {
        e.preventDefault()
        setIsLoading(true)
        if (!userName || !email || !password) {
            setError("All field are required")
        } else {
            setError("")
        }
        const data = { email, userName, password }
        try {
            const resExistUser = await fetch("/api/userExist", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const { user } = await resExistUser.json()

            if (user) {
                setError("User already exists")
                toast.error("User already exist")
                setIsLoading(false)
                return
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const form = e.target;
                form.reset()
                toast.success("Registered Successfully")
                setIsLoading(false)
                router.push('/login')
            }
        } catch {
            setIsLoading(false)
            toast.error("Registered Failed")
        }
    }
    return (
        <div className=' h-[650px] lg:h-[950px] flex items-center justify-center'>
            <form onSubmit={handleFormData} className=" w-[350px] lg:w-[750px] space-y-2 rounded-lg border p-8 shadow-md border-metal-50 dark:border-metal-800/50">
                <fieldset className="space-y-1">
                    <Label htmlFor="name">Email</Label>
                    <div className="relative">
                        <Input onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" type='email' required className="ps-11" />
                        <InputIcon>
                            <Envelope size={19} color="#AFBACA" />
                        </InputIcon>
                    </div>
                </fieldset>
                <fieldset className="space-y-1">
                    <Label htmlFor="name">User Name</Label>
                    <div className="relative">
                        <Input onChange={(e) => setUserName(e.target.value)} placeholder="Enter name" required type='text' className="ps-11" />
                        <InputIcon>
                            <Envelope size={19} color="#AFBACA" />
                        </InputIcon>
                    </div>
                </fieldset>
                <fieldset className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input required onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter password" type="password" className="ps-11" />
                        <InputIcon>
                            <Lock size={19} color="#AFBACA" />
                        </InputIcon>
                    </div>
                </fieldset>
                {
                    error &&
                    <div className='flex'>
                        <div className='bg-red-500 text-white px-5 py-2 rounded-lg'>
                            <h1>{error}</h1>
                        </div>
                    </div>
                }
                <div>
                    <h1>Already Have Account? <Link href="/login">Login now</Link></h1>
                </div>
                {
                    isLoading ?
                        <Button size="sm" color="secondary">
                            <Spinner />
                        </Button> :
                        <Button size="sm" color="secondary" type="submit">
                            Register
                        </Button>
                }
            </form>
        </div>
    )
}
