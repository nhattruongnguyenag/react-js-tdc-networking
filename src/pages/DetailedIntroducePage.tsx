import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faGithub, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PAGE, REGISTER_PAGE } from '../constants/Page'
import classNames from 'classnames'
import '../assets/css/DetaileInducePage_css/templatemo-softy-pinko.css'
import '../assets/css/DetaileInducePage_css/bootstrap.min.css'
import '../assets/css/DetaileInducePage_css/flex-slider.css'

export default function DetailIntroducePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentAnchor = location.hash

  return (
    <div>
      {/* Header Area Start  */}
      <header className='header-area header-sticky'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <nav className='main-nav'>
                {/* Logo Start  */}
                <a href='#' className='logo'>
                  <img src='assets/images/logo_tdc_network.png' alt='TDC Network Social' className='logo' />
                </a>
                {/* Logo End  */}
                {/* Menu Start  */}
                <ul className='nav'>
                  <li>
                    <a href='#mo-dau' className={classNames(currentAnchor === '#mo-dau' || currentAnchor === '' ? 'active' : '')}>
                      Mở đầu
                    </a>
                  </li>
                  <li>
                    <a href='#chi-tiet' className={classNames(currentAnchor === '#chi-tiet' ? 'active' : '')}>Chi tiết</a>
                  </li>
                  <li>
                    <a href='#chuc-nang-khac' className={classNames(currentAnchor === '#chuc-nang-khac' ? 'active' : '')}>Các chức năng khác</a>
                  </li>
                  <li>
                    <Link to={LOGIN_PAGE}>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to={REGISTER_PAGE}>Đăng kí</Link>
                  </li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
                {/* Menu End  */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Header Area End  */}

      {/* Welcome Area Start  */}
      <div className='welcome-area' id='mo-dau'>
        {/* Header Text Start  */}
        <div className='header-text'>
          <div className='container'>
            <div className='row'>
              <div className='offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12'>
                <h1>
                  Là <strong>cầu nối</strong> giúp mọi sinh viên và doanh nghiệp
                </h1>
                <p>
                  Giúp sinh viên trao đổi kinh nghiệm, tìm hiểu được nhiều sự kiện của Khoa và trường.
                  <strong>Đặc biệt </strong> là tạo cơ hội cho nhiều sinh viên.
                </p>
                <a href='#features' className='main-button-slider'>
                  Khám phá nhiều hơn
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Header Text End */}
      </div>
      {/* Welcome Area End */}

      {/* Features Small Start */}
      <section className='section home-feature'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='row'>
                {/* Features Small Item Start */}
                <div
                  className='col-lg-4 col-md-6 col-sm-6 col-12'
                  data-scroll-reveal='enter bottom move 50px over 0.6s after 0.2s'
                >
                  <div className='features-small-item'>
                    <div className='icon'>
                      <a>
                        <img src='assets/images/list.png' alt='TDC Network Social' />
                      </a>
                    </div>
                    <h5 className='features-title'>Khảo sát chuyên ngành</h5>
                    <p>Trong nhóm của các Khoa có thể đưa ra nhiều bài khảo sát khác nhau</p>
                  </div>
                </div>
                {/* Features Small Item End */}

                {/* Features Small Item Start */}
                <div
                  className='col-lg-4 col-md-6 col-sm-6 col-12'
                  data-scroll-reveal='enter bottom move 50px over 0.6s after 0.4s'
                >
                  <div className='features-small-item'>
                    <div className='icon'>
                      <a>
                        <img src='assets/images/featured-item-01.png' alt='TDC Network Social' />
                      </a>
                    </div>
                    <h5 className='features-title'>Tuyển dụng sinh viên</h5>
                    <p>Trong một nhóm chung các Công ty có thể tuyển dụng nhiều sinh viên cho công ty</p>
                  </div>
                </div>
                {/* Features Small Item End */}

                {/* Features Small Item Start */}
                <div
                  className='col-lg-4 col-md-6 col-sm-6 col-12'
                  data-scroll-reveal='enter bottom move 50px over 0.6s after 0.6s'
                >
                  <div className='features-small-item'>
                    <div className='icon'>
                      <a>
                        <img src='assets/images/chat_icon.png' alt='TDC Network Social' />
                      </a>
                    </div>
                    <h5 className='features-title'>Giao tiếp với nhau</h5>
                    <p>Các sinh viên có thể có nhiều group để nhắn tin và trao đổi kinh nghiệm học tập</p>
                  </div>
                </div>
                {/* Features Small Item End */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Small End */}

      {/* Features Big Item Start */}
      <section className='section padding-top-70 padding-bottom-0' id='chi-tiet'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-lg-5 col-md-12 col-sm-12 align-self-center'
              data-scroll-reveal='enter left move 30px over 0.6s after 0.4s'
            >
              <img src='assets/images/chat.png' alt='App' className='img-fluid d-block mx-auto rounded' />
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix'>
              <div className='left-heading'>
                <h2 className='section-title'>Kết nối giữa sinh viên TDC và doanh nghiệp</h2>
              </div>
              <div className='left-text'>
                <p>
                  Các sinh viên TDC có thể nhắn tin với nhau, trao đổi kinh nghiệm hay chia sẻ những thông tin hữu ích
                </p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='hr'></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/* Features Big Item Start */}
      <section className='section padding-bottom-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix'>
              <div className='left-heading'>
                <h2 className='section-title'>Tạo cơ hội việc làm</h2>
              </div>
              <div className='left-text'>
                <p>
                  Doanh nghiệp có thể tuyển dụng sinh viên với một hoặt nhiều bài viết khác nhau trong một khoa bất kì.
                  Bên cạnh đó sinh viên có thể nộp CV hay tham gia một số khảo sát của doanh nghiệp để có cơ hội có một
                  công việc nhất định sau khi ra trường.
                </p>
              </div>
            </div>
            <div className='col-lg-1'></div>
            <div
              className='col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big'
              data-scroll-reveal='enter right move 30px over 0.6s after 0.4s'
            >
              <img src='assets/images/tuyen_dung.png' alt='App' className='img-fluid d-block mx-auto rounded' />
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/*  Features Big Item Start */}
      <section className='section padding-top-70 padding-bottom-0' id='khao-sat'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-lg-5 col-md-12 col-sm-12 align-self-center'
              data-scroll-reveal='enter left move 30px over 0.6s after 0.4s'
            >
              <img src='assets/images/khao_sat.png' alt='App' className='img-fluid d-block mx-auto rounded' />
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix'>
              <div className='left-heading'>
                <h2 className='section-title'>Khảo sát chuyên ngành</h2>
              </div>
              <div className='left-text'>
                <p>
                  Một số Khoa của trường sẽ tạo ra nhiều khảo sát khác nhau nhằm giúp các sinh viên có cơ hội góp ý. Qua
                  đó giúp các Khoa trở nên hoàn thiện và phù hợp với các sinh viên.
                </p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='hr'></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/* Blog Start */}
      <section className='section' id='chuc-nang-khac'>
        <div className='container'>
          {/* Section Title Start */}
          <div className='row'>
            <div className='col-lg-12'>
              <div className='center-heading'>
                <h2 className='section-title'>Các chức năng khác</h2>
              </div>
            </div>
            <div className='offset-lg-3 col-lg-6'>
              <div className='center-text'>
                <p>Dưới đây là một số chức năng khác. Sinh viên có thể tham khảo thêm.</p>
              </div>
            </div>
          </div>
          {/* Section Title End */}

          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='blog-post-thumb'>
                <div className='img'>
                  <img src='assets/images/taobaiviet.png' alt='' />
                </div>
                <div className='blog-content'>
                  <h3>
                    <a href='#'>Tạo bài viết</a>
                  </h3>
                  <div className='text'>
                    Mỗi sinh viên cũng có thể tạo bài bài viết cho riêng mình để mọi sinh viên góp ý.
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='blog-post-thumb'>
                <div className='img'>
                  <img src='assets/images/tuongtac.png' alt='' />
                </div>
                <div className='blog-content'>
                  <h3>
                    <a href='#'>Tăng tương tác</a>
                  </h3>
                  <div className='text'>
                    Các sinh viên đều có thể thả cảm xúc cho các bài viết hoặc bình luận cho các bài viết mà mình quan
                    tâm
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='blog-post-thumb'>
                <div className='img'>
                  <img src='assets/images/baomat.png' alt='' />
                </div>
                <div className='blog-content'>
                  <h3>
                    <a href='#'>Thay đổ thông tin tài khoản</a>
                  </h3>
                  <div className='text'>
                    Mỗi sinh viên đều có một tài khoản cá nhân. Để tránh trường hợp kẻ xấu lợi dụng tài khoản, sinh viên
                    có thể thay đổi thông tin để tăng cường bảo mật.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog End */}

      {/* Footer Start */}
      <footer>
        <div className='container' id='footer'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <ul className='social'>
                <li>
                  <a href='#'>
                    <i className='fa fa-twitter'>
                      <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                    </i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fa fa-twitter'>
                      <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                    </i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fa fa-linkedin'>
                      <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                    </i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fa fa-rss'>
                      <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </i>
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fa fa-dribbble'>
                      <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <p className='textBottom'>TDC Network Social - Design: Minh Trieu</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
