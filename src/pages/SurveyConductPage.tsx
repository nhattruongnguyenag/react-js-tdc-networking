import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isVisible } from '@testing-library/user-event/dist/utils'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/surveyQuestion/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/surveyQuestion/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/surveyQuestion/ShortAnswerQuestion'
import TextValidate from '../components/TextValidate'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useAddSurveyConductAnswerMutation, useGetQuestionsFromSurveyPostQuery } from '../redux/Service'
import { setQuestionConducts } from '../redux/Slice'
import { AnswerRequest, SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { QuestionResponse } from '../types/response/QuestionResponse'
import { getIdFromSlug } from '../utils/CommonUtls'
import { InputTextValidate, isNotBlank } from '../utils/ValidateUtils'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION, SHORT_ANSWER } from './CreateSurveyPostPage'

const isAllFieldValid = (validates: InputTextValidate[]) => {
    for (let validate of validates) {
        if (validate.isError) {
            return false
        }
    }

    return true
}

export default function SurveyConductPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { userLogin, questionConducts } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [validates, setValidates] = useState<InputTextValidate[]>([])
    const [surveyConductRequestAPI, surveyConductRequestResult] = useAddSurveyConductAnswerMutation()

    const [surveyConductRequest, setSurveyConductRequest] = useState<SurveyConductRequest>({
        user_id: userLogin?.id ?? -1,
        answers: []
    })

    const { slug } = useParams()
    const surveyPostId = getIdFromSlug(slug ?? '') ?? -1

    const { data, isFetching, isSuccess } = useGetQuestionsFromSurveyPostQuery({
        postId: surveyPostId,
        userLogin: userLogin?.id ?? -1
    })

    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setQuestionConducts(data.data.questions))
        }
    }, [data])

    const onBtnPublishPostPress = () => {
        if (isAllFieldValid(validates)) {
            surveyConductRequestAPI(surveyConductRequest)
        } else {
            const tempValidate = [...validates]
            for (let index = 0; index < tempValidate.length; index++) {
                if (tempValidate[index].isError && questionConducts[index].required === 1) {
                    tempValidate[index].isVisible = true
                }

            }
            setValidates(tempValidate)
        }
    }

    useEffect(() => {
        if (surveyConductRequestResult.isSuccess) {
            toast.success('Câu trả lời đã được lưu. Cảm ơn bạn đã tham gia trả lời khảo sát')
            navigate(-1)
        }
    }, [surveyConductRequestResult])

    useEffect(() => {
        if (data && !isFetching && isSuccess) {
            let answer: AnswerRequest[] = []
            let tempValidates: InputTextValidate[] = []
            for (let question of data.data.questions) {
                answer.push({
                    question_id: question.id,
                    choices_ids: [],
                    content: ''
                })

                let textError = ''

                if (question.type === SHORT_ANSWER) {
                    textError = 'Vui lòng nhập nội dung câu trả lời'
                } else if (question.type === MULTI_CHOICE_QUESTION) {
                    textError = 'Vui lòng chọn ít nhất một câu trả lời'
                } else if (question.type === ONE_CHOICE_QUESTION) {
                    textError = 'Vui lòng chọn một câu trả lời'
                }

                tempValidates.push({
                    textError: textError,
                    isError: question.required === 1,
                    isVisible: false
                })
            }

            setSurveyConductRequest({
                ...surveyConductRequest,
                answers: answer
            })

            setValidates(tempValidates)
        }
    }, [data])

    const renderMultiChoiceQuestionItem = useCallback((item: QuestionResponse, index: number) => (
        <MultiQuestionMultiChoice
            conductMode
            index={index}
            onChangeValue={(choices) => onChoicesValueChange(item, index, choices)}
        />
    ), [surveyConductRequest])

    const renderOneChoiceQuestionItem = useCallback((item: QuestionResponse, index: number) => (
        <MultiQuestionOneChoice
            conductMode key={index}
            index={index}
            onChangeValue={(choices) => onChoicesValueChange(item, index, choices)}
        />
    ), [surveyConductRequest])

    const onChoicesValueChange = useCallback((item: QuestionResponse, index: number, choices: number[]) => {
        const error = {
            index: index,
            isError: false,
            isVisible: false
        }
        if (surveyConductRequest.answers[index]) {
            if (choices.length > 0) {
                surveyConductRequest.answers[index].choices_ids = choices
            } else {
                if (item.required === 1) {
                    error.isError = true
                    error.isVisible = true
                }
            }

            setError(error)
        }
    }, [validates])

    const setError = useCallback((error: { index: number, isError: boolean, isVisible: boolean }) => {
        let tempValidates = [...validates]
        tempValidates[error.index].isError = error.isError
        tempValidates[error.index].isVisible = error.isVisible
        setValidates(tempValidates)
    }, [validates])

    const renderShortAnswerQuestionItem = useCallback((item: QuestionResponse, index: number) => (
        <ShortAnswerQuestion
            conductMode
            index={index}
            onAnswerChangeText={(value) => {
                const error = {
                    index: index,
                    isError: false,
                    isVisible: false
                }
                if (isNotBlank(value.trim())) {
                    surveyConductRequest.answers[index].content = value
                } else {
                    if (item.required === 1) {
                        error.isError = true
                        error.isVisible = true
                    }
                }

                setError(error)
            }} />
    ), [surveyConductRequest])

    const renderQuestionItems = useCallback((item: QuestionResponse, index: number) => (
        <Fragment key={index.toString()}>
            {
                item.type === MULTI_CHOICE_QUESTION
                && renderMultiChoiceQuestionItem(item, index)
            }
            {
                item.type === ONE_CHOICE_QUESTION
                && renderOneChoiceQuestionItem(item, index)
            }
            {
                item.type === SHORT_ANSWER
                && renderShortAnswerQuestionItem(item, index)
            }
            <div className='mt-2 ms-2'>
                <TextValidate
                    textError={validates[index] ? validates[index].textError : ''}
                    isVisible={validates[index] ? validates[index].isVisible : false}
                    isError={validates[index] ? validates[index].isError : true}
                />
            </div>
        </Fragment>
    ), [surveyConductRequest, validates])

    return (
        <>
            <Header />
            <div className='main-content'>
                <div className='middle-wrap'>
                    <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                        <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
                            <button className='d-inline-block mt-2'
                                onClick={() => navigate(-1)}>
                                <i className='ti-arrow-left font-sm text-white' />
                            </button>
                            <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Xem lại bài viết</h4>
                        </div>
                        <div className='card-body p-lg-5 w-100 border-0 p-2'>
                            {questionConducts.map((item, index) => renderQuestionItems(item, index))}
                            <div className='mt-5 flex flex-row items-center justify-evenly'>
                                <button
                                    onClick={() => navigate(-1)}
                                    type='button'
                                    className=' inline-flex items-center rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                >
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                                        <span>Quay lại</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => onBtnPublishPostPress()}
                                    type='button'
                                    className='items-centerdark:bg-blue-600 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                >
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-right' })} />
                                        <span>Gửi câu trả lời</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
