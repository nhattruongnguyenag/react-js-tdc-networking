import React, { useEffect, useState } from 'react'
import { InputTextValidate, isBlank, isEmail, isLengthInRange } from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useNavigate } from 'react-router-dom'
import { ACCEPT_FORGOT_PASSWORD_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [validate, setValidate] = useState<InputTextValidate>({
    textError: 'Email không được để trống',
    isVisible: false,
    isError: true
  })
  const [border, setBorder] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['email'])

  useEffect(() => {}, [email, border])

  const sendEmail = (event: any) => {
    if (validate?.isError) {
      alert('Email không đúng định dạng')
    } else {
      setIsLoading(true)
      axios({
        method: 'post',
        url: `${SERVER_ADDRESS}api/users/get/email/reset`,
        data: {
          email: email
        }
      })
        .then((res) => {
          setIsLoading(false)
          let expires = new Date()
          expires.setTime(expires.getTime() + 600 * 1000)
          setCookie('email', email, { path: '/', expires })
          navigate(ACCEPT_FORGOT_PASSWORD_PAGE)
          toast.success('Gửi thành công')
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error('Email này chưa được đăng ký !!!')
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
        textError: 'Email không được để trống'
      })
    } else if (!isLengthInRange(e.target.value, 1, 255)) {
      setBorder('#ed3e18')
      setValidate({
        isError: true,
        isVisible: true,
        textError: 'Email không vượt quá 255 ký tự'
      })
    } else if (!isEmail(e.target.value)) {
      setBorder('#ed3e18')
      setValidate({
        isError: true,
        isVisible: true,
        textError: 'Email sai định dạng'
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
              <h3>Nhập email để thay đổi mật khẩu</h3>
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
                    Xác nhận email
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
