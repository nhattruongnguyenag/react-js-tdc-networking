import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { QUESTION_BOTTOM_BAR_QUESTION_REQUIRE_TOGGLE } from '../../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { deleteQuestion, deleteQuestionTitleValidate, updateQuestion } from '../../redux/Slice'

interface QuestionOptionsProps {
  questionIndex?: number
  editMode?: boolean
  reviewMode?: boolean
  conductMode?: boolean
}

export default function QuestionOptions(props: QuestionOptionsProps) {
  const dispatch = useAppDispatch()
  const checkboxRef = useRef<HTMLInputElement | null>(null)
  const questionIndex = props.questionIndex ?? -1
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isChecked, setChecked] = useState(surveyPostRequest.questions[questionIndex].required === 1)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = surveyPostRequest.questions[questionIndex].required === 1
    }
  }, [])

  useEffect(() => {
    if (props.editMode) {
      dispatch(
        updateQuestion({
          index: questionIndex,
          question: {
            ...surveyPostRequest.questions[questionIndex],
            required: isChecked ? 1 : 0
          }
        })
      )
    }
  }, [isChecked, props.editMode])

  useEffect(() => {
    console.log('11111111111111111', surveyPostRequest.questions[props.questionIndex ?? -1])
  }, [surveyPostRequest])
  return (
    <div className='mb-2 flex items-center justify-end'>
      <button
        onClick={() => {
          dispatch(deleteQuestionTitleValidate({ index: props.questionIndex ?? -1 }))
          dispatch(deleteQuestion(props.questionIndex ?? -1))
        }}
        type='button'
        className='inline-flex items-center rounded-full p-2.5 text-center text-sm font-medium text-red-700 hover:bg-gray-100 focus:outline-none'
      >
        <FontAwesomeIcon icon={icon({ name: 'trash-can' })} />
      </button>

      <label className='relative mr-5 ms-2 inline-flex cursor-pointer items-center'>
        <input
          onChange={(event) => {
            setChecked(!isChecked)
          }}
          ref={checkboxRef}
          type='checkbox'
          className='peer sr-only'
        />
        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-purple-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-purple-800" />
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          {QUESTION_BOTTOM_BAR_QUESTION_REQUIRE_TOGGLE}
        </span>
      </label>
    </div>
  )
}
