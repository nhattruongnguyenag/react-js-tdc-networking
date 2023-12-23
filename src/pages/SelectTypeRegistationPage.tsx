import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import '../assets/css/login.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { REGISTER_BUSINESS_PAGE, REGISTER_STUDENT_PAGE } from '../constants/Page'
import { useTranslation } from 'react-multi-lang'

export default function SelectTypeRegistationPage() {
  const t = useTranslation()
  const data = [
    { name: t('RegisterComponent.typeStudent'), value: '1' },
    { name: t('RegisterComponent.typeBusiness'), value: '2' }
  ]
  const navigate = useNavigate()
  const [dataRegister, setDataRegister] = useState()
  const changeData = (event: any) => {
    setDataRegister(event)
  }
  const onSubmit = () => {
    if (dataRegister == '1') {
      navigate(REGISTER_STUDENT_PAGE)
    } else if (dataRegister == '2') {
      navigate(REGISTER_BUSINESS_PAGE)
    } else {
      toast.warning(t('RegisterComponent.warningSelectedType'))
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
            <button className='nav-menu me-0 ms-auto'></button>
          </div>
        </div>

        <div className='row'>
          <div
            className='col-xl-5 d-none d-xl-block vh-100 bg-image-cover bg-no-repeat p-0'
            style={{
              backgroundImage: `url("/assets/images/login-bg-2.jpg")`
            }}
          ></div>
          <div className='col-xl-7 vh-100 align-items-center d-flex rounded-3 overflow-hidden bg-white'>
            <div className='login-card me-auto ms-auto border-0 shadow-none'>
              <div className='card-body rounded-0 text-left'>
                <h2 className='fw-700 display1-size display2-md-size mb-4 text-center'>{t('RegisterComponent.titleSelectedType')}</h2>
                <select
                  className='style2-input form-control selecttype text-grey-900 font-xsss fw-600 pe-5 ps-5 text-center'
                  value={dataRegister}
                  onChange={(e) => changeData(e.target.value)}
                >
                  <option hidden>{t('RegisterComponent.selectedType')}</option>
                  {data.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className='group'>
                  <button className='btnSelect' onClick={() => navigate('/')}>
                    <FaAngleDoubleLeft />
                    <h4>{t('RegisterComponent.goBack')}</h4>
                  </button>

                  <button className='btnSelect' onClick={() => onSubmit()}>
                    <h4>{t('RegisterComponent.continute')}</h4>
                    <FaAngleDoubleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
