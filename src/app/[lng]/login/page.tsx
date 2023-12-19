'use client'
import api from '@/api'
import LoginForm from '@/components/login/LoginForm'
import { Skeleton } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
    params: {
        lng: string
    }
}
export default function Page({ params: { lng } }: Props) {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('code')) {
            (async () => {
                const response = await api.post('/auth/login', {
                    code: searchParams.get('code')
                })
                console.log(response)
            })();
        }
    }, [searchParams.get('code')])
    return (
        <>
            {searchParams.get('code') ? <Skeleton variant="rectangular" className='w-full h-screen' /> : <div className='bg-slate-50 pt-10 py-52 flex justify-center'>
                <LoginForm lng={lng} />
            </div>
            }
        </>
    )
}