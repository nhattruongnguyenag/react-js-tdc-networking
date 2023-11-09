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
import { LOGIN_PAGE } from '../constants/Page'

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
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null)
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
    facultyGroupCode: ''
  })
  const [timeStart, setTimeStart] = useState('07:00')
  const [timeEnd, setTimeEnd] = useState('17:00')
  const [validate, setValidate] = useState<RegisterBusiness>({
    name: {
      textError: 'Tên không được để trống',
      isVisible: false,
      isError: true
    },
    representor: {
      textError: 'Tên người đại diện không được để trống',
      isVisible: false,
      isError: true
    },
    email: {
      textError: 'Email không được để trống',
      isVisible: false,
      isError: true
    },
    taxCode: {
      textError: 'Mã số thuế không được để trống',
      isVisible: false,
      isError: true
    },
    address: {
      textError: 'Địa chỉ không được để trống',
      isVisible: false,
      isError: true
    },
    phone: {
      textError: 'Số điện thoại không được để trống',
      isVisible: false,
      isError: true
    },
    activeTime: {
      textError: 'Thời gian hoạt động không được để trống',
      isVisible: false,
      isError: true
    },
    password: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: 'Nhập lại mật khẩu không được để trống',
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
            isVisible: true
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên công ty không chứa ký tự đặt biệt'
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên công ty không vượt quá 255 ký tự'
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
            textError: 'Tên người đại diện không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(event.target.value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: 'Tên người đại diện không được chứa ký tự đặc biệt',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: 'Tên người đại diện không vượt quá 255 ký tự',
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
  const handleEmailChange = useCallback(
    (event: any) => {
      if (isBlank(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: 'Email không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: 'Email không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else if (!isEmail(event.target.value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: 'Email sai định dạng',
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
            textError: 'Mật khẩu không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: 'Mật khẩu không vượt quá 8 ký tự',
            isVisible: true
          }
        })
      } else if (!isPassword(event.target.value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: 'Mật khẩu sai định dạng',
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
            textError: 'Trường nhập lại mật khẩu không được để trống',
            isVisible: true
          }
        })
      } else if (event.target.value != business.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: true,
            textError: 'Trường nhập lại mật khẩu phải trùng với mật khẩu',
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
            textError: 'Mã số thuế không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: 'Mã số thuế không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else if (!isType(event.target.value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: 'Mã số thuế sai định dạng',
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
            textError: 'Địa chỉ không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(event.target.value, 1, 255)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: 'Địa chỉ không vượt quá 255 ký tự',
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
            textError: 'Số điện thoại không được để trống',
            isVisible: true
          }
        })
      } else if (!isPhone(event.target.value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: 'Số điện thoại sai định dạng',
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
          textError: 'Thời gian hoạt động sai định dạng',
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
      setIsLoading(true)
      axios
        .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
        .then((response) => {
          setIsLoading(false)
          alert('Đăng ký thành công')
          navigate(LOGIN_PAGE)
        })
        .catch((error) => {
          setIsLoading(false)
          alert('Đăng ký thất bại')
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
            <div className='card login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h5 className='fw-700 display1-size display2-md-size mb-4'> Đăng ký doanh nghiệp</h5>
                <form className='register'>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-direction-alt text-grey-500 pe-0'> </i>
                    <input
                      type='text'
                      onChange={(e) => handleNameChange(e)}
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Tên doanh nghiệp...'
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
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Email...'
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
                      placeholder='Họ tên người đại diện'
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
                      placeholder='Mã số thuế...'
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
                      placeholder='Địa chỉ...'
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
                      placeholder='Số điện thoại...'
                      style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                      textError={validate.phone?.textError}
                      isError={validate.phone?.isError}
                      isVisible={validate.phone?.isVisible}
                    />
                  </div>
                  <label className='form-group text-grey-600 fw-600'>Thời gian làm việc</label>
                  <div className='form-group icon-input mb-3'>
                    <div className='clock'>
                      <input
                        type='time'
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                        style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      />
                      <label className='me-1 ms-1'>đến</label>
                      <input
                        type='time'
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        style={{ borderColor: !validate.activeTime?.isError ? '#228b22' : '#eee' }}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      />
                    </div>
                    <TextValidate
                      textError={validate.activeTime?.textError}
                      isError={validate.activeTime?.isError}
                      isVisible={validate.activeTime?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-3'>
                    <input
                      type='Password'
                      onChange={(e) => handlePasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder='Mật khẩu'
                      style={{ borderColor: !validate.password?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>{' '}
                    <TextValidate
                      textError={validate.password?.textError}
                      isError={validate.password?.isError}
                      isVisible={validate.password?.isVisible}
                    />
                  </div>
                  <div className='form-group icon-input mb-1'>
                    <input
                      type='Password'
                      onChange={(e) => handleConfirmPasswordChange(e)}
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder='Nhập lại mật khẩu'
                      style={{ borderColor: !validate.confimPassword?.isError ? '#228b22' : '#eee' }}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'> </i>{' '}
                    <TextValidate
                      textError={validate.confimPassword?.textError}
                      isError={validate.confimPassword?.isError}
                      isVisible={validate.confimPassword?.isVisible}
                    />
                  </div>
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
                      <span className='d-none-xs'>Ảnh đại diện</span>
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
                        Đăng ký
                      </button>
                      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#ffff' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                  <h6 className='text-grey-500 font-xsss fw-500 lh-32 mb-0 mt-0'>
                    Đã có tài khoản?
                    <button className='fw-700 txt-blue ms-1' onClick={() => navigate(LOGIN_PAGE)}>
                      Đăng nhập
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
