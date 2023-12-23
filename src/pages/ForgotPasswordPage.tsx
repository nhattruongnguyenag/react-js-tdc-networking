import React, { useEffect, useState } from 'react'
import { InputTextValidate, isBlank, isEmail, isLengthInRange } from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useNavigate } from 'react-router-dom'
import { ACCEPT_SEND_EMAIL_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import '../assets/css/forgotPasswordPage.css'
import { useTranslation } from 'react-multi-lang'

export default function ForgotPasswordPage() {
  const t = useTranslation()
  const [email, setEmail] = useState('')
  const [validate, setValidate] = useState<InputTextValidate>({
    textError: t('ForgotPassword.email_no_blank'),
    isVisible: false,
    isError: true
  })
  const [border, setBorder] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['email', 'url','subject'])

  useEffect(() => {}, [email, border])

  const sendEmail = (event: any) => {
    if (validate?.isError) {
      alert(t('ForgotPassword.email_no_valid'))
    } else {
      setIsLoading(true)
      axios({
        method: 'post',
        url: `${SERVER_ADDRESS}api/users/get/email/reset`,
        data: {
          to: email,
          subject: 'Password reset',
          content: ''
        }
      })
        .then((res) => {
          setIsLoading(false)
          let expires = new Date()
          expires.setTime(expires.getTime() + 600 * 1000)
          setCookie('email', email, { path: '/', expires })
          setCookie('url', 'api/users/get/email/reset', { path: '/', expires })
          setCookie('subject', t('ForgotPassword.password_reset'), { path: '/', expires })
          navigate(ACCEPT_SEND_EMAIL_PAGE)
          toast.success(t('ForgotPassword.send_success'))
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error(t('ForgotPassword.this_email_has_not_registered'))
        })
    }
  }

  const checkEmailChange = (e: any) => {
    setEmail(e.target.value)
    if (isBlank(e.target.value)) {
      setBorder('#ed3e18')
      setValidate({
        isError: true,
        isVisible: true,
        textError: t('ForgotPassword.email_no_blank')
      })
    } else if (!isLengthInRange(e.target.value, 1, 255)) {
      setBorder('#ed3e18')
      setValidate({
        isError: true,
        isVisible: true,
        textError: t('ForgotPassword.email_no_more_length')
      })
    } else if (!isEmail(e.target.value)) {
      setBorder('#ed3e18')
      setValidate({
        isError: true,
        isVisible: true,
        textError: t('ForgotPassword.email_no_valid')
      })
    } else {
      setBorder('#1eaf68')
      setValidate({
        isError: false,
        isVisible: false,
        textError: ''
      })
    }
  }

  return (
    <div className='bg-son'>
      <div className='forgot_box'>
        <div className='formbold-main-wrapper'>
          <div className='formbold-form-wrapper'>
            <div className='formbold-form-title'>
              <h3>{t('ForgotPassword.title')}</h3>
            </div>
            <form>
              <div className='form-group icon-input mb-3'>
                <i className='font-sm ti-email text-grey-500 pe-0'></i>
                <input
                  type='text'
                  className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                  placeholder='Email'
                  name='email'
                  onChange={(e) => checkEmailChange(e)}
                  style={{ borderColor: border }}
                />
                <TextValidate
                  textError={validate?.textError}
                  isError={validate?.isError}
                  isVisible={validate?.isVisible}
                />
              </div>
              <div className='form-group mb-1'>
                <div className='forget-gr'>
                  <button
                    type='button'
                    onClick={(e) => sendEmail(e)}
                    className='form-control style2-input fw-600 bg-blue border-0 p-0 text-center text-white '
                  >
                    {t('ForgotPassword.confirm')}
                  </button>
                  <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                    <ReactLoading type='bubbles' color='#ffffff' height={50} width={50} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
