import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub, faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function DetailIntroducePage() {
  return (
    <div>
      {/* Header Area Start  */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* Logo Start  */}
                <a href="#" className="logo">
                  <img src="assets/images/logo_tdc_network.png" alt="TDC Network Social" className="logo" />
                </a>
                {/* Logo End  */}
                {/* Menu Start  */}
                <ul className="nav">
                  <li><a href="#welcome" className="active">Trang chủ</a></li>
                  <li><a href="#features">Tổng quan</a></li>
                  <li><a href="#blog">Các chức năng phụ</a></li>
                  <li><a href="#blog">Đăng nhập</a></li>
                  <li><a href="#blog">Đăng kí</a></li>
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
      <div className="welcome-area" id="welcome">

        {/* Header Text Start  */}
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                <h1>Là <strong>cầu nối</strong> giúp mọi sinh viên và doanh nghiệp</h1>
                <p>Giúp sinh viên trao đổi kinh nghiệm, tìm hiểu được nhiều sự kiện của Khoa và trường.
                  <strong>Đặc biệt </strong> là tạo cơ hội cho nhiều sinh viên.</p>
                <a href="#features" className="main-button-slider">Khám phá nhiều hơn</a>
              </div>
            </div>
          </div>
        </div>
        {/* Header Text End */}
      </div>
      {/* Welcome Area End */}

      {/* Features Small Start */}
      <section className="section home-feature">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {/* Features Small Item Start */}
                <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                  <div className="features-small-item">
                    <div className="icon">
                      <a><img src="assets/images/list.png" alt="TDC Network Social" /></a>
                    </div>
                    <h5 className="features-title">Khảo sát chuyên ngành</h5>
                    <p>Trong nhóm của các Khoa có thể đưa ra nhiều bài khảo sát khác nhau</p>
                  </div>
                </div>
                {/* Features Small Item End */}

                {/* Features Small Item Start */}
                <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                  <div className="features-small-item">
                    <div className="icon">
                      <a><img src="assets/images/featured-item-01.png" alt="TDC Network Social" /></a>
                    </div>
                    <h5 className="features-title">Tuyển dụng sinh viên</h5>
                    <p>Trong một nhóm chung các Công ty có thể tuyển dụng nhiều sinh viên cho công ty</p>
                  </div>
                </div>
                {/* Features Small Item End */}

                {/* Features Small Item Start */}
                <div className="col-lg-4 col-md-6 col-sm-6 col-12"
                  data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                  <div className="features-small-item">
                    <div className="icon">
                      <a><img src="assets/images/chat_icon.png" alt="TDC Network Social" /></a>
                    </div>
                    <h5 className="features-title">Giao tiếp với nhau</h5>
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
      <section className="section padding-top-70 padding-bottom-0" id="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center"
              data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
              <img src="assets/images/chat.png" alt="App" className="rounded img-fluid d-block mx-auto" />
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
              <div className="left-heading">
                <h2 className="section-title">Giao tiếp với nhau</h2>
              </div>
              <div className="left-text">
                <p>Nullam sit amet purus libero. Etiam ullamcorper nisl ut augue blandit, at finibus leo
                  efficitur. Nam gravida purus non sapien auctor, ut aliquam magna ullamcorper.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="hr"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/* Features Big Item Start */}
      <section className="section padding-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
              <div className="left-heading">
                <h2 className="section-title">Tuyển dụng sinh viên</h2>
              </div>
              <div className="left-text">
                <p>Aenean pretium, ipsum et porttitor auctor, metus ipsum iaculis nisi, a bibendum lectus libero
                  vitae urna. Sed id leo eu dolor luctus congue sed eget ipsum. Nunc nec luctus libero. Etiam
                  quis dolor elit.</p>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big"
              data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
              <img src="assets/images/tuyen_dung.png" alt="App" className="rounded img-fluid d-block mx-auto" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/*  Features Big Item Start */}
      <section className="section padding-top-70 padding-bottom-0" id="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center"
              data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
              <img src="assets/images/khao_sat.png" alt="App" className="rounded img-fluid d-block mx-auto" />
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
              <div className="left-heading">
                <h2 className="section-title">Khảo sát chuyên ngành</h2>
              </div>
              <div className="left-text">
                <p>Nullam sit amet purus libero. Etiam ullamcorper nisl ut augue blandit, at finibus leo
                  efficitur. Nam gravida purus non sapien auctor, ut aliquam magna ullamcorper.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="hr"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Big Item End */}

      {/* Blog Start */}
      <section className="section" id="blog">
        <div className="container">
          {/* Section Title Start */}
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading">
                <h2 className="section-title">Các chức năng phụ</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6">
              <div className="center-text">
                <p>Integer molestie aliquam gravida. Nullam nec arcu finibus, imperdiet nulla vitae, placerat
                  nibh. Cras maximus venenatis molestie.</p>
              </div>
            </div>
          </div>
          {/* Section Title End */}

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-thumb">
                <div className="img">
                <img src="assets/images/blog-item-01.png" alt="" />
                </div>
                <div className="blog-content">
                  <h3>
                    <a href="#">Vivamus ac vehicula dui</a>
                  </h3>
                  <div className="text">
                    Cras aliquet ligula dui, vitae fermentum velit tincidunt id. Praesent eu finibus nunc.
                    Nulla in sagittis eros. Aliquam egestas augue.
                  </div>
                  <a href="#" className="main-button">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-thumb">
                <div className="img">
                <img src="assets/images/blog-item-02.png" alt="" />
                </div>
                <div className="blog-content">
                  <h3>
                    <a href="#">Phasellus convallis augue</a>
                  </h3>
                  <div className="text">
                    Aliquam commodo ornare nisl, et scelerisque nisl dignissim ac. Vestibulum finibus urna
                    ut velit venenatis, vel ultrices sapien mattis.
                  </div>
                  <a href="#" className="main-button">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-thumb">
                <div className="img">
                <img src="assets/images/blog-item-03.png" alt="" />
                </div>
                <div className="blog-content">
                  <h3>
                    <a href="#">Nam gravida purus non</a>
                  </h3>
                  <div className="text">
                    Maecenas eu erat vitae dui convallis consequat vel gravida nulla. Vestibulum finibus
                    euismod odio, ut tempus enim varius eu.
                  </div>
                  <a href="#" className="main-button">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog End */}

      {/* Footer Start */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ul className="social">
                <li><a href="#"><i className="fa fa-twitter"><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></i></a></li>
                <li><a href="#"><i className="fa fa-rss"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></i></a></li>
                <li><a href="#"><i className="fa fa-dribbble"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></i></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="textBottom">TDC Network Social - Design: Minh Trieu</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

}