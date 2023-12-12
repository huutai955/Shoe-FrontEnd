'use client'
import { useTranslation } from '@/app/i18n/client'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
    params: {
        lng: string
    }
}

export default function Page({ params }: Props) {
    const pathname = usePathname()
    const { t } = useTranslation(params.lng)
    return (
        <div>{t('title')}</div>
    )
}