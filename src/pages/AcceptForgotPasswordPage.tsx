import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { ACCEPT_FORGOT_PASSWORD_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'

export default function AcceptForgotPasswordPage() {
  const [cookies, setCookie] = useCookies(['email'])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(cookies['email'])
  })

  const sendEmail = (event: any) => {
    setIsLoading(true)
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS}api/users/get/email/reset`,
      data: {
        email: cookies['email']
      }
    })
      .then((res) => {
        setIsLoading(false)
        let expires = new Date()
        expires.setTime(expires.getTime() + 600 * 1000)
        setCookie('email', cookies['email'], { path: '/', expires })
        navigate(ACCEPT_FORGOT_PASSWORD_PAGE)
        toast.success('Gửi thành công')
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error('Email này chưa được đăng ký !!!')
      })
  }

  return (
    <div className='bg-son'>
      <div className='forgot_box'>
        <div className='formbold-main-wrapper'>
          <div className='formbold-form-wrapper'>
            <div className='formbold-form-title'>
              <h3>Chúng tôi đã gửi liên kết đến email của bạn , hãy kiểm tra email !!!</h3>
            </div>

            <div className='fw-600 btn_resend border-0 text-black'>
              + Chưa nhận được email ???
              <a className='clickHere' onClick={sendEmail}>
                Nhấn tại đây !!
              </a>
              <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                <ReactLoading type='bubbles' color='1828ED' height={50} width={50} />
              </div>
            </div>
            <div className='fw-600 btn_resend border-0 text-black'>
              +
              <a onClick={() => navigate('/')} className='clickHere'>
                Về trang chủ !!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
