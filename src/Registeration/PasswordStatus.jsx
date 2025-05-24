import React from 'react'

export default function PasswordStatus({message}) {
  return (
    <div>
        <p className='text-center text-red-300 mt-4'>{message}</p>

    </div>
  )
}
