import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import '../style/login.css'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const data = [
  { name: 'Sinh viên', value: '1' },
  { name: 'Doanh nghiệp', value: '2' }
]
export default function SelectTypeRegistationPage() {
  const navigate = useNavigate()
  const [dataRegister, setDataRegister] = useState()
  const changeData = (event: any) => {
    setDataRegister(event)
  }
  const onSubmit = () => {
    if (dataRegister == '1') {
      navigate('/dang-ky-sinh-vien')
    } else if (dataRegister == '2') {
      navigate('/dang-ky-doanh-nghiep')
    } else {
      toast.warning('Hãy chọn hình thức đăng ký')
    }
  }
  return (
    <Fragment>
      <div className='main-wrap'>
        <div className='nav-header border-0 bg-transparent shadow-none'>
          <div className='nav-top w-100'>
            <a href='/'>
              <i className='feather-zap text-success display1-size me-2 ms-0'> </i>
              <span className='d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text mb-0 text-current'>
                TDCer.
              </span>
            </a>
            <button className='nav-menu me-0 ms-auto'> </button>
          </div>
        </div>

        <div className='row'>
          <div
            className='col-xl-5 d-none d-xl-block vh-100 bg-image-cover bg-no-repeat p-0'
            style={{
              backgroundImage: `url("assets/images/login-bg-2.jpg")`
            }}
          ></div>
          <div className='col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden bg-white'>
            <div className='card login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h2 className='fw-700 display1-size display2-md-size mb-4 text-center'> Chọn vai trò </h2>
                <select
                  className='style2-input form-control font-xsss fw-600 pt-0 text-center'
                  value={dataRegister}
                  onChange={(e) => changeData(e.target.value)}
                >
                  <option hidden>---Lựa chọn hình thức đăng ký---</option>
                  {data.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className='group'>
                  <button className='btnSelect' onClick={() => navigate('/')}>
                    <FaAngleDoubleLeft />
                    <h4>Quay lại</h4>
                  </button>

                  <button className='btnSelect' onClick={() => onSubmit()}>
                    <h4>Tiếp tục</h4>
                    <FaAngleDoubleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} transition={Slide} position='top-right' />
    </Fragment>
  )
}
