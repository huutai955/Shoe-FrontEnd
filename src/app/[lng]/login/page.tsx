'use client'
import api from '@/api'
import { authServices } from '@/api/services/auth'
import LoginForm from '@/components/login/LoginForm'
import { setUserAuth } from '@/redux/reducers/auth'
import { AppDispatch } from '@/redux/store'
import { ACCESS_TOKEN } from '@/utils/constant'
import { Skeleton } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'

type Props = {
    params: {
        lng: string
    }
}

const { loginFaceBookAccount } = authServices
export default function Page({ params: { lng } }: Props) {
    const searchParams = useSearchParams();
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()

    const LoginAuth = useQuery({
        queryKey: ['Auth/Login'],
        queryFn: () => {
            return loginFaceBookAccount(searchParams.get('code') as string)
        },
        enabled: searchParams.get('code') ? true : false,
        onSuccess: (data) => {
            dispatch(setUserAuth(data.data))
            router.push(`/${lng}`)
            localStorage.setItem(ACCESS_TOKEN, data.data[ACCESS_TOKEN])
        },
        staleTime: 12 * 60 * 1000,
    })


    return (
        <>
            {searchParams.get('code') ? <Skeleton variant="rectangular" className='w-full h-screen' /> : <div className='bg-slate-50 pt-10 py-52 flex justify-center'>
                <LoginForm lng={lng} />
            </div>
            }
        </>
    )
}