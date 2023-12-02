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
import { DETAILS_JOB_APPLY, JOB_APPLY_PAGE } from '../constants/Page'
import { slugify } from '../utils/CommonUtls'
import Loading from '../components/common/Loading'
import { useGetJobProfileQuery } from '../redux/Service'

export default function ManagementJobApplyPage() {
  const dataType = [
    { label: 'Đã nhận', value: 'received' },
    { label: 'Đang xử lý', value: 'in_progress' },
    { label: 'Xem xét', value: 'not_meet_standard_quality' },
    { label: 'Phỏnrg vấn', value: 'interview' },
    {
      label: 'Phỏng vấn thất bại',
      value: 'interview_not_meet_standard_quality'
    },
    { label: 'Nhận việc', value: 'accept' }
  ]

  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigate = useNavigate()
  const { data, isLoading } = useGetJobProfileQuery(userLogin?.id, {
    pollingInterval: 1000
  })
  const [value, setValue] = useState('received')
  const [item, setItem] = useState('Đã nhận')

  const handleUpdateCv = (username: string, profileId: number) => {
    navigate(`${JOB_APPLY_PAGE}/${slugify(username)}-${profileId}`)
  }
  const handleDeleteCv = (profileId: number) => {
    axios
      .delete(SERVER_ADDRESS + `api/job/profile/${profileId}`)
      .then((response) => {
        alert('Hủy hồ sơ thành công')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleGetDetailJobApply = (jobTitle: string, cvID: number) => {
    navigate(`${DETAILS_JOB_APPLY}/${slugify(jobTitle)}-${cvID}`)
  }

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
                  onChange={(e) => {
                    setValue(e.target.value)
                    setItem(e.target.value)
                  }}
                >
                  <option hidden value={value}>
                    {item}
                  </option>
                  {dataType.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {isLoading ? (
                  <div className='ml-[-320px] mt-[-100px] flex h-screen items-center justify-center'>
                    <Loading />
                  </div>
                ) : (
                  <div className='card-body p-lg-5 w-100 border-0 p-2'>
                    {data?.data.map((item, index) =>
                      item.status == value ? (
                        <div className='manage-item-job-apply' key={index}>
                          <div className='tam'>
                            <div className='img-job-apply'>
                              {item.companyName == '' ? (
                                <DefaultAvatar
                                  name={item.companyName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                  size={80}
                                  styleBootstrap={'defaultImage'}
                                />
                              ) : (
                                <img
                                  src={item.companyAvatar ? SERVER_ADDRESS + 'api/images/' + item.companyAvatar : ''}
                                  className='avatar p-0'
                                />
                              )}
                            </div>
                            <div className='content-job-apply'>
                              <h1 className='fw-900 title text-black'>Tuyển cộng tác viên bán hàng</h1>
                              <h1 className='fw-900 title text-black'>
                                {item.companyName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                              </h1>
                              <div className='datetime'>
                                <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                                <p className='fw-600 mb-0 ms-2'>{formatDateTime(item.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                          <div className='btnBottom'>
                            <button type='button' onClick={() => handleGetDetailJobApply(item.jobTitle, item.id)}>
                              <p className='txtBtnBottom'>Xem cv</p>
                            </button>
                            {item.status != 'received' ? (
                              ''
                            ) : (
                              <button type='button' onClick={() => handleUpdateCv(item.jobTitle, item.id)}>
                                <p className='txtBtnBottom'>Chỉnh sửa cv</p>
                              </button>
                            )}
                            {item.status == 'accept' ? (
                              ''
                            ) : (
                              <button type='button' onClick={() => handleDeleteCv(item.id)}>
                                <p className='txtBtnBottom'>Hủy cv</p>
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        ''
                      )
                    )}
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
