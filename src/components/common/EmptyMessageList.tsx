import React from 'react'

export default function EmptyMessageList() {
  return (
    <div className='absolute top-[50%] flex w-full translate-y-[-70%] flex-col items-center justify-center'>
      <img src='/assets/images/empty-message.svg' alt='empty-list' className='w-32' />
      <h2 className='text-black'>Danh sách rỗng</h2>
    </div>
  )
}
