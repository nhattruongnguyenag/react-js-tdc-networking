import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getTokenFromSlug } from '../utils/CommonUtls'
import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-multi-lang'

export default function AuthenticateRegistrationPage() {
  const t = useTranslation()
  const { slug } = useParams()
  const token = getTokenFromSlug(slug ?? '')
  const [tokenValid, setTokenValid] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS}api/users/authen/register`,
      data: {
        token: token
      }
    })
      .then((res) => {})
      .catch((err) => {
        setTokenValid(false)
      })
  })
  return (
    <div className='bg-son'>
      <div className='forgot_box'>
        <div className='formbold-main-wrapper'>
          <div className='formbold-form-wrapper'>
            {tokenValid == true ? (
              <>
                <div className='formbold-form-title'>
                  <h3>{t('AuthenticateRegistration.success')}</h3>
                </div>
              </>
            ) : (
              <>
                <div className='formbold-form-title'>
                  <h3>{t('AuthenticateRegistration.link_expirated')}</h3>
                </div>
              </>
            )}
          </div>
          <div className='fw-600 btn_resend border-0 text-black'>
            +
            <a onClick={() => navigate('/')} className='clickHere'>
              {t('AuthenticateRegistration.back')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
