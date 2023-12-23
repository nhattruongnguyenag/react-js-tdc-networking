import React, { Fragment, useCallback, useRef, useState, useEffect } from 'react'
import { Business } from '../types/Business'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone,
  isTime,
  isType
} from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import { useNavigate } from 'react-router-dom'
import { handleUploadImage } from '../utils/UploadUtils'
import ReactLoading from 'react-loading'
import { ACCEPT_SEND_EMAIL_PAGE, LOGIN_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-multi-lang'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface RegisterBusiness {
  name: InputTextValidate
  email: InputTextValidate
  representor: InputTextValidate
  taxCode: InputTextValidate
  phone: InputTextValidate
  address: InputTextValidate
  activeTime: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterBusiness): boolean => {
  let key: keyof RegisterBusiness

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}
export default function BusinessRegistationPage() {
  const t = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
  const [cookies, setCookie] = useCookies(['email', 'url', 'subject'])
  const [business, setBusiness] = useState<
    Omit<Business, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'roleCodes' | 'isTyping' | 'isMessageConnect'>
  >({
    password: '',
    representor: '',
    phone: '',
    taxCode: '',
    code: Date.now().toString(),
    address: '',
    activeTime: '',
    email: '',
    name: '',
    image: '',
    confimPassword: '',
    facultyGroupCode: '',
    facultyGroupId: 0,
    subject: '',
    content: ''
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
  const [timeStart, setTimeStart] = useState('07:00')
  const [timeEnd, setTimeEnd] = useState('17:00')
  const [validate, setValidate] = useState<RegisterBusiness>({
    name: {
      textError: t('RegisterBusinessComponent.errorNameEmpty'),
      isVisible: false,
      isError: true
    },
    representor: {
      textError: t('RegisterBusinessComponent.errorRepresentEmpty'),
      isVisible: false,
      isError: true
    },
    email: {
      textError: t('RegisterBusinessComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true
    },
    taxCode: {
      textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
      isVisible: false,
      isError: true
    },
    address: {
      textError: t('RegisterBusinessComponent.errorAddressEmpty'),
      isVisible: false,
      isError: true
    },
    phone: {
      textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true
    },
    activeTime: {
      textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
      isVisible: false,
      isError: true
    },
    password: {
      textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: t('RegisterBusinessComponent.errorConfimPasswordEmpty'),
      isVisible: false,
      isError: true
    }
  })
  const handleNameChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameEmpty')
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameNotSpecial')
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameNotLengthMax')
          }
        })
      } else {
        setBusiness({ ...business, name: event.target.value })
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
  const handleRepresentoreChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorRepresentEmpty')
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: t('RegisterBusinessComponent.errorRepresentNotSpecial'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: t('RegisterBusinessComponent.errorRepresentNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, representor: event.target.value })
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
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
      .post(SERVER_ADDRESS + `api/users/check?email=${business.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterBusinessComponent.errorSameEmail'),
              isVisible: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [business.email])
  const handleEmailChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isEmail(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailNotFormat'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, email: event.target.value })
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
            isError: true,
            textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isPassword(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotFormat'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, password: event.target.value })
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
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfimPasswordEmpty'),
            isVisible: true
          }
        })
      } else if (event.target.value != business.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfimPassNotMatch'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, confimPassword: event.target.value })
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleTaxCodeChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isType(event.target.value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotFormat'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, taxCode: event.target.value })
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleAddressChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setBusiness({ ...business, address: event.target.value })
        setValidate({
          ...validate,
          address: {
            ...validate.address,
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
        setBusiness({ ...business, phone: event.target.value })
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
  const onSelectUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setImage(URL.createObjectURL(event.target.files[0]))
      handleUploadImage(event.target.files, (response) => {
        console.log(response.data)
        setBusiness({ ...business, image: response.data[0] })
      })
    }
  }

  const handleGetFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.showPicker()
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!isTime(timeStart, timeEnd)) {
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: true,
          textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
          isVisible: true
        }
      })
    } else {
      setBusiness({ ...business, activeTime: timeStart + ' - ' + timeEnd })
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: false,
          isVisible: false
        }
      })
    }
  }, [timeStart, timeEnd])

  const onSubmit = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      setBusiness({ ...business, subject: t('RegisterBusinessComponent.textAccountAuthen') })
      setIsLoading(true)
      axios
        .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
        .then((response) => {
          setIsLoading(false)
          let expires = new Date()
          expires.setTime(expires.getTime() + 600 * 1000)
          setCookie('email', business.email, { path: '/', expires })
          setCookie('url', 'api/users/get/email/authen/register', { path: '/', expires })
          setCookie('subject', t('RegisterBusinessComponent.textAccountAuthen'), { path: '/', expires })
          // toast.success(t('RegisterBusinessComponent.registerSusccess'))
          navigate(ACCEPT_SEND_EMAIL_PAGE)
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(t('RegisterBusinessComponent.registerFail'))
        })
    } else {
      let key: keyof RegisterBusiness

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }, [validate, business])

  return (
    <Fragment>
      <div className='main-wrap'>
        <div className='nav-header border-0 bg-transparent shadow-none'>
          <div className='nav-top w-100'>
            <a href='/'>
              <i className='feather-zap text-success display1-size me-2 ms-0'> </i>
              <span className='d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text mb-0 text-current'>
                TDCer.
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
                <h5 className='fw-700 display1-size display2-md-size mb-4'>
                  {t('RegisterBusinessComponent.titleRegisterBusiness')}
                </h5>
                <form className='register'>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-direction-alt text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleNameChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titleBusinessName')}
                      style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.name?.textError}
                      isError={validate.name?.isError}
                      isVisible={validate.name?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-email text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleEmailChange(e)}
                      onBlur={() => handleCheckEmail()}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titleEmail')}
                      style={{ borderColor: !validate.email?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.email?.textError}
                      isError={validate.email?.isError}
                      isVisible={validate.email?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-user text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleRepresentoreChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titleRepresent')}
                      style={{ borderColor: !validate.representor?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.representor?.textError}
                      isError={validate.representor?.isError}
                      isVisible={validate.representor?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-pencil-alt text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleTaxCodeChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titleTaxCode')}
                      style={{ borderColor: !validate.taxCode?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.taxCode?.textError}
                      isError={validate.taxCode?.isError}
                      isVisible={validate.taxCode?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-location-pin text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleAddressChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('RegisterBusinessComponent.titleAddress')}
                      style={{ borderColor: !validate.address?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.address?.textError}
                      isError={validate.address?.isError}
                      isVisible={validate.address?.isVisible}
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
                  <label className='form-group text-grey-600 fw-600'>
                    {t('RegisterBusinessComponent.titleTimeStart')}
                  </label>
                  <div className='form-group icon-input mb-3'>
                    <div className='clock'>
                      <input
                        type='time'
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                        style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-4'
                      />
                      <label className='me-1 ms-1'>{t('RegisterBusinessComponent.titleTo')}</label>
                      <input
                        type='time'
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-4'
                      />
                    </div>
                    <TextValidate
                      textError={validate.activeTime?.textError}
                      isError={validate.activeTime?.isError}
                      isVisible={validate.activeTime?.isVisible}
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
                  <div className='card-body d-flex mt-3 p-0'>
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
                      <span className='d-none-xs'>{t('RegisterBusinessComponent.avata')}</span>
                    </button>
                  </div>
                  <div className='img'>{image ? <img src={image} className='avatar' /> : ''}</div>
                </form>

                <div className='col-sm-12 p-0 text-center'>
                  <div className='form-group mb-1 mt-4'>
                    <div className='gr'>
                      <button
                        className='form-control style2-input fw-600 bg-blue border-0 p-0 text-center text-white'
                        onClick={() => onSubmit()}
                      >
                        {t('RegisterBusinessComponent.titleRegister')}
                      </button>
                      <div className='loadingg' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#ffff' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                  <h6 className='text-grey-500 font-xsss fw-500 lh-32 mb-0 mt-0'>
                    {t('RegisterBusinessComponent.requestLogin')}
                    <button className='fw-700 txt-blue ms-1' onClick={() => navigate(LOGIN_PAGE)}>
                      {t('RegisterBusinessComponent.titleLogin')}
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
