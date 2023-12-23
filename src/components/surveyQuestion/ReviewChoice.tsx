import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppSelector } from '../../redux/Hook'
import { ChoiceProps } from './EditChoice'

export default function ReviewChoice(props: ChoiceProps) {
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  return (
    <div className='mt-3 flex items-center'>
      {props.type && props.type === ONE_CHOICE_QUESTION ? (
        <input
          id='default-radio-1'
          type='radio'
          name='default-radio'
          className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      ) : (
        <input
          id='default-checkbox'
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      )}
      <label className='ml-2 pr-3 text-justify text-sm text-gray-900 dark:text-gray-300'>
        {surveyPostRequest.questions[props.questionIndex ?? -1].choices[props.choiceIndex ?? -1].content}
      </label>
    </div>
  )
}
