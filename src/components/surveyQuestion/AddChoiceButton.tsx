import { ADD_CHOICE_BUTTON } from '../../constants/StringVietnamese'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppDispatch } from '../../redux/Hook'
import { addChoice } from '../../redux/Slice'

interface AddChoiceButtonProps {
  questionIndex?: number
  type?: string
}

export default function AddChoiceButton(props: AddChoiceButtonProps) {
  const dispatch = useAppDispatch()
  return (
    <div className='mt-3 flex items-center'>
      {props.type && props.type === ONE_CHOICE_QUESTION ? (
        <input
          id='default-radio-1'
          disabled
          checked={false}
          type='radio'
          name='default-radio'
          className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      ) : (
        <input
          id='default-checkbox'
          disabled
          type='checkbox'
          className='h-3.5 w-3.5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      )}
      <label
        onClick={() => {
          dispatch(addChoice({ questionIndex: props.questionIndex ?? -1 }))
        }}
        htmlFor='default-radio-1'
        className='font-se ml-2 cursor-pointer text-sm font-medium text-blue-500 hover:text-blue-400 dark:text-gray-300'
      >
        {ADD_CHOICE_BUTTON}
      </label>
    </div>
  )
}
