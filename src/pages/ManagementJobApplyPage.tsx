import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate } from 'react-router-dom'
import '../assets/css/managejobapply.css'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppSelector } from '../redux/Hook'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { formatDateTime } from '../utils/FormatTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { COLOR_GREY } from '../constants/Color'
import { DETAILS_JOB_APPLY } from '../constants/Page'
import { slugify } from '../utils/CommonUtls'
import Loading from '../components/common/Loading'

const dataType = [
  { name: 'Đang chờ', value: '1' },
  { name: 'Trong tiến trình', value: '2' },
  { name: 'Không đủ điều kiện phỏng vấn', value: '3' },
  { name: 'Phỏng vấn', value: '4' },
  { name: 'Không đậu phỏng vấn', value: '5' },
  { name: 'Nhận việc', value: '6' }
]

export default function ManagementJobApplyPage() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [dataJob, setDataJob] = useState([
    {
      id: 0,
      createdAt: '',
      post: {
        id: 0,
        user: {
          name: '',
          image: ''
        }
      }
    }
  ])

  const handleClickType = (flag: string) => {
    switch (flag) {
      case 'Đang chờ':
        handleShowJobWaiting()
        break
      case 'Trong tiến trình':
        handleShowJobUnconditional()
        break
      case 'Không đủ điều kiện phỏng vấn':
        handleShowJobEligible()
        break
      case 'Phỏng vấn':
        handleShowJobInterview()
        break
      case 'Không đậu phỏng vấn':
        handleShowJobNotInterview()
        break
      case 'Nhận việc':
        handleShowJobAccept()
        break
      default:
        return ''
    }
  }

  const handleShowJobWaiting = () => {
    axios
      .get(SERVER_ADDRESS + `api/job/user/${userLogin?.id}`)
      .then((response) => {
        console.log(JSON.stringify(response.data.data))
        console.log(response.data.data)
        setDataJob(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log('Đang chờ')
  }
  const handleShowJobUnconditional = () => {
    console.log('Trong tiến trình')
  }
  const handleShowJobEligible = () => {
    console.log('Không đủ điều kiện phỏng vấn')
  }
  const handleShowJobInterview = () => {
    console.log('Phỏng vấn')
  }
  const handleShowJobNotInterview = () => {
    console.log('Không đậu phỏng vấn')
  }
  const handleShowJobAccept = () => {
    console.log('Nhận việc')
  }
  const handleBtnJobApply = (username: string, cvID: number) => {
    navigate(`${DETAILS_JOB_APPLY}/${slugify(username)}-${cvID}`)
  }

  useEffect(() => {
    setIsLoading(true)
    handleClickType('Đang chờ')
    setIsLoading(false)
  }, [])
  return (
    <>
      <Header />
      <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body w-100 d-flex rounded-3 bg-recruitment border-0 p-4'>
                  <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                    <i className='ti-arrow-left font-sm text-white' />
                  </button>
                  <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Quản lý hồ sơ ứng tuyển</h4>
                </div>
                <select
                  className='style2-input form-control selectType pe-5 ps-5'
                  onChange={(e) => handleClickType(e.target.value)}
                >
                  <option hidden>Quản lý</option>
                  {dataType.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {isLoading ? (
                  <div className='ml-[-320px] mt-[-100px] flex h-screen items-center justify-center'>
                    <Loading />
                  </div>
                ) : (
                  <div className='card-body p-lg-5 w-100 border-0 p-2'>
                    {dataJob.map((item, index) => (
                      <div className='manage-item-job-apply' key={index}>
                        <div className='tam'>
                          <div className='img-job-apply'>
                            {item.post.user.image == '' ? (
                              <DefaultAvatar
                                name={item.post.user.name.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                size={80}
                                styleBootstrap={'defaultImage'}
                              />
                            ) : (
                              <img
                                src={item.post.user.image ? SERVER_ADDRESS + 'api/images/' + item.post.user.image : ''}
                                className='avatar p-0'
                              />
                            )}
                          </div>
                          <div className='content-job-apply'>
                            <h1 className='fw-900 title text-black'>Tuyển cộng tác viên bán hàng</h1>
                            <h1 className='fw-900 title text-black'>
                              {item.post.user.name.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </h1>
                            <div className='datetime'>
                              <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                              <p className='fw-600 mb-0 ms-2'>{formatDateTime(item.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className='btnBottom'>
                          <button type='button' onClick={() => handleBtnJobApply('son', 1)}>
                            <p className='txtBtnBottom'>Xem cv</p>
                          </button>
                          <button type='button'>
                            <p className='txtBtnBottom'>Chỉnh sửa cv</p>
                          </button>
                          <button type='button'>
                            <p className='txtBtnBottom'>Hủy cv</p>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
