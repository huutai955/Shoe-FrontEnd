'use client'
import { LinearProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/en')
  }, [])
  return (
    <LinearProgress />
  )
}
