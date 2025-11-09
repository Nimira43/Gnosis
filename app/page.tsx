import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-light'>
      <div className='text-center space-y-6'>
        <h1 className='text-5xl text-dark logo'>Gnosis</h1>
        <Link
          href='/login'
          className='inline-block font-medium uppercase px-6 py-3 bg-dark text-light rounded'
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}

export default page
