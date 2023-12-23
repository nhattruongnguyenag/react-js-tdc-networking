import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import ValidateTextView from '../components/common/ValidateTextView'
import { BUSINESS_DASHBOARD_PAGE } from '../constants/Page'
import {
  RECRUITMENT_BENEFIT_BUTTON_COMPLETE,
  RECRUITMENT_BENEFIT_EMPTY_VALIDATE,
  RECRUITMENT_BENEFIT_PLACEHOLDER,
  RECRUITMENT_BENEFIT_TITLE,
  RECRUITMENT_DESC_EMPTY_VALIDATE,
  RECRUITMENT_EMPLOYMENT_TYPE_EMPTY_VALIDATE,
  RECRUITMENT_EXPIRATION_VALIDATE,
  RECRUITMENT_LOCATION_EMPTY_VALIDATE,
  RECRUITMENT_REQUIREMENT_EMPTY_VALIDATE,
  RECRUITMENT_SALARY_EMPTY_VALIDATE,
  RECRUITMENT_SAVE_DESC_PLACEHOLDER,
  RECRUITMENT_SAVE_DESC_TITLE,
  RECRUITMENT_SAVE_EMPLOYMENT_TYPE_PLACEHOLDER,
  RECRUITMENT_SAVE_EXPIRATION_TITLE,
  RECRUITMENT_SAVE_LOCATION_PLACEHOLDER,
  RECRUITMENT_SAVE_LOCATION_TITLE,
  RECRUITMENT_SAVE_REQUIREMENT_PLACEHOLDER,
  RECRUITMENT_SAVE_REQUIREMENT_TITLE,
  RECRUITMENT_SAVE_SALLARY_PLACEHOLDER,
  RECRUITMENT_SAVE_SALLARY_TITLE,
  RECRUITMENT_SAVE_SAVE_EMPLOYMENT_TYPE_TITLE,
  RECRUITMENT_SAVE_SUCCESS_CONTENT,
  RECRUITMENT_SAVE_TITLE_PLACEHOLDER,
  RECRUITMENT_SAVE_TITLE_TITLE,
  RECRUITMENT_TITLE_EMPTY_VALIDATE
} from '../constants/StringVietnamese'
import { useAppSelector } from '../redux/Hook'
import { useAddRecruitmentPostMutation, useUpdateRecruitmentPostMutation } from '../redux/Service'
import { RecruitmentPostRequest } from '../types/request/RecruitmentPostRequest'
import { isRecruitmentPost } from '../utils/PostHelper'
import { InputTextValidate, isBlank } from '../utils/ValidateUtils'
import { ErrorMessage, isExistFieldInvalid, validateField } from '../utils/ValidateHelper'
import { useTranslation } from 'react-multi-lang'

const BUSINESS_CONNECT_GROUP = 2

interface ElementRefs {
  jobTitle: HTMLInputElement
  employmentType: HTMLInputElement
  expiration: HTMLInputElement
  location: HTMLTextAreaElement
  description: HTMLTextAreaElement
  salary: HTMLInputElement
  requirement: HTMLTextAreaElement
  benefit: HTMLTextAreaElement
}

const elementRefs = {} as ElementRefs

interface CreateRecruitmentPostValidate {
  title: InputTextValidate
  description: InputTextValidate
  benefit: InputTextValidate
  salary: InputTextValidate
  expiration: InputTextValidate
  employmentType: InputTextValidate
  location: InputTextValidate
  requirement: InputTextValidate
}

interface CreateRecruitmentPostError {
  title: ErrorMessage
  description: ErrorMessage
  benefit: ErrorMessage
  salary: ErrorMessage
  expiration: ErrorMessage
  employmentType: ErrorMessage
  location: ErrorMessage
  requirement: ErrorMessage
}

const error: CreateRecruitmentPostError = {
  title: {
    blank: 'RecruitmentScreen.recruitmentTitleEmptyValidate'
  },
  description: {
    blank: 'RecruitmentScreen.recruitmentDescEmptyValidate'
  },
  benefit: {
    blank: 'RecruitmentScreen.recruitmentBenefitEmptyValidate'
  },
  salary: {
    blank: 'RecruitmentScreen.recruitmentSalaryEmptyValidate'
  },
  expiration: {
    blank: 'RecruitmentScreen.recruitmentExpirationValidate'
  },
  employmentType: {
    blank: 'RecruitmentScreen.recruitmentEmploymentTypeEmptyValidate'
  },
  location: {
    blank: 'RecruitmentScreen.recruitmentLocationEmptyValidate'
  },
  requirement: {
    blank: 'RecruitmentScreen.recruitmentRequirementEmptyValidate'
  }
}

