import classNames from 'classnames'
import { useCallback, useRef } from 'react'
import {
  ADD_QUESTION_VIEW_COMPONENT_TITLE_CONTAINS_SPECIAL_CHARACTER_VALIDATE,
  ADD_QUESTION_VIEW_COMPONENT_TITLE_INPUT_PLACEHOLDER,
  QUESTION_COMPONENT_ADD_TEXT_TITLE
} from '../../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { updateQuestion, updateQuestionTitleValidate } from '../../redux/Slice'
import { isBlank } from '../../utils/ValidateUtils'
import ValidateTextView from '../common/ValidateTextView'

interface QuestionTitleProps {
  questionIndex?: number
  editMode?: boolean
  reviewMode?: boolean
  conductMode?: boolean
}

export default function QuestionTitle(props: QuestionTitleProps) {
  const { surveyPostRequest, questionTitleValidates } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const inputTitleRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()
  const questionIndex = props.questionIndex ?? -1
  const validate = questionTitleValidates[questionIndex]
  let questionTitle: string = surveyPostRequest.questions[questionIndex].title

  const setTitleError = useCallback(
    (error: string) => {
      dispatch(
        updateQuestionTitleValidate({
          index: questionIndex,
          validate: {
            ...validate,
            textError: error,
            isError: true,
            isVisible: true
          }
        })
      )
      return
    },
    [questionTitleValidates]
  )

  const onFocusOut = () => {
    let value = inputTitleRef.current?.value ?? ''
    dispatch(
      updateQuestion({
        index: questionIndex,
        question: {
          ...surveyPostRequest.questions[questionIndex],
          title: value
        }
      })
    )

    if (isBlank(value)) {
      setTitleError(ADD_QUESTION_VIEW_COMPONENT_TITLE_CONTAINS_SPECIAL_CHARACTER_VALIDATE)
      return
    }

    dispatch(
      updateQuestionTitleValidate({
        index: questionIndex,
        validate: {
          ...questionTitleValidates[questionIndex],
          isError: false,
          isVisible: false
        }
      })
    )
  }

  return (
    <div className='border-b-[1px] border-b-gray-500'>
      <div className={classNames('relative z-0 ms-2 mt-4')}>
      <input
        ref={inputTitleRef}
        onBlur={() => onFocusOut()}
        defaultValue={questionTitle}
        disabled={Boolean(props.reviewMode || props.conductMode)}
        type='text'
        id='floating_standard'
        className='peer block w-full appearance-none text-ellipsis border-0 border-b-2 border-gray-300 bg-transparent pb-2 pr-3 pt-3 text-sm font-medium text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
        placeholder={ADD_QUESTION_VIEW_COMPONENT_TITLE_INPUT_PLACEHOLDER}
      />

        <label
          htmlFor='floating_standard'
          className='absolute top-3 -z-10 origin-[0] -translate-y-6 transform text-blue-600 duration-300 peer-focus:left-0 peer-focus:dark:text-blue-500'
        >
          {QUESTION_COMPONENT_ADD_TEXT_TITLE} {(props.questionIndex ?? 0) + 1}
          {surveyPostRequest.questions[questionIndex].required === 1 && (
            <span className='text-red-500'>&nbsp;&nbsp;*</span>
          )}
        </label>

        {Boolean(props.editMode) && validate && (
          <div className='mb-1'>
            <ValidateTextView
              textError={validate?.textError}
              isError={validate?.isError}
              isVisible={validate?.isVisible}
            />
          </div>
        )}
      </div>
    </div>
  )
}
