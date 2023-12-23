import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Student } from '../types/Student'
import { Token } from '../types/Token'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone
} from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import { handleUploadImage } from '../utils/UploadUtils'
import { ACCEPT_SEND_EMAIL_PAGE, LOGIN_PAGE } from '../constants/Page'
import { useTranslation } from 'react-multi-lang'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface RegisterStudent {
  name: InputTextValidate
  email: InputTextValidate
  studentCode: InputTextValidate
  major: InputTextValidate
  facultyName: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
  phone: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterStudent): boolean => {
  let key: keyof RegisterStudent

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }
  return true
}

export default function StudentRegistationPage() {
  const t = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['email', 'url', 'subject'])
  const [image, setImage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
  const [student, setStudent] = useState<
    Omit<Student, 'status' | 'roleCodes' | 'createdAt' | 'updatedAt' | 'isTyping' | 'isMessageConnect'>
  >({
    id: 0,
    password: '',
    code: Date.now().toString(),
    email: '',
    name: '',
    image: '',
    facultyId: 0,
    majorId: 0,
    studentCode: '',
    confimPassword: '',
    facultyGroupCode: '',
    facultyGroupId: 0,
    phone: '',
    background: '',
    subject: '',
    content: ''
  })
  const [dataRequest, setDataRequest] = useState([
    {
      id: 0,
      name: '',
      majors: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  ])
  const [dataNganhRequest, setDataNganhRequest] = useState([{ id: 0, name: '' }])
  const [validate, setValidate] = useState<RegisterStudent>({
    name: {
      textError: t('RegisterStudentComponent.errorStudentNameEmpty'),
      isVisible: false,
      isError: true
    },
    email: {
      textError: t('RegisterStudentComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true
    },
    studentCode: {
      textError: t('RegisterStudentComponent.errorStudentCodeEmpty'),
      isVisible: false,
      isError: true
    },
    facultyName: {
      textError: t('RegisterStudentComponent.errorFaculityEmpty'),
      isVisible: false,
      isError: true
    },
    major: {
      textError: t('RegisterStudentComponent.errorMajor'),
      isVisible: false,
      isError: true
    },
    password: {
      textError: t('RegisterStudentComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: t('RegisterStudentComponent.errorConfimPasswordEmpty'),
      isVisible: false,
      isError: true
    },
    phone: {
      textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true
    }
  })

  const [isCheck, setCheck] = useState(true)
  const [isCheck1, setCheck1] = useState(true)
  const onCheck = () => {
    if (isCheck) {
      setCheck(false)
    } else {
      setCheck(true)
    }
  }
  const onCheck1 = () => {
    if (isCheck1) {
      setCheck1(false)
    } else {
      setCheck1(true)
    }
  }

  const handleStudentNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentNameEmpty')
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterStudentComponent.errorStudentNameNotSpecial'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterStudentComponent.errorStudentNameNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setStudent({ ...student, name: event.target.value })
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handlePhoneChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
            isVisible: true
          }
        })
      } else if (!isPhone(event.target.value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneNotFormat'),
            isVisible: true
          }
        })
      } else {
        setStudent({ ...student, phone: event.target.value })
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handleStudentCodeChange = useCallback(
    (event: any) => {
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/)
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeEmpty')
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotSpecial')
          }
        })
      } else if (!stCode.test(event.target.value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotFormat')
          }
        })
      } else {
        setStudent({ ...student, studentCode: event.target.value })
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleCheckEmail = useCallback(() => {
    axios
      .post(SERVER_ADDRESS + `api/users/check?email=${student.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterStudentComponent.errorSameEmail'),
              isVisible: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student.email])
  
  const handleEmailChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailEmpty')
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotLengthMax')
          }
        })
      } else if (!isEmail(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotFormat')
          }
        })
      } else {
        setStudent({ ...student, email: event.target.value })
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handlePasswordChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPasswordEmpty')
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotLengthMax')
          }
        })
      } else if (!isPassword(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotFormat')
          }
        })
      } else {
        setStudent({ ...student, password: event.target.value })
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleConfirmPasswordChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfimPasswordEmpty')
          }
        })
      } else if (event.target.value != student.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfimPassNotMatch')
          }
        })
      } else {
        setStudent({ ...student, confimPassword: event.target.value })
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: false,
            isError: false
          }
        })
      }
    },
    [validate]
  )
  const handleMajorNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorMajorEmpty')
          }
        })
      } else {
        setStudent({ ...student, majorId: event.target.value })
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleFacultyNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorFaculityEmpty')
          }
        })
      } else {
        setStudent({ ...student, facultyId: event.target.value })
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data)
        dataRequest.map((data) => {
          if (data.id == student.facultyId) {
            setDataNganhRequest(data.majors)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student])

  const onSelectUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        console.log(response.data)
        setStudent({ ...student, image: response.data[0] })
      })
    }
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.showPicker()
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = () => {
    if (isAllFieldsValid(validate)) {
      setStudent({ ...student, subject: t('RegisterStudentComponent.textAccountAuthen') })
      setIsLoading(true)
      axios
        .post<Student, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student/register', student)
        .then((response) => {
          setIsLoading(false)
          let expires = new Date()
          expires.setTime(expires.getTime() + 600 * 1000)
          setCookie('email', student.email, { path: '/', expires })
          setCookie('url', 'api/users/get/email/authen/register', { path: '/', expires })
          setCookie('subject', t('RegisterStudentComponent.textAccountAuthen'), { path: '/', expires })
          // toast.success(t('RegisterStudentComponent.registerSusccess'))
          navigate(ACCEPT_SEND_EMAIL_PAGE)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
          toast.error(t('RegisterStudentComponent.registerFail'))
        })
    } else {
      let key: keyof RegisterStudent

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }
      setValidate({ ...validate })
    }
  }

  return (
    <Fragment>
      <div className='main-wrap'>
        <div className='nav-header border-0 bg-transparent shadow-none'>
          <div className='nav-top w-100'>
            <a href='/'>
              <i className='feather-zap text-success display1-size me-2 ms-0'> </i>
              <span className='d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text mb-0 text-current'>
                TDCer
              </span>
            </a>
            <button className='nav-menu me-0 ms-auto'> </button>
          </div>
        </div>

        <div className='row'>
          <div
            className='col-xl-5 d-none d-xl-block vh-100 bg-image-cover bg-no-repeat p-0'
            style={{
              backgroundImage: `url("/assets/images/login-bg-2.jpg")`
            }}
          ></div>

          <div className='col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden bg-white'>
            <div className='login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h2 className='fw-700 display1-size display2-md-size mb-3'>
                  {t('RegisterStudentComponent.titleRegisterStudent')}
                </h2>
                <form className='register'>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-user text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleStudentNameChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterStudentComponent.titleStudentName')}
                      style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.name?.textError}
                      isError={validate.name?.isError}
                      isVisible={validate.name?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-pencil-alt text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleStudentCodeChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterStudentComponent.titleStudentCode')}
                      style={{ borderColor: !validate.studentCode?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.studentCode?.textError}
                      isError={validate.studentCode?.isError}
                      isVisible={validate.studentCode?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-email text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleEmailChange(e)}
                      onBlur={() => handleCheckEmail()}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterStudentComponent.titleEmail')}
                      style={{ borderColor: !validate.email?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.email?.textError}
                      isError={validate.email?.isError}
                      isVisible={validate.email?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handlePhoneChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titlePhone')}
                      style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.phone?.textError}
                      isError={validate.phone?.isError}
                      isVisible={validate.phone?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-bag text-grey-500 pe-0 '> </i>
                    <select
                      className='style2-input form-control font-xsss fw-600 ps-5 pt-0'
                      onChange={(e) => handleFacultyNameChange(e)}
                      style={{ borderColor: !validate.facultyName?.isError ? '#228b22' : '#eee' }}
                    >
                      <option hidden>{t('RegisterStudentComponent.titleFaculity')}</option>
                      {dataRequest.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <TextValidate
                      textError={validate.facultyName?.textError}
                      isError={validate.facultyName?.isError}
                      isVisible={validate.facultyName?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-briefcase text-grey-500 pe-0'> </i>
                    <select
                      className='style2-input form-control font-xsss fw-600 ps-5 pt-0'
                      onChange={(e) => handleMajorNameChange(e)}
                      style={{ borderColor: !validate.major?.isError ? '#228b22' : '#eee' }}
                    >
                      <option hidden>{t('RegisterStudentComponent.titleMajor')}</option>
                      {dataNganhRequest.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <TextValidate
                      textError={validate.major?.textError}
                      isError={validate.major?.isError}
                      isVisible={validate.major?.isVisible}
                    />
                  </div>

                  <div className='form-group icon-input gr mb-3'>
                    <input
                      type={!isCheck ? 'text' : 'password'}
                      onChange={(e) => handlePasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder={t('RegisterStudentComponent.titlePass')}
                      style={{ borderColor: !validate.password?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>
                    <button type='button' onClick={() => onCheck()}>
                      <FontAwesomeIcon
                        style={{ position: 'absolute', right: 15, bottom: 20, color: 'grey' }}
                        icon={!isCheck ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  <TextValidate
                    textError={validate.password?.textError}
                    isError={validate.password?.isError}
                    isVisible={validate.password?.isVisible}
                  />
                  <div className='form-group icon-input gr mb-3'>
                    <input
                      type={!isCheck1 ? 'text' : 'password'}
                      onChange={(e) => handleConfirmPasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder={t('RegisterStudentComponent.titleConfimPass')}
                      style={{ borderColor: !validate.confimPassword?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>{' '}
                    <button type='button' onClick={() => onCheck1()}>
                      <FontAwesomeIcon
                        style={{ position: 'absolute', right: 15, bottom: 20, color: 'grey' }}
                        icon={!isCheck1 ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  <TextValidate
                    textError={validate.confimPassword?.textError}
                    isError={validate.confimPassword?.isError}
                    isVisible={validate.confimPassword?.isVisible}
                  />
                  <div className='d-flex mt-3 p-0'>
                    <input
                      type={'file'}
                      multiple
                      ref={fileInputRef}
                      className='hidden'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImage(event)}
                    />
                    <button
                      type='button'
                      className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
                      onClick={handleGetFiles}
                      ref={buttonCallPickerImgRef}
                    >
                      <i className='font-md text-success feather-image me-2'></i>
                      <span className='d-none-xs'>{t('RegisterStudentComponent.avata')}</span>
                    </button>
                  </div>
                  <div className='img'>{image && <img src={image} className='avatar' />}</div>
                </form>

                <div className='col-sm-12 p-0 text-center'>
                  <div className='form-group mb-1 mt-4'>
                    <div className='gr'>
                      <button
                        className='form-control style2-input fw-600 bg-blue border-0 p-0 text-center text-white'
                        onClick={() => onSubmit()}
                      >
                        {t('RegisterStudentComponent.titleRegister')}
                      </button>
                      <div className='loadingg' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#ffff' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                  <h6 className='text-grey-500 font-xsss fw-500 lh-32 mb-0 mt-0'>
                    {t('RegisterStudentComponent.requestLogin')}
                    <button className='fw-700 txt-blue ms-1' onClick={() => navigate(LOGIN_PAGE)}>
                      {t('RegisterStudentComponent.titleLogin')}
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
