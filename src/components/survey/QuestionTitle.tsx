import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { updateQuestion, updateQuestionTitleValidate } from '../../redux/Slice'
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange } from '../../utils/ValidateUtils'
import ValidateTextView from '../common/ValidateTextView'

interface QuestionTitleProps {
    index?: number
    reviewMode?: boolean
}

export default function QuestionTitle(props: QuestionTitleProps) {
    const { surveyPostRequest, questionTitleValidates } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()
    const questionIndex = props.index ?? -1
    const validate = questionTitleValidates[questionIndex]
    const { title } = surveyPostRequest.questions[questionIndex]


    const setTitleError = useCallback((error: string) => {
        dispatch(updateQuestionTitleValidate({
            index: questionIndex,
            validate: {
                ...validate,
                textError: error,
                isError: true,
                isVisible: true
            }
        }))
        return
    }, [questionTitleValidates])

    const onTitleChangeText = (value: string) => {
        dispatch(updateQuestion({
            index: questionIndex,
            question: {
                ...surveyPostRequest.questions[questionIndex],
                title: value
            }
        }))

        if (isBlank(value)) {
            setTitleError("Tiêu đề không được để trống")
            return
        }

        dispatch(updateQuestionTitleValidate({
            index: questionIndex,
            validate: {
                ...questionTitleValidates[questionIndex],
                isError: false,
                isVisible: false
            }
        }))
    }

    return (
        <div className='border-b-[1px] border-b-gray-500'>
            <div className={classNames('relative z-0 ms-2 mt-4')}>
                <input
                    value={surveyPostRequest.questions[questionIndex].title}
                    disabled={Boolean(props.reviewMode)}
                    onChange={(event) => onTitleChangeText(event.target.value)}
                    type="text"
                    id="floating_standard"
                    className="text-ellipsis font-medium block pt-3 pb-2 pr-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Nhập tiêu đề câu hỏi..." />

                <label htmlFor="floating_standard" className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-blue-600 peer-focus:dark:text-blue-500">Câu {(props.index ?? 0) + 1}</label>

                <div className='mb-1'>
                    <ValidateTextView
                        textError={validate.textError}
                        isError={validate.isError}
                        isVisible={validate.isVisible}
                    />
                </div>
            </div>
        </div>
    )
}
