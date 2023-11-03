import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/common/Header'
import InputTextWithTitle from '../components/common/InputTextWithTitle'
import TextAreaWithTitle from '../components/common/TextAreaWithTitle'
import ValidateTextView from '../components/common/ValidateTextView'
import { BUSINESS_DASHBOARD_PAGE } from '../constants/Page'
import { useAppSelector } from '../redux/Hook'
import { useAddRecruitmentPostMutation } from '../redux/Service'
import { RecruitmentPostRequest } from '../types/request/RecruitmentPostRequest'
import { InputTextValidate, isBlank } from '../utils/ValidateUtils'

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
  desc: InputTextValidate
  benefit: InputTextValidate
  salary: InputTextValidate
  expiration: InputTextValidate
  employmentType: InputTextValidate
  location: InputTextValidate
  requirement: InputTextValidate
}

const isAllFieldsValid = (validate: CreateRecruitmentPostValidate): boolean => {
  let key: keyof CreateRecruitmentPostValidate

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

export default function CreateRecruitmentPostPage() {
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const [createRecruitmentPostRequest, createRecruitmentPostResponse] = useAddRecruitmentPostMutation()
  const navigate = useNavigate()
  const [validate, setValidate] = useState<CreateRecruitmentPostValidate>({
    title: {
      textError: 'Tiêu đề không được để trống',
      isError: true,
      isVisible: false
    },
    desc: {
      textError: 'Mô tả không được để trống',
      isError: true,
      isVisible: false
    },
    benefit: {
      textError: 'Quyền lợi không được để trống',
      isError: true,
      isVisible: false
    },
    salary: {
      textError: 'Tiền lương không được để trống',
      isError: true,
      isVisible: false
    },
    expiration: {
      textError: 'Thời hạn không được chọn ở thời điểm trong quá khứ',
      isError: true,
      isVisible: false
    },
    employmentType: {
      textError: 'Hình thức làm việc không được để trống',
      isError: true,
      isVisible: false
    },
    location: {
      textError: 'Địa điểm làm việc không được để trống',
      isError: true,
      isVisible: false
    },
    requirement: {
      textError: 'Yêu cầu không được để trống',
      isError: true,
      isVisible: false
    }
  })

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          title: {
            ...validate.title,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          title: {
            ...validate.title,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onSalaryChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          salary: {
            ...validate.salary,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          salary: {
            ...validate.salary,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onExpirationChangeText = useCallback(
    (value: string) => {
      if (moment().isAfter(moment(value.replace('T', ' ')))) {
        setValidate({
          ...validate,
          expiration: {
            ...validate.expiration,
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
    },
    [validate]
  )

  const onBenefitChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          benefit: {
            ...validate.benefit,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          benefit: {
            ...validate.benefit,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          desc: {
            ...validate.desc,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          desc: {
            ...validate.desc,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onEmploymentTypeChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          employmentType: {
            ...validate.employmentType,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          employmentType: {
            ...validate.employmentType,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onLocationChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          location: {
            ...validate.location,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          location: {
            ...validate.location,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const onRequirementChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          requirement: {
            ...validate.requirement,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          requirement: {
            ...validate.requirement,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const getRecruitmentPostRequestFromUserInput = (): RecruitmentPostRequest => {
    return {
      userId: userLogin?.id ?? -1,
      images: [],
      type: 'tuyen-dung',
      title: elementRefs.jobTitle.value,
      salary: parseInt(elementRefs.salary.value),
      benefit: elementRefs.benefit.value,
      description: elementRefs.description.value,
      employmentType: elementRefs.employmentType.value,
      location: elementRefs.employmentType.value,
      requirement: elementRefs.requirement.value,
      expiration: moment(elementRefs.expiration.value.replace('T', ' ')).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  const onBtnPublishRecruitmentPostPress = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      const recruitmentModel = getRecruitmentPostRequestFromUserInput()
      console.log(recruitmentModel)
      createRecruitmentPostRequest(recruitmentModel)
    } else {
      let key: keyof CreateRecruitmentPostValidate

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }, [elementRefs, validate])

  useEffect(() => {
    if (createRecruitmentPostResponse.data) {
      navigate(BUSINESS_DASHBOARD_PAGE)
      toast.success('Thêm tin tuyển dụng thành công !!!')
    }
  }, [createRecruitmentPostResponse])

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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Thêm tin tuyển dụng</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='row'>
                <InputTextWithTitle
                  onTextChange={(value) => onTitleChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.jobTitle = ref) : undefined)}
                  title='Tên công việc'
                  placeholder={'Nhập tên công việc...'}
                />

                <ValidateTextView
                  textError={validate.title.textError}
                  isError={validate.title.isError}
                  isVisible={validate.title.isVisible}
                />

                <InputTextWithTitle
                  onTextChange={(value) => onEmploymentTypeChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.employmentType = ref) : undefined)}
                  title='Hình thức làm việc'
                  placeholder={'Nhập hình thức làm việc...'}
                />

                <ValidateTextView
                  textError={validate.employmentType.textError}
                  isError={validate.employmentType.isError}
                  isVisible={validate.employmentType.isVisible}
                />

                <InputTextWithTitle
                  defaultValue={moment().format('YYYY-MM-DD HH:mm:ss')}
                  onTextChange={(value) => onExpirationChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.expiration = ref) : undefined)}
                  title='Thời hạn ứng tuyển'
                  type='datetime-local'
                  placeholder={'Nhập thời hạn ứng tuyển...'}
                />

                <ValidateTextView
                  textError={validate.expiration.textError}
                  isError={validate.expiration.isError}
                  isVisible={validate.expiration.isVisible}
                />

                <TextAreaWithTitle
                  onTextChange={(value) => onLocationChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.location = ref) : undefined)}
                  rows={5}
                  placeholder='Nhập địa điểm làm việc...'
                  title='Địa điểm làm việc'
                />

                <ValidateTextView
                  textError={validate.location.textError}
                  isError={validate.location.isError}
                  isVisible={validate.location.isVisible}
                />

                <TextAreaWithTitle
                  onTextChange={(value) => onDescriptionChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.description = ref) : undefined)}
                  rows={10}
                  placeholder={'Nhập mô tả...'}
                  title='Mô tả công việc'
                />

                <InputTextWithTitle
                  onTextChange={(value) => onSalaryChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.salary = ref) : undefined)}
                  title='Lương'
                  placeholder={'Nhập mức lương...'}
                />

                <ValidateTextView
                  textError={validate.salary.textError}
                  isError={validate.salary.isError}
                  isVisible={validate.salary.isVisible}
                />

                <TextAreaWithTitle
                  onTextChange={(value) => onRequirementChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.requirement = ref) : undefined)}
                  rows={10}
                  placeholder={'Nhập yêu cầu...'}
                  title='Yêu cầu'
                />

                <ValidateTextView
                  textError={validate.requirement.textError}
                  isError={validate.requirement.isError}
                  isVisible={validate.requirement.isVisible}
                />

                <TextAreaWithTitle
                  onTextChange={(value) => onBenefitChangeText(value)}
                  ref={(ref) => (ref ? (elementRefs.benefit = ref) : undefined)}
                  rows={20}
                  placeholder={'Nhập quyền lợi...'}
                  title='Quyền lợi'
                />

                <ValidateTextView
                  textError={validate.benefit.textError}
                  isError={validate.benefit.isError}
                  isVisible={validate.benefit.isVisible}
                />
              </div>
              <div className='row'>
                <div className='col-lg-12 mb-0'>
                  <button
                    type='button'
                    className='font-xsss fw-600 w175 rounded-3 d-inline-block mt-3 bg-current p-3 text-center text-white'
                    onClick={() => onBtnPublishRecruitmentPostPress()}
                  >
                    Đăng bài viết
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
