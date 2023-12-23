import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/surveyQuestion/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/surveyQuestion/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/surveyQuestion/ShortAnswerQuestion'
import { ADD_QUESTION_PAGE } from '../constants/Page'
import {
  REVIEW_SURVEY_SCREEN_BUTTON_COMPLETE,
  REVIEW_SURVEY_SCREEN_BUTTON_GO_BACK,
  REVIEW_SURVEY_SCREEN_QUESTION_LIST_TITLE,
  REVIEW_SURVEY_SCREEN_TITLE
} from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useAddSurveyPostMutation, useUpdateSurveyPostMutation } from '../redux/Service'
import { defaultSurveyPostRequest, setSurveyPostRequest } from '../redux/Slice'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

export default function ReviewSurveyPostPage() {
  const t = useTranslation()
  const { userLogin, surveyPostRequest, previousPage } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [addSurvey, addSurveyResult] = useAddSurveyPostMutation()
  const [updateSurvey, updateSurveyResult] = useUpdateSurveyPostMutation()

  useEffect(() => {
    console.log('22222222', surveyPostRequest.questions)
  }, [surveyPostRequest])

  useEffect(() => {
    if (addSurveyResult.data) {
      if (addSurveyResult.data.status === 201 || 200) {
        toast.success(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveSuccessContent'))
        navigate(previousPage)
        dispatch(setSurveyPostRequest(defaultSurveyPostRequest))
      } else {
        toast.success(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailContent'))
      }
    }
  }, [addSurveyResult])

  useEffect(() => {
    if (updateSurveyResult.data) {
      if (updateSurveyResult.data.status === 201 || 200) {
        toast.success(t('ReviewSurveyPostScreen.reviewSurveyScreenUpdateSuccessContent'))
        navigate(previousPage)
        dispatch(setSurveyPostRequest(defaultSurveyPostRequest))
      } else {
        toast.success(t('ReviewSurveyPostScreen.reviewSurveyScreenSaveFailContent'))
      }
    }
  }, [updateSurveyResult])

  const onBtnPublishPostPress = () => {
    if (surveyPostRequest.postId) {
      updateSurvey(surveyPostRequest)
    } else {
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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{REVIEW_SURVEY_SCREEN_TITLE}</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='mb-2 text-justify'>
                <h2 className='font-bold'>{surveyPostRequest.title}</h2>
                <p className='mb-3 mt-2'>{surveyPostRequest.description}</p>
              </div>

              <div className='font-bold'>{REVIEW_SURVEY_SCREEN_QUESTION_LIST_TITLE}</div>

              {surveyPostRequest.questions.map((item, index) => {
                if (item.type === MULTI_CHOICE_QUESTION) {
                  return <MultiQuestionMultiChoice reviewMode key={index} questionIndex={index} />
                } else if (item.type === ONE_CHOICE_QUESTION) {
                  return <MultiQuestionOneChoice reviewMode key={index} questionIndex={index} />
                }

                return <ShortAnswerQuestion reviewMode key={index} questionIndex={index} />
              })}

              <div className='mt-5 flex flex-row items-center justify-evenly'>
                <button
                  onClick={() => navigate(ADD_QUESTION_PAGE)}
                  type='button'
                  className=' inline-flex items-center rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <div className='flex items-center'>
                    <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                    <span>{REVIEW_SURVEY_SCREEN_BUTTON_GO_BACK}</span>
                  </div>
                </button>

                <button
                  onClick={() => onBtnPublishPostPress()}
                  type='button'
                  className='items-centerdark:bg-blue-600 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <div className='flex items-center'>
                    <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'plus' })} />
                    <span>{REVIEW_SURVEY_SCREEN_BUTTON_COMPLETE}</span>
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
