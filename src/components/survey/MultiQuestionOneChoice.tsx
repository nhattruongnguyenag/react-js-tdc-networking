import React from 'react'
import AddRadioChoiceButton from './AddRadioChoiceButton'
import EditRadioChoice from './EditRadioChoice'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'
import RadioChoice from './RadioChoice'

export default function MultiQuestionOneChoice() {
  return <div className='border mt-3'>
    <QuestionTitle />
    <div className='ms-2'>
      <EditRadioChoice />
      <EditRadioChoice />
      <EditRadioChoice />
      <AddRadioChoiceButton />
    </div>
    <QuestionOptions />
  </div>
}
