import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { FUNCTION_DESCRIPTION_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../constants/Page'

export default function IntroducePage() {
  const navigate = useNavigate()
  return (
    <div>
      <div className='bg-intro'>
        {/* navbar */}
        <div className='navbar-intro'>
          <button className='btnAll-intro btnReg-intro' onClick={() => navigate(REGISTER_PAGE)}>
            Đăng kí ngay!
          </button>
          <button className='btnAll-intro btnLog-intro' onClick={() => navigate(LOGIN_PAGE)}>
            Đăng nhập!
          </button>
        </div>
        {/* body */}
        <div>
          <div className='gif-intro'></div>
          <div className='gif1-intro'></div>
          <div className='gif2-intro'></div>
          <div className='gif3-intro'></div>
          <div className='logo-intro'></div>
          <div className='tdc-intro'>TDC</div>
          <div className='tdc1-intro'>SOCIAL NETWORK</div>
          <div className='tdc2-intro'>Kết nối - Giao lưu</div>
          <div className='tdc2-intro'>Chia sẻ kinh nghiệm - Tìm kiếm doanh nghiệp</div>
          <button className='btn-intro btnFindNow-intro' onClick={() => navigate(FUNCTION_DESCRIPTION_PAGE)}>Tìm hiểu ngay!</button>
        </div>
      </div>
      {/* bottombar */}
      <div className='bottom-intro'>
        <div className='title-intro'>Chính sách Quyền riêng tư</div>
        <div className='title1-intro'>© 2035 bản quyền của Sắp ra mắt. Tự hào tạo ra với Wix.com</div>
        <div className='icon-bottom-intro'>
          <FontAwesomeIcon icon={faYoutube} className='icon-intro icon1-intro'></FontAwesomeIcon>
          <FontAwesomeIcon icon={faGithub} className='icon-intro icon2-intro'></FontAwesomeIcon>
          <FontAwesomeIcon icon={faFacebook} className='icon-intro icon3-intro'></FontAwesomeIcon>
        </div>
      </div>
    </div>
  )
}
