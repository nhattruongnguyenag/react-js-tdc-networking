import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

export default function ShortAnswerQuestion() {
    return (
        <div className='border mt-3'>
            <QuestionTitle />
            <div className='ms-2 border-dotted border-b-2 border-indigo-600 w-6/12'>
                <input disabled placeholder='Câu trả lời' className='w-full bg-gray-100 bg-inherit py-2 mt-1' />
            </div>
            <QuestionOptions />
        </div>
    )
}
