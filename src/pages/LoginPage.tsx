import { Fragment, useCallback, useRef, useState } from 'react'
import { UserLoginRequest } from '../types/request/UserLoginRequest'
import axios, { AxiosResponse } from 'axios'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Business } from '../types/Business'
import { Data } from '../types/Data'
import { Faculty } from '../types/Faculty'
import { Student } from '../types/Student'
import { Token } from '../types/Token'
import { useAppDispatch } from '../redux/Hook'
import { setUserLogin } from '../redux/Slice'
import { InputTextValidate, isBlank, isEmail, isLengthInRange, isPassword } from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import '../style/login.css'
interface UserLogin {
  emailUser: InputTextValidate
  passwordUser: InputTextValidate
}

const isAllFieldsValid = (validate: UserLogin): boolean => {
  let key: keyof UserLogin

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [userLoginRequest, setUserLoginRequest] = useState<UserLoginRequest>({
    email: '',
    password: ''
  })
  const [validate, setValidate] = useState<UserLogin>({
    emailUser: {
      textError: 'Email không được để trống',
      isVisible: false,
      isError: true
    },
    passwordUser: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const checkEmailChange = (e: any) => {
    if (isBlank(e.target.value)) {
      setValidate({
        ...validate,
        emailUser: {
          ...validate.emailUser,
          isError: true,
          isVisible: true,
          textError: 'Email không được để trống'
        }
      })
    } else if (!isLengthInRange(e.target.value, 1, 255)) {
      setValidate({
        ...validate,
        emailUser: {
          ...validate.emailUser,
          isError: true,
          isVisible: true,
          textError: 'Email không vượt quá 255 ký tự'
        }
      })
    } else if (!isEmail(e.target.value)) {
      setValidate({
        ...validate,
        emailUser: {
          ...validate.emailUser,
          isError: true,
          isVisible: true,
          textError: 'Email sai định dạng'
        }
      })
    } else {
      setUserLoginRequest({ ...userLoginRequest, email: e.target.value })
      setValidate({
        ...validate,
        emailUser: {
          ...validate.emailUser,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  const checkPasswordChange = (e: any) => {
    if (isBlank(e.target.value)) {
      setValidate({
        ...validate,
        passwordUser: {
          ...validate.passwordUser,
          isVisible: true,
          isError: true,
          textError: 'Mật khẩu không được để trống'
        }
      })
    } else if (!isLengthInRange(e.target.value, 1, 8)) {
      setValidate({
        ...validate,
        passwordUser: {
          ...validate.passwordUser,
          isVisible: true,
          isError: true,
          textError: 'Mật khẩu không vượt quá 8 ký tự'
        }
      })
    } else if (!isPassword(e.target.value)) {
      setValidate({
        ...validate,
        passwordUser: {
          ...validate.passwordUser,
          isVisible: true,
          isError: true,
          textError: 'Mật khẩu sai định dạng'
        }
      })
    } else {
      setUserLoginRequest({ ...userLoginRequest, password: e.target.value })
      setValidate({
        ...validate,
        passwordUser: {
          ...validate.passwordUser,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  const onSubmit = (event: any) => {
    if (isAllFieldsValid(validate)) {
      event.preventDefault()
      setIsLoading(true)
      axios
        .post<UserLoginRequest, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/login', userLoginRequest)
        .then((loginResponse) => {
          const token = loginResponse.data.data.token
          axios
            .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
            .then((response) => {
              if (response.status == 200) {
                setIsLoading(false)
                sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token))
                sessionStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data))
                dispatch(setUserLogin(response.data.data))
                console.log(response.data.data)
                navigate('/doanh-nghiep/bai-viet')
              }
            })
        })
        .catch((error) => {
          setIsLoading(false)
          alert('Sai thông tin email hoặc mật khẩu')
        })
    } else {
      let key: keyof UserLogin

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
              <i className='feather-zap text-success display1-size me-2 ms-0'></i>
              <span className='d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text mb-0 text-current'>
                TDCer.{' '}
              </span>{' '}
            </a>
            <button className='nav-menu me-0 ms-auto'></button>
          </div>
        </div>
        <div className='row'>
          <div
            className='col-xl-5 d-none d-xl-block vh-100 bg-image-cover bg-no-repeat p-0'
            style={{ backgroundImage: `url("assets/images/login-bg.jpg")` }}
          ></div>
          <div className='col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden bg-white'>
            <div className='card login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h2 className='fw-700 display1-size display2-md-size mb-3'>
                  Đăng nhập vào <br />
                  tài khoản của bạn
                </h2>
                <form>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-email text-grey-500 pe-0'></i>
                    <input
                      type='text'
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder='Email'
                      onChange={(e) => checkEmailChange(e)}
                    />
                    <TextValidate
                      textError={validate.emailUser?.textError}
                      isError={validate.emailUser?.isError}
                      isVisible={validate.emailUser?.isVisible}
                    />
                  </div>

                  <div className='form-group icon-input mb-1'>
                    <input
                      type='Password'
                      className='style2-input form-control text-grey-900 font-xss ls-3 ps-5'
                      placeholder='Mật khẩu'
                      onChange={(e) => checkPasswordChange(e)}
                    />
                    <TextValidate
                      textError={validate.passwordUser?.textError}
                      isError={validate.passwordUser?.isError}
                      isVisible={validate.passwordUser?.isVisible}
                    />
                    <i className='font-sm ti-lock text-grey-500 pe-0'></i>
                  </div>
                  <div className='form-check mb-3 text-left'>
                    <button type='button' className='fw-600 font-xsss text-grey-700 float-right'>
                      Quên mật khẩu?
                    </button>
                  </div>
                </form>

                <div className='col-sm-12 p-0 text-center'>
                  <div className='form-group mb-1'>
                    <div className='gr'>
                      <button
                        type='button'
                        onClick={(e) => onSubmit(e)}
                        className='form-control style2-input fw-600 bg-blue border-0 p-0 text-center text-white '
                      >
                        Đăng nhập
                      </button>
                      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#0000FF' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                  <h6 className='text-grey-500 font-xsss fw-500 lh-32 mb-0 mt-0'>
                    Chưa có tài khoản?{' '}
                    <button type='button' className='txt-blue'>
                      Đăng ký
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
