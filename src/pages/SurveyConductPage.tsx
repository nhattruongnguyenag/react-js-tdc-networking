import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import MultiQuestionMultiChoice from '../components/surveyQuestion/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/surveyQuestion/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/surveyQuestion/ShortAnswerQuestion'
import TextValidate from '../components/TextValidate'
import {
  SURVEY_CONDUCT_SCREEN_BUTTON_COMPLETE,
  SURVEY_CONDUCT_SCREEN_BUTTON_GO_BACK,
  SURVEY_CONDUCT_SCREEN_MULTI_QUESTION_MULITI_CHOICE,
  SURVEY_CONDUCT_SCREEN_MULTI_QUESTION_ONE_CHOICE,
  SURVEY_CONDUCT_SCREEN_SAVE_SUCCESS_CONTENT,
  SURVEY_CONDUCT_SCREEN_SHORT_ANSWER_ERROR,
  SURVEY_CONDUCT_SCREEN_TITLE
} from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import {
  useAddSurveyConductAnswerMutation,
  useGetPostsQuery,
  useGetQuestionsFromSurveyPostQuery
} from '../redux/Service'
import { setQuestionConducts, setSurveyPostRequest } from '../redux/Slice'
import { AnswerRequest, SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { QuestionResponse } from '../types/response/QuestionResponse'
import { getIdFromSlug } from '../utils/CommonUtls'
import { InputTextValidate, isNotBlank } from '../utils/ValidateUtils'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION, SHORT_ANSWER } from './CreateSurveyPostPage'
import { Question } from '../types/Question'
import { isSurveyPost } from '../utils/PostHelper'

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
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [validates, setValidates] = useState<InputTextValidate[]>([])
  const [surveyConductRequestAPI, surveyConductRequestResult] = useAddSurveyConductAnswerMutation()
  const [questions, setQuestions] = useState<Question[]>()

  const { slug } = useParams()
  const surveyPostId = getIdFromSlug(slug ?? '') ?? -1

  const defaultSurveyConduct = {
    user_id: userLogin?.id ?? -1,
    post_id: surveyPostId,
    answers: []
  }

  const [surveyConductRequest, setSurveyConductRequest] = useState<SurveyConductRequest>(defaultSurveyConduct)

  const { data, isFetching, isSuccess } = useGetPostsQuery({
    postId: surveyPostId,
    userLogin: userLogin?.id ?? -1
  })

  useEffect(() => {
    if (data && data.data.length > 0 && isSuccess) {
      if (isSurveyPost(data.data[0])) {
        dispatch(
          setSurveyPostRequest({
            ...surveyPostRequest,
            questions: data.data[0].questions
          })
        )
      }
    }
  }, [data])

  const onBtnPublishPostPress = () => {
    console.log('abc', surveyPostRequest.questions)
    if (surveyPostRequest.questions) {
      if (isAllFieldValid(validates)) {
        surveyConductRequestAPI(surveyConductRequest)
      } else {
        const tempValidate = [...validates]
        for (let index = 0; index < tempValidate.length; index++) {
          if (tempValidate[index].isError && surveyPostRequest.questions[index].required === 1) {
            tempValidate[index].isVisible = true
          }
        }
        setValidates(tempValidate)
      }
    }
  }

  useEffect(() => {
    if (surveyConductRequestResult.isSuccess) {
      toast.success(SURVEY_CONDUCT_SCREEN_SAVE_SUCCESS_CONTENT)
      setSurveyConductRequest(defaultSurveyConduct)
      navigate(-1)
    }
  }, [surveyConductRequestResult])

  useEffect(() => {
    if (data && data.data.length > 0 && !isFetching && isSuccess) {
      let answer: AnswerRequest[] = []
      let tempValidates: InputTextValidate[] = []
      for (let question of data.data[0].questions) {
        answer.push({
          question_id: question.id,
          choices_ids: [],
          content: ''
        })

        let textError = ''

        if (question.type === SHORT_ANSWER) {
          textError = SURVEY_CONDUCT_SCREEN_SHORT_ANSWER_ERROR
        } else if (question.type === MULTI_CHOICE_QUESTION) {
          textError = SURVEY_CONDUCT_SCREEN_MULTI_QUESTION_MULITI_CHOICE
        } else if (question.type === ONE_CHOICE_QUESTION) {
          textError = SURVEY_CONDUCT_SCREEN_MULTI_QUESTION_ONE_CHOICE
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

  const renderMultiChoiceQuestionItem = useCallback(
    (item: Question, index: number) => (
      <MultiQuestionMultiChoice
        conductMode
        questionIndex={index}
        onChangeValue={(choices) => onChoicesValueChange(item, index, choices)}
      />
    ),
    [surveyConductRequest]
  )

  const renderOneChoiceQuestionItem = useCallback(
    (item: Question, index: number) => (
      <MultiQuestionOneChoice
        conductMode
        key={index}
        questionIndex={index}
        onChangeValue={(choices) => onChoicesValueChange(item, index, choices)}
      />
    ),
    [surveyConductRequest]
  )

  const onChoicesValueChange = useCallback(
    (item: Question, index: number, choices: number[]) => {
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
    },
    [validates]
  )

  const setError = useCallback(
    (error: { index: number; isError: boolean; isVisible: boolean }) => {
      let tempValidates = [...validates]
      tempValidates[error.index].isError = error.isError
      tempValidates[error.index].isVisible = error.isVisible
      setValidates(tempValidates)
    },
    [validates]
  )

  const renderShortAnswerQuestionItem = useCallback(
    (item: Question, index: number) => (
      <ShortAnswerQuestion
        conductMode
        questionIndex={index}
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
        }}
      />
    ),
    [surveyConductRequest]
  )

  const renderQuestionItems = useCallback(
    (item: Question, index: number) => (
      <Fragment key={index.toString()}>
        {item.type === MULTI_CHOICE_QUESTION && renderMultiChoiceQuestionItem(item, index)}
        {item.type === ONE_CHOICE_QUESTION && renderOneChoiceQuestionItem(item, index)}
        {item.type === SHORT_ANSWER && renderShortAnswerQuestionItem(item, index)}
        <div className='ms-2 mt-2'>
          <TextValidate
            textError={validates[index] ? validates[index].textError : ''}
            isVisible={validates[index] ? validates[index].isVisible : false}
            isError={validates[index] ? validates[index].isError : true}
          />
        </div>
      </Fragment>
    ),
    [surveyConductRequest, validates]
  )

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                <i className='ti-arrow-left font-sm text-white' />
              </button>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{SURVEY_CONDUCT_SCREEN_TITLE}</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              {surveyPostRequest.questions?.map((item, index) => renderQuestionItems(item, index))}
              {data?.data[0].active !== 0 && data?.data[0].active !== 2 && (
                <div className='mt-5 flex flex-row items-center justify-evenly'>
                  <button
                    onClick={() => navigate(-1)}
                    type='button'
                    className=' inline-flex items-center rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    <div className='flex items-center'>
                      <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-left' })} />
                      <span>{SURVEY_CONDUCT_SCREEN_BUTTON_GO_BACK}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => onBtnPublishPostPress()}
                    type='button'
                    className='items-centerdark:bg-blue-600 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    <div className='flex items-center'>
                      <FontAwesomeIcon style={{ fontSize: 15, marginRight: 10 }} icon={icon({ name: 'arrow-right' })} />
                      <span>{SURVEY_CONDUCT_SCREEN_BUTTON_COMPLETE}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
