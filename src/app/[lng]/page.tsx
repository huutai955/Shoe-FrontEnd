import React from 'react'
import { useTranslation } from '../i18n'

type Props = {
  params: {
    lng: string
  }
}

export default async function Page({ params: { lng } }: Props) {
  const { t } = await useTranslation(lng, 'translation')
  console.log(lng)
  return (
    <div>{t('title')}</div>
  )
}