import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import ValidateTextView from '../components/common/ValidateTextView'
import { ADD_QUESTION_PAGE } from '../constants/Page'
import {
  SURVEY_SAVE_BUTTON_GO_NEXT,
  SURVEY_SAVE_DESC_EMPTY_VALIDATE,
  SURVEY_SAVE_DESC_PLACEHOLDER,
  SURVEY_SAVE_DESC_TITLE,
  SURVEY_SAVE_PAGE_TITLE,
  SURVEY_SAVE_TITLE_EMPTY_VALIDATE,
  SURVEY_SAVE_TITLE_PLACEHOLDER,
  SURVEY_SAVE_TITLE_TITLE
} from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setQuestionValidates, setSurveyPostRequest } from '../redux/Slice'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'
import { getIdFromSlug } from '../utils/CommonUtls'
import { isSurveyPost } from '../utils/PostHelper'
import { ErrorMessage, isExistFieldInvalid, validateField } from '../utils/ValidateHelper'
import { InputTextValidate, isBlank } from '../utils/ValidateUtils'
import { useTranslation } from 'react-multi-lang'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

interface CreateSurveyPostValidate {
  title: InputTextValidate
  description: InputTextValidate
}

interface CreateSurveyPostErrorMessage {
  title: ErrorMessage
  description: ErrorMessage
}

const error: CreateSurveyPostErrorMessage = {
  title: {
    blank: 'CreateSurveyPostScreen.surveySaveTitleEmptyValidate'
  },
  description: {
    blank: 'CreateSurveyPostScreen.surveySaveDescEmptyValidate'
  }
}

export default function CreateSurveyPostPage() {
  const { userLogin, surveyPostRequest, previousPage } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const t = useTranslation()

  const { slug } = useParams()
  const surveyPostId = getIdFromSlug(slug ?? '') ?? -1

  const [validate, setValidate] = useState<CreateSurveyPostValidate>({
    title: {
      textError: SURVEY_SAVE_TITLE_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    description: {
      textError: SURVEY_SAVE_DESC_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    }
  })

  useEffect(() => {
    if (isSurveyPost(state)) {
      dispatch(
        setSurveyPostRequest({
          postId: state.id,
          title: state.title,
          description: state.description,
          questions: state.questions
        })
      )

      const validates = state.questions.map<InputTextValidate>((item, index) => ({
        isError: isBlank(item.title),
        textError: 'blank',
        isVisible: false
      }))

      dispatch(setQuestionValidates(validates))
    } else {
      if (state && state.group) {
        dispatch(
          setSurveyPostRequest({
            ...surveyPostRequest,
            userId: userLogin?.id ?? -1,
            groupId: state.group
          })
        )
      }
    }
  }, [])

  const onTitleChangeText = useCallback(
    (value: string) => {
      validateField(error['title'], validate['title'], value)
      setValidate({ ...validate })
      dispatch(
        setSurveyPostRequest({
          ...surveyPostRequest,
          title: value
        })
      )
    },
    [surveyPostRequest, validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      validateField(error['description'], validate['description'], value)
      setValidate({ ...validate })
      dispatch(
        setSurveyPostRequest({
          ...surveyPostRequest,
          description: value
        })
      )
    },
    [surveyPostRequest, validate]
  )

  const onBtnAddQuestionClick = () => {
    if (
      isExistFieldInvalid<SurveyPostRequest, CreateSurveyPostValidate, CreateSurveyPostErrorMessage>(
        surveyPostRequest,
        validate,
        error
      )
    ) {
      setValidate({ ...validate })
    } else {
      navigate(ADD_QUESTION_PAGE)
    }
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <button className='d-inline-block mt-2' onClick={() => navigate(previousPage)}>
                <i className='ti-arrow-left font-sm text-white' />
              </button>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>
                {surveyPostRequest.postId ? 'Cập nhật khảo sát' : 'Thêm khảo sát'}
              </h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0'>
              <div className='row'>
                <InputTextWithTitle
                  defaultValue={surveyPostRequest.title ?? ''}
                  onTextChange={(value) => onTitleChangeText(value)}
                  title={SURVEY_SAVE_TITLE_TITLE}
                  placeholder={SURVEY_SAVE_TITLE_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.title.textError)}
                  isError={validate.title.isError}
                  isVisible={validate.title.isVisible}
                />

                <TextAreaWithTitle
                  defaultValue={surveyPostRequest.description}
                  onTextChange={(value) => onDescriptionChangeText(value)}
                  rows={15}
                  placeholder={SURVEY_SAVE_DESC_PLACEHOLDER}
                  title={SURVEY_SAVE_DESC_TITLE}
                />

                <ValidateTextView
                  textError={t(validate.description.textError)}
                  isError={validate.description.isError}
                  isVisible={validate.description.isVisible}
                />
              </div>
              <button
                onClick={() => onBtnAddQuestionClick()}
                type='button'
                className='items-centerdark:bg-blue-600 mt-3 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <div className='flex items-center'>
                  <span>{SURVEY_SAVE_BUTTON_GO_NEXT}</span>
                  <FontAwesomeIcon style={{ fontSize: 15, marginLeft: 10 }} icon={icon({ name: 'arrow-right' })} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
