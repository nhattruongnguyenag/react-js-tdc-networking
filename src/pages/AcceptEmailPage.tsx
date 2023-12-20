import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { ACCEPT_SEND_EMAIL_PAGE } from '../constants/Page'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading'
import '../assets/css/forgotPasswordPage.css'
import { useTranslation } from 'react-multi-lang'

export default function AcceptSendEmailPage() {
  const t = useTranslation()
  const [cookies, setCookie] = useCookies(['email', 'url', 'subject'])
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
        console.log(cookies['subject'])
        toast.success(t('AcceptScreen.send_success'))
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  return (
    <div className='bg-son'>
      <div className='forgot_box'>
        <div className='formbold-main-wrapper'>
          <div className='formbold-form-wrapper'>
            <div className='formbold-form-title'>
              <h3>{t('AcceptScreen.description1')}</h3>
            </div>

            <div className='fw-600 btn_resend border-0 text-black'>
              {t('AcceptScreen.notSend')}
              <a className='clickHere' onClick={sendEmail}>
                {t('AcceptScreen.sendAgain')}
              </a>
              <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
                <ReactLoading type='bubbles' color='#1828ED' height={50} width={50} />
              </div>
            </div>
            <div className='fw-600 btn_resend border-0 text-black'>
              +
              <a onClick={() => navigate('/')} className='clickHere'>
                {t('AcceptScreen.back')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
