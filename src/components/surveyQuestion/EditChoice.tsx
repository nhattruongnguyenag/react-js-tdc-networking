import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ADD_QUESTION_VIEW_COMPONENT_CHOICE_INPUT_PLACEHOLDER } from '../../constants/StringVietnamese'
import { ONE_CHOICE_QUESTION } from '../../pages/CreateSurveyPostPage'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { deleteChoice, updateChoice } from '../../redux/Slice'
import { useRef } from 'react'

export interface ChoiceProps {
  choiceIndex?: number
  questionIndex?: number
  type?: string
}

export default function EditChoice(props: ChoiceProps) {
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const choiceIndex = props.choiceIndex ?? -1
  const questionIndex = props.questionIndex ?? -1
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onDeleteChoice = () => {
    dispatch(deleteChoice({ questionIndex: questionIndex, choiceIndex: choiceIndex }))
  }

  return (
    <div className='mt-3 flex items-center'>
      {props.type && props.type === ONE_CHOICE_QUESTION ? (
        <input
          disabled
          checked={false}
          type='radio'
          name='default-radio'
          className='h-5 w-5 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700'
        />
      ) : (
        <input
          id='default-checkbox'
          disabled
          checked={false}
          type='checkbox'
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
        />
      )}
      <input
        ref={inputRef}
        placeholder={ADD_QUESTION_VIEW_COMPONENT_CHOICE_INPUT_PLACEHOLDER + ' ' + (choiceIndex + 1)}
        onBlur={() => {
          dispatch(
            updateChoice({
              questionIndex: questionIndex,
              choiceIndex: choiceIndex,
              choice: inputRef.current?.value ?? ''
            })
          )
        }}
        defaultValue={surveyPostRequest.questions[questionIndex].choices[choiceIndex].content}
        className='ms-2 mt-1 w-full text-ellipsis border-dotted border-indigo-600 bg-gray-100 bg-inherit py-1 hover:border-b-2 focus:border-b-2'
      />
      <button
        onClick={onDeleteChoice}
        type='button'
        className='mx-3 inline-flex items-center rounded-full p-2 text-center text-gray-700 hover:bg-gray-100 focus:outline-none'
      >
        <FontAwesomeIcon style={{ fontSize: 20 }} icon={icon({ name: 'close' })} />
      </button>
    </div>
  )
}
