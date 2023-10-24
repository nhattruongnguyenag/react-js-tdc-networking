import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons"; 
import { faYoutube, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function IntroducePage() {
  return (
    <div className='bg'>
      {/* navbar */}
      <div className="navbar">
        <button className='btnAll btn1'>Đăng kí ngay!</button>
        <button className='btnAll btn2'>Đăng nhập!</button>
      </div>
      {/* body */}
      <div>
        <div className="gif"></div>
        <div className="gif1"></div>
        <div className="gif2"></div>
        <div className="gif3"></div>
        <div className='logo'></div>
        <div className="tdc">TDC</div>
        <div className="tdc1">SOCIAL NETWORK</div>
        <div className="tdc2">Kết nối - Giao lưu</div>
        <div className="tdc2">Chia sẻ kinh nghiệm - Tìm kiếm doanh nghiệp</div>
        <button className='btn btn3'>Tìm hiểu ngay!</button>
      </div>
      {/* bottombar */}
      <div className="bottom">
        <div className="title">Chính sách Quyền riêng tư</div>
        <div className="title1">© 2035 bản quyền của Sắp ra mắt. Tự hào tạo ra với Wix.com</div>
        <FontAwesomeIcon icon={faYoutube} className="icon icon1"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faGithub} className="icon icon2"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faFacebook} className="icon icon3"></FontAwesomeIcon>
      </div>
    </div>
  );

}