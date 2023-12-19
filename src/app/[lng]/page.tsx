import React from 'react'
import './index.scss'
type Props = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: Props) {
  return (
    <>
      <div className='relative'>
        <img src="https://cms-cdn.flightclub.com/2200/ea0ac0df7870-454b-ee11-1769-060a2f41.gif" className='w-full h-[700px] object-cover ' alt="" />
        <div className='max-w-2xl absolute top-[35%] left-[10%]'>
          <h2 className='text-[50px] text-white'>AIR JORDAN 11 RETRO 'GRATITUDE / DEFINING MOMENTS'</h2>
        </div>
      </div>
    </>
  )
}