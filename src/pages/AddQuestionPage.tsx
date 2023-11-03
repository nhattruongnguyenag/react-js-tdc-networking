import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/survey/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/survey/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { CREATE_SURVEY_POST_PAGE, REVIEW_SURVEY_POST_PAGE } from '../constants/Page'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { addQuestion, addQuestionValidates, setSurveyPostRequest, updateQuestionTitleValidate } from '../redux/Slice'
import { InputTextValidate } from '../utils/ValidateUtils'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

const isAllFieldsValid = (validates: InputTextValidate[]): boolean => {
    for (let validate of validates) {
        if (validate.isError) {
            return false
        }
    }

    return true
}

export default function AddQuestionPage() {
    const { userLogin, surveyPostRequest, questionTitleValidates } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()
    const navigation = useNavigate()

    useEffect(() => {
        dispatch(setSurveyPostRequest({
            ...surveyPostRequest,
            userId: userLogin?.id ?? -1,
            groupId: 1
        }))
    }, [])

    const onBtnAddQuestionClick = (questionType: string) => {
        dispatch(addQuestion(questionType))
        dispatch(addQuestionValidates({
            textError: 'Tiêu đề không được để trống',
            isError: true,
            isVisible: false
        }))
    }

    const onBtnReviewClick = () => {
        console.log(surveyPostRequest)
        if (surveyPostRequest.questions.length === 0) {
            toast.error("Bài khảo sát bắt buộc phải có ít nhất 1 câu hỏi")
        } else {
            if (isAllFieldsValid(questionTitleValidates)) {
                navigation(REVIEW_SURVEY_POST_PAGE)
            } else {
                toast.error("Vui lòng nhập giá trị hợp lệ cho tất cả câu hỏi")
                for (let i = 0; i < questionTitleValidates.length; i++) {
                    if (questionTitleValidates[i].isError) {
                        dispatch(updateQuestionTitleValidate({
                            index: i,
                            validate: {
                                ...questionTitleValidates[i],
                                isVisible: true
                            }
                        }))
                    }
                }
            }
        }
    }

    return (
        <>
            <Header />
            <div className='main-content'>
                <div className='middle-wrap'>
                    <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                        <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
                            <Link className='d-inline-block mt-2' to={CREATE_SURVEY_POST_PAGE}>
                                <i className='ti-arrow-left font-sm text-white' />
                            </Link>
                            <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm câu hỏi</h4>
                        </div>
                        <div className='card-body p-lg-5 w-100 border-0 p-2'>
                            {
                                surveyPostRequest.questions.map((item, index) => {
                                    if (item.type === MULTI_CHOICE_QUESTION) {
                                        return <MultiQuestionMultiChoice
                                            key={index}
                                            index={index} />
                                    } else if (item.type === ONE_CHOICE_QUESTION) {
                                        return <MultiQuestionOneChoice
                                            key={index}
                                            index={index} />
                                    }

                                    return <ShortAnswerQuestion
                                        key={index}
                                        index={index} />
                                })
                            }

                            <div className='flex flex-row items-center justify-evenly mt-5'>
                                <button
                                    onClick={() => navigation(CREATE_SURVEY_POST_PAGE)}
                                    type="button" className=" bg-gray-200 hover:opacity-75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                                        <span>Quay lại</span>
                                    </div>
                                </button>

                                <Dropdown
                                    className='z-50 text-black'
                                    label=''
                                    placement='top'
                                    dismissOnClick={true}
                                    renderTrigger={() => (
                                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <div className='flex items-center'>
                                                <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'plus' })} />
                                                <span>Thêm câu hỏi</span>
                                            </div>
                                        </button>
                                    )}>
                                    <Dropdown.Item onClick={() => onBtnAddQuestionClick(SHORT_ANSWER)}>Trả lời ngắn</Dropdown.Item>
                                    <Dropdown.Item onClick={() => onBtnAddQuestionClick(ONE_CHOICE_QUESTION)}>Trắc nghiệm</Dropdown.Item>
                                    <Dropdown.Item onClick={() => onBtnAddQuestionClick(MULTI_CHOICE_QUESTION)}>Nhiều lựa chọn</Dropdown.Item>
                                </Dropdown>

                                <button
                                    onClick={() => onBtnReviewClick()}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-centerdark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <div className='flex items-center'>
                                        <span>Xem lại bài viết</span>
                                        <FontAwesomeIcon style={{ fontSize: 15, marginLeft: 10 }} icon={icon({ name: 'arrow-right' })} />
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
