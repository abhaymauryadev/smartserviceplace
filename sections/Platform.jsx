import React from 'react'
import Image from 'next/image'
export default function Platform() {
  return (
    <div className='h-screen border border-black mt-12'>
        <div className='h-[40rem] bg-white flex justify-center items-center border border-black'>
            <div>
                <Image src="/assets/hero-image.png" alt="Hero illustration" width={500} height={500} priority className="object-contain rounded-3xl"/>
            </div>
            <div></div>
        </div>
    </div>
  )
}
