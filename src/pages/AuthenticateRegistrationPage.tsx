import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getTokenFromSlug } from '../utils/CommonUtls'
import { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useNavigate } from 'react-router-dom'

export default function AuthenticateRegistrationPage() {
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
                  <h3>Tài khoản kích hoạt thành công !!</h3>
                </div>
              </>
            ) : (
              <>
                <div className='formbold-form-title'>
                  <h3>Xin lỗi , liên kết của bạn đã hết hạn !!!</h3>
                </div>
              </>
            )}
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
  )
}
