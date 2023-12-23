import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTokenFromSlug } from '../utils/CommonUtls'
import { InputTextValidate, isBlank, isLengthInRange, isPassword } from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { toast } from 'react-toastify'
import { LOGIN_PAGE } from '../constants/Page'
import { useTranslation } from 'react-multi-lang'
interface ResetPassword {
  password: InputTextValidate
  repassword: InputTextValidate
}
export default function ResetPasswordPage() {
  const { slug } = useParams()
  const t = useTranslation()
  const token = getTokenFromSlug(slug ?? '')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [border, setBorder] = useState('')
  const [tokenValid, setTokenValid] = useState(true)
  const [borderRe, setBorderRe] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [validate, setValidate] = useState<ResetPassword>({
    password: {
      textError: t('ResetPassword.password_no_blank'),
      isVisible: false,
      isError: true
    },
    repassword: {
      textError: t('ResetPassword.re_password_no_blank'),
      isVisible: false,
      isError: true
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS}api/users/check/token`,
      data: {
        token: token
      }
    })
      .then((res) => {
        res.data.data == 0 ? setTokenValid(false) : setTokenValid(true)
        console.log(1)
      })
      .catch((err) => {})
  })

  const resetPassword = (event: any) => {
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS}api/users/reset/password`,
      data: {
        token: token,
        password: password,
        repassword: repassword
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(t('ResetPassword.update_success'))
        navigate(LOGIN_PAGE)
      })
      .catch((err) => {
        console.log(err.response.status)
      })
  }

  const checkPasswordChange = (e: any) => {
    if (isBlank(e.target.value)) {
      setBorder('#ed3e18')
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isVisible: true,
          isError: true,
          textError: t('ResetPassword.password_no_blank')
        }
      })
    } else if (!isLengthInRange(e.target.value, 1, 8)) {
      setBorder('#ed3e18')
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isVisible: true,
          isError: true,
          textError: t('ResetPassword.password_length_no_more')
        }
      })
    } else if (!isPassword(e.target.value)) {
      setBorder('#ed3e18')
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isVisible: true,
          isError: true,
          textError: t('ResetPassword.password_no_valid')
        }
      })
    } else {
      setBorder('#1eaf68')
      setPassword(e.target.value)
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

  const checkRePasswordChange = (e: any) => {
    if (isBlank(e.target.value)) {
      setBorderRe('#ed3e18')
      setValidate({
        ...validate,
        repassword: {
          ...validate.repassword,
          isVisible: true,
          isError: true,
          textError: t('ResetPassword.re_password_no_blank')
        }
      })
    } else if (e.target.value != password) {
      setBorderRe('#ed3e18')
      setValidate({
        ...validate,
        repassword: {
          ...validate.repassword,
          isVisible: true,
          isError: true,
          textError: t('ResetPassword.re_password_no_valid')
        }
      })
    } else {
      setDisabled(false)
      setBorderRe('#1eaf68')
      setRePassword(e.target.value)
      setValidate({
        ...validate,
        repassword: {
          ...validate.repassword,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  return (
    <div className='bg-son'>
      <div className='forgot_box'>
        <div className='formbold-main-wrapper'>
          <div className='formbold-form-wrapper'>
            {tokenValid == true ? (
              <>
                <div className='formbold-form-title'>
                  <h3>{t('ResetPassword.title')}</h3>
                </div>
                <form>
                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-key text-grey-500 pe-0'></i>
                    <input
                      type='Password'
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('ResetPassword.plhd_password')}
                      name='password'
                      onChange={(e) => checkPasswordChange(e)}
                      style={{ borderColor: border }}
                    />
                    <TextValidate
                      textError={validate.password?.textError}
                      isError={validate.password?.isError}
                      isVisible={validate.password?.isVisible}
                    />
                  </div>

                  <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-reload text-grey-500 pe-0'></i>
                    <input
                      type='Password'
                      className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                      placeholder={t('ResetPassword.plhd_re_password')}
                      name='repassword'
                      onChange={(e) => checkRePasswordChange(e)}
                      style={{ borderColor: borderRe }}
                    />
                    <TextValidate
                      textError={validate.repassword?.textError}
                      isError={validate.repassword?.isError}
                      isVisible={validate.repassword?.isVisible}
                    />
                  </div>
                  <div className='form-group mb-1'>
                    <div className='forget-gr'>
                      <button
                        type='button'
                        disabled={disabled}
                        style={{ background: disabled ? '#464544' : '#157DEC' }}
                        onClick={(e) => resetPassword(e)}
                        className='form-control style2-input fw-600 border-0 p-0 text-center text-white '
                      >
                        {t('ResetPassword.confirm')}
                      </button>
                      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                        <ReactLoading type='bubbles' color='#ffffff' height={50} width={50} />
                      </div>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className='formbold-form-title'>
                  <h3>{t('ResetPassword.link_expirated')}</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
