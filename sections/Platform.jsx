import React from 'react'
import Image from 'next/image'
export default function Platform() {
  return (
    <div className='h-screen mt-12 text-black'>
      <div className='h-160 bg-white flex justify-center items-center'>
        <div>
          <Image src="/assets/hero-image.png" alt="Hero illustration" width={500} height={500} priority className="object-contain rounded-3xl" />
        </div>
        <div className=' space-y-8 m-14'>
          <h1 className='text-4xl font-bold'>Your Peace of Mind  is our Priority</h1>
          <div>
            <h2 className='text-2xl'>Certified Professionals</h2>
            <p className='text-lg text-gray-600'> Each provider is thoroughly vetted, background‑checked, and verified to ensure consistent quality.</p>
          </div>
          <div>
            <h2 className='text-2xl'>Effortless Scheduling</h2>
            <p className='text-lg text-gray-600'>Book services instantly with clear availability and upfront pricing—no surprises, just convenience.</p>
          </div>
          <div>
            <h2 className='text-2xl'>Trusted Transactions</h2>
            <p className='text-lg text-gray-600'>Complete payments safely through our platform, released only once your service is delivered. </p>
          </div>
        </div>
      </div>
    </div>
  )
}