export default function CreateRecruitmentPostPage() {
  const [createRecruitmentPostRequest, createRecruitmentPostResponse] = useAddRecruitmentPostMutation()
  const [updateRecruitmentPostRequest, updateRecruitmentPostResponse] = useUpdateRecruitmentPostMutation()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { userLogin, previousPage } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const t = useTranslation()

  const defaultrecruitmentPostRequest: RecruitmentPostRequest = {
    id: state?.id ?? undefined,
    userId: userLogin?.id ?? -1,
    type: 'tuyen-dung',
    title: state?.title ?? '',
    salary: state?.salary ?? '',
    benefit: state?.benefit ?? '',
    description: state?.description ?? '',
    employmentType: state?.employmentType ?? '',
    location: state?.location ?? '',
    requirement: state?.requirement ?? '',
    groupId: BUSINESS_CONNECT_GROUP,
    expiration:
      moment(state?.expiration).format('YYYY-MM-DD HH:mm:ss') ?? moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
  }

  const [recruitmentPostRequest, setRecruitmentPostRequest] =
    useState<RecruitmentPostRequest>(defaultrecruitmentPostRequest)

  const defaultValidate = useMemo(
    () => ({
      title: {
        textError: '',
        isError: true,
        isVisible: false
      },
      description: {
        textError: '',
        isError: true,
        isVisible: false
      },
      benefit: {
        textError: '',
        isError: true,
        isVisible: false
      },
      salary: {
        textError: '',
        isError: true,
        isVisible: false
      },
      expiration: {
        textError: 'RecruitmentScreen.recruitmentExpirationValidate',
        isError: moment().isAfter(moment(state?.expiration)),
        isVisible: false
      },
      employmentType: {
        textError: '',
        isError: true,
        isVisible: false
      },
      location: {
        textError: '',
        isError: true,
        isVisible: false
      },
      requirement: {
        textError: '',
        isError: true,
        isVisible: false
      }
    }),
    []
  )

  const [validate, setValidate] = useState<CreateRecruitmentPostValidate>(defaultValidate)

  const onTitleChangeText = useCallback(
    (value: string) => {
      validateField(error['title'], validate['title'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, title: value })
    },
    [validate]
  )

  const onSalaryChangeText = useCallback(
    (value: string) => {
      validateField(error['salary'], validate['salary'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, salary: parseInt(value) })
    },
    [validate]
  )

  const onExpirationChangeText = useCallback(
    (value: string) => {
      if (moment().isAfter(moment(value.replace('T', ' ')))) {
        setValidate({
          ...validate,
          expiration: {
            textError: 'RecruitmentScreen.recruitmentExpirationValidate',
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          expiration: {
            ...validate.expiration,
            isError: false,
            isVisible: false
          }
        })
      }

      setRecruitmentPostRequest({
        ...recruitmentPostRequest,
        expiration: value.replace('T', ' ')
      })
    },
    [validate]
  )

  const onBenefitChangeText = useCallback(
    (value: string) => {
      validateField(error['benefit'], validate['benefit'], value)
      setValidate({ ...validate })

      setRecruitmentPostRequest({ ...recruitmentPostRequest, benefit: value })
    },
    [validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      validateField(error['description'], validate['description'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, description: value })
    },
    [validate]
  )

  const onEmploymentTypeChangeText = useCallback(
    (value: string) => {
      validateField(error['employmentType'], validate['employmentType'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, employmentType: value })
    },
    [validate]
  )

  const onLocationChangeText = useCallback(
    (value: string) => {
      validateField(error['location'], validate['location'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, location: value })
    },
    [validate]
  )

  const onRequirementChangeText = useCallback(
    (value: string) => {
      validateField(error['requirement'], validate['requirement'], value)
      setValidate({ ...validate })
      setRecruitmentPostRequest({ ...recruitmentPostRequest, requirement: value })
    },
    [validate]
  )

  const onBtnFinishPress = useCallback(() => {
    if (
      isExistFieldInvalid<RecruitmentPostRequest, CreateRecruitmentPostValidate, CreateRecruitmentPostError>(
        recruitmentPostRequest,
        validate,
        error
      )
    ) {
      setValidate({ ...validate })
    } else {
      if (recruitmentPostRequest.id) {
        updateRecruitmentPostRequest(recruitmentPostRequest)
      } else {
        createRecruitmentPostRequest(recruitmentPostRequest)
      }
    }
  }, [validate])

  useEffect(() => {
    if (createRecruitmentPostResponse.data) {
      navigate(previousPage)
      toast.success(t('RecruitmentScreen.recruitmentSaveSuccessContent'))
    }
  }, [createRecruitmentPostResponse])

  useEffect(() => {
    if (updateRecruitmentPostResponse.data) {
      navigate(previousPage)
      toast.success(t('RecruitmentScreen.recruitmentUpdateSuccessContent'))
    }
  }, [updateRecruitmentPostResponse])

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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm tin tuyển dụng</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='row'>
                <InputTextWithTitle
                  defaultValue={recruitmentPostRequest.title}
                  onTextChange={(value) => onTitleChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.jobTitle = ref) : undefined)}
                  title={RECRUITMENT_SAVE_TITLE_TITLE}
                  placeholder={RECRUITMENT_SAVE_TITLE_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.title.textError)}
                  isError={validate.title.isError}
                  isVisible={validate.title.isVisible}
                />

                <InputTextWithTitle
                  defaultValue={recruitmentPostRequest.employmentType}
                  onTextChange={(value) => onEmploymentTypeChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.employmentType = ref) : undefined)}
                  title={RECRUITMENT_SAVE_SAVE_EMPLOYMENT_TYPE_TITLE}
                  placeholder={RECRUITMENT_SAVE_EMPLOYMENT_TYPE_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.employmentType.textError)}
                  isError={validate.employmentType.isError}
                  isVisible={validate.employmentType.isVisible}
                />

                <InputTextWithTitle
                  defaultValue={recruitmentPostRequest.expiration}
                  onTextChange={(value) => onExpirationChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.expiration = ref) : undefined)}
                  title={RECRUITMENT_SAVE_EXPIRATION_TITLE}
                  type='datetime-local'
                />

                <ValidateTextView
                  textError={t(validate.expiration.textError)}
                  isError={validate.expiration.isError}
                  isVisible={validate.expiration.isVisible}
                />

                <TextAreaWithTitle
                  defaultValue={recruitmentPostRequest.location}
                  onTextChange={(value) => onLocationChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.location = ref) : undefined)}
                  rows={5}
                  placeholder={RECRUITMENT_SAVE_LOCATION_TITLE}
                  title={RECRUITMENT_SAVE_LOCATION_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.location.textError)}
                  isError={validate.location.isError}
                  isVisible={validate.location.isVisible}
                />

                <TextAreaWithTitle
                  defaultValue={recruitmentPostRequest.description}
                  onTextChange={(value) => onDescriptionChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.description = ref) : undefined)}
                  rows={10}
                  placeholder={RECRUITMENT_SAVE_DESC_TITLE}
                  title={RECRUITMENT_SAVE_DESC_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.description.textError)}
                  isError={validate.description.isError}
                  isVisible={validate.description.isVisible}
                />

                <InputTextWithTitle
                  defaultValue={recruitmentPostRequest.salary.toString()}
                  onTextChange={(value) => onSalaryChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.salary = ref) : undefined)}
                  title={RECRUITMENT_SAVE_SALLARY_TITLE}
                  placeholder={RECRUITMENT_SAVE_SALLARY_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.salary.textError)}
                  isError={validate.salary.isError}
                  isVisible={validate.salary.isVisible}
                />

                <TextAreaWithTitle
                  defaultValue={recruitmentPostRequest.requirement}
                  onTextChange={(value) => onRequirementChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.requirement = ref) : undefined)}
                  rows={10}
                  placeholder={RECRUITMENT_SAVE_REQUIREMENT_TITLE}
                  title={RECRUITMENT_SAVE_REQUIREMENT_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.requirement.textError)}
                  isError={validate.requirement.isError}
                  isVisible={validate.requirement.isVisible}
                />

                <TextAreaWithTitle
                  defaultValue={recruitmentPostRequest.benefit}
                  onTextChange={(value) => onBenefitChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.benefit = ref) : undefined)}
                  rows={20}
                  placeholder={RECRUITMENT_BENEFIT_TITLE}
                  title={RECRUITMENT_BENEFIT_PLACEHOLDER}
                />

                <ValidateTextView
                  textError={t(validate.benefit.textError)}
                  isError={validate.benefit.isError}
                  isVisible={validate.benefit.isVisible}
                />
              </div>
              <div className='row'>
                <div className='col-lg-12 mb-0'>
                  <button
                    type='button'
                    className='font-xsss fw-600 w175 rounded-3 d-inline-block mt-3 bg-current p-3 text-center text-white'
                    onClick={() => onBtnFinishPress()}
                  >
                    {RECRUITMENT_BENEFIT_BUTTON_COMPLETE}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
