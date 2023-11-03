import React, { useEffect } from 'react'
import { Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import { ADD_QUESTION_PAGE, BUSINESS_DASHBOARD_PAGE, CREATE_SURVEY_POST_PAGE } from '../constants/Page'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import MultiQuestionMultiChoice from '../components/survey/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/survey/MultiQuestionOneChoice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { addQuestion, defaultSurveyPostRequest, setQuestionValidates, setSurveyPostDescription, setSurveyPostRequest, setSurveyPostTitle } from '../redux/Slice'
import { useAddSurveyPostMutation } from '../redux/Service'
import { toast } from 'react-toastify'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

export default function ReviewSurveyPostPage() {
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addSurvey, addSurveyResult] = useAddSurveyPostMutation()

  useEffect(() => {
    dispatch(setSurveyPostRequest({
      ...surveyPostRequest,
      userId: userLogin?.id ?? -1,
      groupId: 1
    }))
  }, [])

  useEffect(() => {
    if (addSurveyResult.data && addSurveyResult.isSuccess) {
      if (addSurveyResult.data.status === 201 || 200) {
        navigate(BUSINESS_DASHBOARD_PAGE)
        toast.success('Thêm khảo sát thành công !!!')
        dispatch(setSurveyPostRequest(defaultSurveyPostRequest))
        dispatch(setQuestionValidates([]))
      } else {
        toast.error('Xảy ra lỗi trong quá trình thêm khảo sát!!!')
      }
    }
  }, [addSurveyResult])

  const onBtnPublishPostPress = () => {
    if (surveyPostRequest) {
      addSurvey(surveyPostRequest)
    }
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <Link className='d-inline-block mt-2' to={ADD_QUESTION_PAGE}>
                <i className='ti-arrow-left font-sm text-white' />
              </Link>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Xem lại bài viết</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='mb-2 text-justify'>
                <h2 className='font-bold'>{surveyPostRequest.title}</h2>
                <p className='mt-2 mb-3'>{surveyPostRequest.description}</p>
              </div>

              <div className='font-bold'>Câu hỏi</div>

              {
                surveyPostRequest.questions.map((item, index) => {
                  if (item.type === MULTI_CHOICE_QUESTION) {
                    return <MultiQuestionMultiChoice
                      reviewMode
                      key={index}
                      index={index} />
                  } else if (item.type === ONE_CHOICE_QUESTION) {
                    return <MultiQuestionOneChoice
                      reviewMode
                      key={index}
                      index={index} />
                  }

                  return <ShortAnswerQuestion
                    reviewMode
                    key={index}
                    index={index} />
                })
              }

              <div className='flex flex-row items-center justify-evenly mt-5'>
                <button
                  onClick={() => navigate(ADD_QUESTION_PAGE)}
                  type="button" className=" bg-gray-200 hover:opacity-75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <div className='flex items-center'>
                    <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                    <span>Quay lại</span>
                  </div>
                </button>

                <button
                  onClick={() => onBtnPublishPostPress()}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-centerdark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
