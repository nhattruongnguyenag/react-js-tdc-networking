import { useState } from 'react'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppSelector } from '../../redux/Hook'
import { ChoiceProps } from './EditChoice'

interface ConductChoiceProps extends ChoiceProps {
  onSelected?: () => void
}

export default function ConductChoice(props: ConductChoiceProps) {
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  return (
    <div className='mt-3 flex items-center'>
      {props.type && props.type === ONE_CHOICE_QUESTION ? (
        <input
          onClick={props.onSelected}
          id={'radio-' + props.choiceIndex?.toString()}
          type='radio'
          name='default-radio'
          className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      ) : (
        <input
          onClick={props.onSelected}
          id={'checkbox-' + props.choiceIndex?.toString()}
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      )}
      <label
        htmlFor={(props.type && props.type === ONE_CHOICE_QUESTION ? 'radio-' : 'checkbox-') + props.choiceIndex?.toString()}
        className='ml-2 pr-3 text-justify text-sm text-gray-900 dark:text-gray-300'>
        {surveyPostRequest.questions[props.questionIndex ?? -1].choices[props.choiceIndex ?? -1].content}
      </label>
    </div>
  )
}
