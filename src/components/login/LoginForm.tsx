import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import Link from 'next/link'
type Props = {
    lng: string
}

export default function LoginForm({ lng }: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <form className='w-[32.188rem] bg-white p-8 flex flex-col gap-4' onSubmit={handleSubmit}>
            <h2 className='text-[1.125rem]'>Login</h2>
            <div className='flex flex-col gap-1'>
                <p className='text-gray-c1 text-base'>Email Address</p>
                <TextField className='w-full' size='medium' type='email' required placeholder='Enter your email address' />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-gray-c1 text-base'>Password</p>
                <OutlinedInput className='w-full' size='medium' required type={showPassword ? 'text' : 'password'} placeholder='Enter your password'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    } />
            </div>                <Link href={``}>Forgot Password?</Link>
            <Button className='bg-gray-100 text-black text-base mt-5 py-3 hover:bg-gray-200' type='submit'>Login</Button>
            <div className='flex items-center'>
                <div className='border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-950 grow'></div>
                <div className='mx-2'>
                    <p className='text-sm'>NEW TO FLIGHT CLUB?</p>
                </div>
                <div className='border-b border-solid border-t-0 border-r-0 border-l-0 border-b-gray-950 grow'></div>
            </div>
            <Button variant='outlined' className='border border-solid border-black text-black text-base mt-5 py-3 '>Create An Account</Button>
            <Link href={`https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URL}${lng}/login&scope=email,public_profile`}>Login With Facebook</Link>
        </form>
    )
}