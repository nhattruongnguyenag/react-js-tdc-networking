import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { ACCEPT_SEND_EMAIL_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'
import '../assets/css/forgotPasswordPage.css'

export default function AcceptSendEmailPage() {
  const [cookies, setCookie] = useCookies(['email','url','subject'])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log(cookies['email'])
  })

  const sendEmail = (event: any) => {
    setIsLoading(true)
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS + cookies['url']}`,
      data: {
        to: cookies['email'],
        subject: cookies['subject'],
        content: ''
      }
    })
      .then((res) => {
        setIsLoading(false)
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
                <ReactLoading type='bubbles' color='#1828ED' height={50} width={50} />
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
