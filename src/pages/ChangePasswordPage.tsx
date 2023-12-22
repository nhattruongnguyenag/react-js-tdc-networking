import { COLOR_BTN_BLUE, COLOR_GREY } from '../constants/Color'
import { useTranslation } from 'react-multi-lang'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { InputTextValidate, isBlank, isPassword } from '../utils/ValidateUtils'
import { useAppSelector } from '../redux/Hook'
import '../assets/css/changePassword.css'
import { useNavigate } from 'react-router-dom'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import Header from '../components/common/Header'
import { SETTING_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'

interface ChangePassword {
  password: InputTextValidate
  newPassword: InputTextValidate
  reNewPassword: InputTextValidate
}

interface Data {
  password: string
  newPassword: string
  reNewPassword: string
}

export default function ChangePasswordPage() {
  const t = useTranslation()
  const [checkData, setCheckData] = useState<any>(true)
  const [disabled, setDisabled] = useState<any>(true)
  const [data, setData] = useState<Data>({
    password: '',
    newPassword: '',
    reNewPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { userLogin, surveyPostRequest, questionTitleValidates } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const [validate, setValidate] = useState<ChangePassword>({
    password: {
      textError: t('ChangePassword.password_no_null'),
      isVisible: false,
      isError: true
    },
    newPassword: {
      textError: t('ChangePassword.new_password_no_null'),
      isVisible: false,
      isError: true
    },
    reNewPassword: {
      textError: t('ChangePassword.re_new_password_no_null'),
      isVisible: false,
      isError: true
    }
  })

  const handlePasswordChange = (value: any) => {
    let input = value.target.value
    setData({ ...data, password: input })
    if (isBlank(input)) {
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isError: true,
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  const handleNewPasswordChange = (value: any) => {
    let input = value.target.value
    setData({ ...data, newPassword: input })
    if (isBlank(input)) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          isVisible: true
        }
      })
    } else if (!isPassword(input)) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          textError: t('ChangePassword.new_password_not_valid'),
          isVisible: true
        }
      })
    } else if (input == data.password) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          textError: t('ChangePassword.new_password_not_same_old_password'),
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  const handleReNewPasswordChange = (value: any) => {
    let input = value.target.value
    setData({ ...data, reNewPassword: input })
    if (isBlank(input)) {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: true,
          isVisible: true
        }
      })
    } else if (input != data.newPassword) {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: true,
          textError: t('ChangePassword.re_new_password_not_same'),
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  useEffect(() => {
    if (
      validate.password.isError == false &&
      validate.newPassword.isError == false &&
      validate.reNewPassword.isError == false
    ) {
      setDisabled('')
      setCheckData(true)
    } else {
      setCheckData(false)
    }
  }, [validate.password.isError, validate.newPassword.isError, validate.reNewPassword.isError])

  const onSubmit = () => {
    setIsLoading(true)
    axios
      .post(SERVER_ADDRESS + 'api/users/change/password', {
        userId: userLogin?.id,
        password: data.newPassword,
        oldPassword: data.password
      })
      .then((response) => {
        setIsLoading(false)
        toast.success(t('ChangePassword.change_success'))
        navigate(SETTING_PAGE)
      })
      .catch((error) => {
        toast.error(t('ChangePassword.change_error'))
        setIsLoading(false)
      })
  }

  return (
    <>
      <Header />
      <div className='main-content theme-dark-bg bg-lightblue body'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body p-lg-5 w-100 border-0 p-4'>
                  <div className='formbold-form-wrapper'>
                    <div className='formbold-form-title'>
                      <h3>{t('ChangePassword.title')}</h3>
                    </div>
                    <form>
                      <div className='form-group icon-input mb-3'>
                        <i className='font-sm ti-key text-grey-500 pe-0'></i>
                        <input
                          value={data.password}
                          type='Password'
                          placeholder={t('ChangePassword.place_holder_password')}
                          className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                          onChange={(value) => handlePasswordChange(value)}
                        />
                      </div>
                      <TextValidate
                        textError={validate.password?.textError}
                        isError={validate.password?.isError}
                        isVisible={validate.password?.isVisible}
                      />

                      <div className='form-group icon-input mb-3'>
                        <i className='font-sm ti-key text-grey-500 pe-0'></i>
                        <input
                          value={data.newPassword}
                          type='Password'
                          placeholder={t('ChangePassword.place_holder_new_password')}
                          className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                          onChange={(value) => handleNewPasswordChange(value)}
                        />
                      </div>
                      <TextValidate
                        textError={validate.newPassword?.textError}
                        isError={validate.newPassword?.isError}
                        isVisible={validate.newPassword?.isVisible}
                      />

                      <div className='form-group icon-input mb-3'>
                        <i className='font-sm ti-reload text-grey-500 pe-0'></i>
                        <input
                          value={data.reNewPassword}
                          type='Password'
                          placeholder={t('ChangePassword.place_holder_re_new_password')}
                          className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                          onChange={(value) => handleReNewPasswordChange(value)}
                        />
                      </div>
                      <TextValidate
                        textError={validate.reNewPassword?.textError}
                        isError={validate.reNewPassword?.isError}
                        isVisible={validate.reNewPassword?.isVisible}
                      />
                    </form>
                    <button
                      type='button'
                      disabled={disabled}
                      style={{ background: !checkData ? '#464544' : '#157DEC' }}
                      onClick={() => onSubmit()}
                      className='form-control style2-input fw-600 border-0 p-0 text-center text-white '
                    >
                      {t('ChangePassword.accept')}
                      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='spin' color='#ffffff' height={25} width={25} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
