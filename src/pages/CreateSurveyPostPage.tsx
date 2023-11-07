import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import ValidateTextView from '../components/common/ValidateTextView'
import MultiQuestionMultiChoice from '../components/survey/MultiQuestionMultiChoice'
import MultiQuestionOneChoice from '../components/survey/MultiQuestionOneChoice'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { SURVEY_POST_REQUEST } from '../constants/KeyValue'
import {
  ADD_QUESTION_PAGE,
  BUSINESS_DASHBOARD_PAGE,
  CREATE_SURVEY_POST_PAGE,
  REVIEW_SURVEY_POST_PAGE
} from '../constants/Page'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { addQuestion, setSurveyPostRequest } from '../redux/Slice'
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange } from '../utils/ValidateUtils'

export const SHORT_ANSWER = 'tra-loi-ngan'
export const ONE_CHOICE_QUESTION = 'chon-mot-dap-an'
export const MULTI_CHOICE_QUESTION = 'chon-nhieu-dap-an'

interface CreateSurveyPostValidate {
  title: InputTextValidate
  description: InputTextValidate
}

const isAllFieldsValid = (validate: CreateSurveyPostValidate): boolean => {
  let key: keyof CreateSurveyPostValidate

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

export default function CreateSurveyPostPage() {
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [validate, setValidate] = useState<CreateSurveyPostValidate>({
    title: {
      textError: 'Tiêu đề không được để trống',
      isError: true,
      isVisible: false
    },
    description: {
      textError: 'Mô tả không được để trống',
      isError: true,
      isVisible: false
    }
  })

  useEffect(() => {
    dispatch(
      setSurveyPostRequest({
        ...surveyPostRequest,
        userId: userLogin?.id ?? -1,
        groupId: 1
      })
    )
  }, [])

  const setTitleError = useCallback(
    (error: string) => {
      setValidate({
        ...validate,
        title: {
          textError: error,
          isError: true,
          isVisible: true
        }
      })
      return
    },
    [validate]
  )

  const setDescriptionError = useCallback(
    (error: string) => {
      setValidate({
        ...validate,
        description: {
          textError: error,
          isError: true,
          isVisible: true
        }
      })
      return
    },
    [validate]
  )

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setTitleError('Tiêu đề không được để trống')
        return
      }

      dispatch(
        setSurveyPostRequest({
          ...surveyPostRequest,
          title: value
        })
      )

      setValidate({
        ...validate,
        title: {
          ...validate.title,
          isError: false,
          isVisible: false
        }
      })
    },
    [surveyPostRequest, validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setDescriptionError('Mô tả không được để trống')
        return
      }

      dispatch(
        setSurveyPostRequest({
          ...surveyPostRequest,
          description: value
        })
      )

      setValidate({
        ...validate,
        description: {
          ...validate.description,
          isError: false,
          isVisible: false
        }
      })
    },
    [surveyPostRequest, validate]
  )

  const onBtnAddQuestionClick = () => {
    if (isAllFieldsValid(validate)) {
      navigate(ADD_QUESTION_PAGE)
    } else {
      let key: keyof CreateSurveyPostValidate

      for (key in validate) {
        if (validate[key].isError && !validate[key].isVisible) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
              <Link className='d-inline-block mt-2' to={BUSINESS_DASHBOARD_PAGE}>
                <i className='ti-arrow-left font-sm text-white' />
              </Link>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm khảo sát</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='row'>
                <InputTextWithTitle
                  onTextChange={(value) => onTitleChangeText(value)}
                  title='Tiêu đề'
                  placeholder={'Nhập tiêu đề khảo sát...'}
                />

                <ValidateTextView
                  textError={validate.title.textError}
                  isError={validate.title.isError}
                  isVisible={validate.title.isVisible}
                />

                <TextAreaWithTitle
                  onTextChange={(value) => onDescriptionChangeText(value)}
                  rows={10}
                  placeholder='Nhập mô tả...'
                  title='Mô tả'
                />

                <ValidateTextView
                  textError={validate.description.textError}
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
                  <span>Tiếp theo</span>
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
