'use client'
import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { setUserAuth } from '@/redux/reducers/auth'
import { ACCESS_TOKEN, FACEBOOK_ACCESS_TOKEN } from '@/utils/constant'
import { useMutation } from 'react-query'
import { authServices } from '@/api/services/auth'
type Props = {
    lng: string
}
const { getFacebookInfoAccount } = authServices
export default function Header({ lng }: Props) {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()
    const handleLoutoutAccount = () => {
        dispatch(setUserAuth(null))
        localStorage.removeItem(FACEBOOK_ACCESS_TOKEN)
    }

    const getFacebookInfoAccountMutation = useMutation({
        mutationKey: ['Facebook/Account'],
        mutationFn: () => {
            return getFacebookInfoAccount()
        },
        onSuccess: (data) => {
            dispatch(setUserAuth(data.data))
        }
    })

    useEffect(() => {
        const facebookToken = localStorage.getItem(FACEBOOK_ACCESS_TOKEN);
        if (facebookToken) {
            getFacebookInfoAccountMutation.mutate()
        }
    }, [])
    return (
        <div className='flex items-center justify-between py-4 pl-2'>
            <TextField size='small' id="outlined-search" label="Search field" type="search" />
            <Link href={`/${lng}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 sc-eGJbfJ sc-bWWQYT iZpSJz bwmJft h-[25px] w-[135px]"><path d="M26.911.196L21.875 23.37h5.192L32.083.196h-5.172zM13.786 5.193l1.07-4.997h-9.82L0 23.37h5.192l2.06-9.54H11.9l1.108-5.116H8.361l.758-3.521h4.667zm3.752 13.298L21.505.196h-5.172L11.297 23.37h9.314l1.07-4.879h-4.143zM55.223.196l-1.809 8.322h-2.06L53.141.196H47.97L42.953 23.37h5.172l2.1-9.698h2.08l-2.1 9.698h5.173L60.395.196h-5.172zm6.454 0l-1.166 5.331h2.76l-3.85 17.843h5.173l3.87-17.843h2.586l1.147-5.33h-10.52zM37.275 13.652h1.478l-.836 3.856c-.117.551-.486.767-.895.767-2.216 0-1.575-5.822.35-10.111 1.148-2.557 3.209-2.97 4.395-2.872a17.16 17.16 0 012.955.55c.331-1.494.798-3.658 1.167-5.35C44.936.256 43.342 0 42.41 0c-3.87 0-6.65 1.534-8.79 4.643-2.002 2.911-3.383 8.32-3.383 11.842 0 4.564 1.711 7.063 6.767 7.063 1.497 0 3.092-.08 4.706-.65l3.13-14.4h-6.436l-1.128 5.155zm54.172 4.839L95.413.196h-5.172L85.205 23.37h9.314l1.05-4.879h-4.122zM108.189.196c-1.361 6.276-3.48 16.053-3.655 16.84-.253 1.18-.836 1.377-1.614 1.377-.895 0-1.07-.512-.895-1.377.078-.335 2.353-10.84 3.656-16.84h-5.114c-1.03 4.8-3.13 14.44-3.694 17.036-.759 3.502.155 4.682 1.069 5.45 1.128.944 2.683 1.023 3.753 1.023 2.489 0 3.772-.433 4.88-1.28 1.109-.825 2.353-1.966 2.956-4.78.428-1.986 2.567-11.901 3.772-17.449h-5.114z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M121.47.196c3.111 0 4.375 1.377 4.375 3.66 0 2.793-1.225 5.586-3.053 6.727.33.354 1.225 1.318 1.225 3.148 0 2.459-1.089 6.944-3.87 8.656-1.477.904-2.78.983-6.008.983h-4.492L114.684.196h6.786zm-2.917 8.42h-.681l.837-3.836h.641c.856 0 1.05.846 1.05 1.279.02 1.16-.7 2.557-1.847 2.557zm-.389 8.479c-.214.767-.797 1.357-1.594 1.357h-.836l1.069-4.957h.836c.7 0 1.031.59 1.031 1.121 0 .511-.292 1.77-.506 2.479z" fill="currentColor"></path><path d="M85.575.02c-1.886 0-4.628.334-6.786 3.777-1.672 2.675-3.345 11.567-3.345 14.046 0 5.252 3.83 5.645 6.573 5.645.952 0 1.633-.098 1.827-.137l1.206-5.508a21.47 21.47 0 01-2.547.02c-2.023-.178-1.828-1.929-1.575-3.463a61.478 61.478 0 011.166-5.312c.33-1.18.603-2.32 1.595-3.127 1.05-.846 2.547-.512 3.753-.276l1.186-5.45C87.967.158 86.76.02 85.575.02z" fill="currentColor"></path></svg></Link>
            <ul className='list-none flex gap-6 text-base'>
                <li><Link className='no-underline text-black' href={"/"}>Sneakers</Link></li>
                <li><Link className='no-underline text-black' href={"/"}>Stores</Link></li>
                {user ? <li className='cursor-pointer relative pr-2 popup'>Account
                    <ul className='list-none text-base absolute bg-white z-10 text-right showlist right-0 px-3 py-2 min-w-[170px]'>
                        <li className='py-2 px-4'>My Account</li>
                        <li className='py-2 px-4'>My Orders</li>
                        <li className='py-2 px-4'>Support</li>
                        <li className='py-2 px-4' onClick={() => {
                            handleLoutoutAccount()
                        }}>Sign Out</li>
                    </ul>
                </li> : <li className='cursor-pointer pr-2'>
                    <Link href={`/${lng}/login`} className='no-underline text-black'>Sign In</Link>
                </li>}
            </ul>
        </div>
    )
}