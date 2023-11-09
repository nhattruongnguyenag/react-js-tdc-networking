import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/surveyQuestion/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/surveyQuestion/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/surveyQuestion/ShortAnswerQuestion'
import TextValidate from '../components/TextValidate'
import { ADD_QUESTION_PAGE } from '../constants/Page'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useAddSurveyConductAnswerMutation, useGetQuestionsFromSurveyPostQuery } from '../redux/Service'
import { setQuestionConducts } from '../redux/Slice'
import { AnswerRequest, SurveyConductRequest } from '../types/request/SurveyConductRequest'
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

    const { data, isFetching, isSuccess } = useGetQuestionsFromSurveyPostQuery(surveyPostId)

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
                            {questionConducts.map((item, index) => {
                                if (item.type === MULTI_CHOICE_QUESTION) {
                                    return <Fragment key={index}>
                                        <MultiQuestionMultiChoice
                                            conductMode
                                            key={index}
                                            index={index}
                                            onChangeValue={(choices) => {
                                                if (surveyConductRequest.answers[index]) {
                                                    if (choices.length > 0 || item.required === 1) {
                                                        surveyConductRequest.answers[index].choices_ids = choices
                                                        let tempValidates = [...validates]
                                                        tempValidates[index].isError = false
                                                        tempValidates[index].isVisible = false
                                                        setValidates(tempValidates)
                                                    } else {
                                                        if (item.required === 1) {
                                                            let tempValidates = [...validates]
                                                            tempValidates[index].isError = true
                                                            tempValidates[index].isVisible = true
                                                            setValidates(tempValidates)
                                                        }
                                                    }
                                                }
                                            }} />

                                        <div className='mt-2 ms-2'>
                                            <TextValidate
                                                textError={validates[index] ? validates[index].textError : ''}
                                                isVisible={validates[index] ? validates[index].isVisible : false}
                                                isError={validates[index] ? validates[index].isError : true}
                                            />
                                        </div>
                                    </Fragment>
                                } else if (item.type === ONE_CHOICE_QUESTION) {
                                    return <Fragment key={index}>
                                        <MultiQuestionOneChoice
                                            conductMode key={index}
                                            index={index}
                                            onChangeValue={(choices) => {
                                                if (surveyConductRequest.answers[index]) {
                                                    if (choices.length > 0) {
                                                        surveyConductRequest.answers[index].choices_ids = choices
                                                        let tempValidates = [...validates]
                                                        tempValidates[index].isError = false
                                                        tempValidates[index].isVisible = false
                                                        setValidates(tempValidates)
                                                    } else {
                                                        if (item.required === 1) {
                                                            let tempValidates = [...validates]
                                                            tempValidates[index].isError = true
                                                            tempValidates[index].isVisible = true
                                                            setValidates(tempValidates)
                                                        }
                                                    }
                                                }
                                            }}
                                        />

                                        <div className='mt-2 ms-2'>
                                            <TextValidate
                                                textError={validates[index] ? validates[index].textError : ''}
                                                isVisible={validates[index] ? validates[index].isVisible : false}
                                                isError={validates[index] ? validates[index].isError : true}
                                            />
                                        </div>
                                    </Fragment>
                                }
                                return <Fragment key={index}>
                                    <ShortAnswerQuestion
                                        conductMode key={index}
                                        index={index}
                                        onAnswerChangeText={(value) => {
                                            if (isNotBlank(value.trim())) {
                                                surveyConductRequest.answers[index].content = value
                                                let tempValidates = [...validates]
                                                tempValidates[index].isError = false
                                                tempValidates[index].isVisible = false
                                                setValidates(tempValidates)
                                            } else {
                                                if (item.required === 1) {
                                                    let tempValidates = [...validates]
                                                    tempValidates[index].isError = true
                                                    tempValidates[index].isVisible = true
                                                    setValidates(tempValidates)
                                                }
                                            }
                                        }} />

                                    <div className='mt-2 ms-2'>
                                        <TextValidate
                                            textError={validates[index] ? validates[index].textError : ''}
                                            isVisible={validates[index] ? validates[index].isVisible : false}
                                            isError={validates[index] ? validates[index].isError : true}
                                        />
                                    </div>
                                </Fragment>
                            })}

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
                                        <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'plus' })} />
                                        <span>Hoàn tất</span>
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
