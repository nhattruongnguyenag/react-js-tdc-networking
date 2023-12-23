import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import { Fragment, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/surveyQuestion/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/surveyQuestion/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/surveyQuestion/ShortAnswerQuestion'
import { CREATE_SURVEY_POST_PAGE, REVIEW_SURVEY_POST_PAGE } from '../constants/Page'
import {
  ADD_QUESTION_PAGE_ADD_QUESTION_BUTTON,
  ADD_QUESTION_PAGE_NOTIFICATION_QUESTION_VALIDATE,
  ADD_QUESTION_PAGE_REVIEW_SURVEY_POST,
  ADD_QUESTION_PAGE_TITLE,
  ADD_QUESTION_VIEW_COMPONENT_MULTI_CHOICE_QUESTION,
  ADD_QUESTION_VIEW_COMPONENT_ONE_CHOICE_QUESTION,
  ADD_QUESTION_VIEW_COMPONENT_SHORT_ANSWER,
  ADD_QUESTION_VIEW_COMPONENT_TITLE_EMPTY_VALIDATE,
  TEXT_BUTTON_GO_BACK,
  TEXT_EMPTY_QUESTION_ERROR_CONTENT
} from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { addQuestion, addQuestionValidates, setSurveyPostRequest, updateQuestionTitleValidate } from '../redux/Slice'
import { Question } from '../types/Question'
import { isBlank } from '../utils/ValidateUtils'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

const isAllFieldsValid = (questions: Question[]): boolean => {
  for (let question of questions) {
    if (isBlank(question.title)) {
      return false
    }
  }

  return true
}

export default function AddQuestionPage() {
  const { userLogin, surveyPostRequest, questionTitleValidates } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const navigation = useNavigate()

  const onBtnAddQuestionClick = (questionType: string) => {
    dispatch(addQuestion(questionType))
    dispatch(
      addQuestionValidates({
        textError: ADD_QUESTION_VIEW_COMPONENT_TITLE_EMPTY_VALIDATE,
        isError: true,
        isVisible: false
      })
    )
  }

  console.log('aa', surveyPostRequest)

  const onBtnReviewClick = () => {
    if (surveyPostRequest.questions.length === 0) {
      toast.error(TEXT_EMPTY_QUESTION_ERROR_CONTENT)
    } else {
      if (isAllFieldsValid(surveyPostRequest.questions)) {
        navigation(REVIEW_SURVEY_POST_PAGE)
      } else {
        toast.error(ADD_QUESTION_PAGE_NOTIFICATION_QUESTION_VALIDATE)
        for (let i = 0; i < questionTitleValidates.length; i++) {
          if (questionTitleValidates[i].isError) {
            dispatch(
              updateQuestionTitleValidate({
                index: i,
                validate: {
                  ...questionTitleValidates[i],
                  isVisible: true
                }
              })
            )
          }
        }
      }
    }
  }

  const renderQuestionItem = useCallback((item: Question, index: number) => {
    if (item.type === MULTI_CHOICE_QUESTION) {
      return <MultiQuestionMultiChoice editMode questionIndex={index} />
    } else if (item.type === ONE_CHOICE_QUESTION) {
      return <MultiQuestionOneChoice editMode questionIndex={index} />
    }

    return <ShortAnswerQuestion editMode questionIndex={index} />
  }, [surveyPostRequest.questions])

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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>
                {surveyPostRequest.postId ? 'Cập nhật câu hỏi' : 'Thêm câu hỏi'}
              </h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              {surveyPostRequest.questions.map((item, index) => (
                <Fragment key={index}>{renderQuestionItem(item, index)}</Fragment>
              ))}

              <div className='mt-5 flex flex-row items-center justify-evenly'>
                <button
                  onClick={() => navigation(CREATE_SURVEY_POST_PAGE)}
                  type='button'
                  className=' inline-flex items-center rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <div className='flex items-center'>
                    <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                    <span>{TEXT_BUTTON_GO_BACK}</span>
                  </div>
                </button>

                <Dropdown
                  className='z-50 text-black'
                  label=''
                  placement='top'
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <button
                      type='button'
                      className='inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      <div className='flex items-center'>
                        <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'plus' })} />
                        <span>{ADD_QUESTION_PAGE_ADD_QUESTION_BUTTON}</span>
                      </div>
                    </button>
                  )}
                >
                  <Dropdown.Item onClick={() => onBtnAddQuestionClick(SHORT_ANSWER)}>
                    {ADD_QUESTION_VIEW_COMPONENT_SHORT_ANSWER}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onBtnAddQuestionClick(ONE_CHOICE_QUESTION)}>
                    {ADD_QUESTION_VIEW_COMPONENT_ONE_CHOICE_QUESTION}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onBtnAddQuestionClick(MULTI_CHOICE_QUESTION)}>
                    {ADD_QUESTION_VIEW_COMPONENT_MULTI_CHOICE_QUESTION}
                  </Dropdown.Item>
                </Dropdown>

                <button
                  onClick={() => onBtnReviewClick()}
                  type='button'
                  className='items-centerdark:bg-blue-600 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  <div className='flex items-center'>
                    <span>{ADD_QUESTION_PAGE_REVIEW_SURVEY_POST}</span>
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
