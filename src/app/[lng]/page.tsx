'use client'
import React from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { increment } from '@/redux/reducers/counter'
type Props = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: Props) {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch: AppDispatch = useDispatch()
  return (
    <>
      <div className='relative'>
        <img src="https://cms-cdn.flightclub.com/2200/ea0ac0df7870-454b-ee11-1769-060a2f41.gif" className='w-full h-[700px] object-cover ' alt="" />
        <div className='max-w-2xl absolute top-[35%] left-[10%]'>
          <h2 className='text-[50px] text-white'>AIR JORDAN 11 RETRO 'GRATITUDE / DEFINING MOMENTS'</h2>
        </div>
        <h2>{count}</h2>
        <button onClick={() => {
          dispatch(increment())
        }}>Increate</button>
      </div>
    </>
  )
}