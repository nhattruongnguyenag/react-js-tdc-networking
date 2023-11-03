import React from 'react'
import AddCheckboxChoiceButton from './AddCheckboxChoiceButton'
import CheckboxChoice from './CheckboxChoice'
import EditCheckboxChoice from './EditCheckboxChoice'
import QuestionOptions from './QuestionOptions'
import QuestionTitle from './QuestionTitle'

export default function MultiQuestionMultiChoice() {
  return <div className='border mt-3'>
    <QuestionTitle />
    <div className='ms-2'>
      <EditCheckboxChoice />
      <EditCheckboxChoice />
      <EditCheckboxChoice />
      <AddCheckboxChoiceButton />
    </div>
    <QuestionOptions />
  </div>
}
