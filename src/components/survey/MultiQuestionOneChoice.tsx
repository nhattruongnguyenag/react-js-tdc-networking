import React from 'react'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

export default function MultiQuestionOneChoice() {
  return <div className='border mt-3'>
    <QuestionTitle />
    <div className='ms-2 border-dotted border-b-2 border-indigo-600'>
      <input disabled placeholder='Nhập câu trả lời' className='w-full bg-gray-100 bg-inherit py-2' />
    </div>
    <QuestionOptions />
  </div>
}
