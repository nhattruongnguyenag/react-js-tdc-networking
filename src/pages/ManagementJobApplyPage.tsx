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
import { COLOR_GREY, COLOR_SUCCESS } from '../constants/Color'
import { DETAILS_JOB_APPLY, JOB_APPLY_PAGE } from '../constants/Page'
import { slugify } from '../utils/CommonUtls'
import Loading from '../components/common/Loading'
import { useGetJobProfileQuery } from '../redux/Service'
import { CVURL, PROFILE_ID } from '../constants/KeyValue'
import { t } from 'react-multi-lang'
import Select from 'react-select'
import { toast } from 'react-toastify'
let md5 = require('md5')

export default function ManagementJobApplyPage() {
  const dataType = [
    { label: t('ManageJobApply.textReceived'), value: 'received' },
    { label: t('ManageJobApply.textIn_progress'), value: 'in_progress' },
    { label: t('ManageJobApply.textNot_meet_standard_quality'), value: 'not_meet_standard_quality' },
    { label: t('ManageJobApply.textInterview'), value: 'interview' },
    {
      label: t('ManageJobApply.textInterview_not_meet_standard_quality'),
      value: 'interview_not_meet_standard_quality'
    },
    { label: t('ManageJobApply.textAccept'), value: 'accept' }
  ]

  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigate = useNavigate()
  const { data, isLoading } = useGetJobProfileQuery(userLogin?.id, {
    pollingInterval: 1000
  })
  const [value, setValue] = useState('received')
  const [item, setItem] = useState(t('ManageJobApply.textReceived'))

  const handleUpdateCv = (username: string, profileId: number, cvUrl: string) => {
    sessionStorage.setItem(PROFILE_ID, profileId.toString())
    sessionStorage.setItem(CVURL, cvUrl)
    navigate(`${JOB_APPLY_PAGE}/${slugify(username)}-${profileId}`)
  }
  const handleDeleteCv = (profileId: number) => {
    axios
      .delete(SERVER_ADDRESS + `api/job/profile/${profileId}`)
      .then((response) => {
        toast(t('ManageJobApply.textDeleteSucces'))
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
      <div className='main-content vh-100 overflow-hidden bg-lightblue theme-dark-bg'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body w-100 d-flex rounded-3 bg-recruitment border-0 p-4 theme-dark-bg'>
                  <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                    <i className='ti-arrow-left font-sm text-white' />
                  </button>
                  <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{t('ManageJobApply.manageJobApply')}</h4>
                </div>
                <Select
                  className='theme-dark-bg'
                  defaultValue={dataType[0]}
                  options={dataType}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  onChange={(item) => {
                    setValue(item?.value ?? '')
                    setItem(item?.label ?? '')
                  }}
                />

                {isLoading ? (
                  <div className='ml-[-320px] mt-[-100px] flex h-screen items-center justify-center'>
                    <Loading />
                  </div>
                ) : data?.data.length == 0 ? (
                  <div className='mt-3 text-center'>
                    <p className='fw-600 text-black'>{t('ManageJobApply.textListJobNull')}</p>
                  </div>
                ) : (
                  <div className='card-body p-lg-5 manage border-0 p-2'>
                    {data?.data.map(
                      (item, index) =>
                        item.status === value && (
                          <div className='manage-item-job-apply theme-dark-bg' key={md5(index + item.id)}>
                            <div className='tam'>
                              <div className='img-job-apply'>
                                {item.companyAvatar == null ? (
                                  <DefaultAvatar
                                    name={item.companyName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                    size={80}
                                    styleBootstrap={'defaultImage'}
                                  />
                                ) : (
                                  <img
                                    src={item.companyAvatar ? SERVER_ADDRESS + 'api/images/' + item.companyAvatar : ''}
                                    className='rounded-full w-14 h-14'
                                    alt='companyAvatar'
                                  />
                                )}
                              </div>
                              <div className='content-job-apply'>
                                <h1 className='fw-900 title text-p text-black'>{item.jobTitle}</h1>
                                <h2 className='fw-900 title text-black'>
                                  {item.companyName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                </h2>
                                <div className='datetime'>
                                  <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                                  <p className='fw-600 text-p mb-0 ms-2'>{formatDateTime(item.createdAt)}</p>
                                </div>
                              </div>
                            </div>
                            <div className='btnBottom'>
                              <button type='button' onClick={() => handleGetDetailJobApply(item.jobTitle, item.id)} className='txt text-green download ms-4'>
                               {t('ManageJobApply.textSeeCv')}
                              </button>
                              {item.status === 'received' && (
                                <button
                                  type='button'
                                  onClick={() => handleUpdateCv(item.jobTitle, item.id, item.cvUrl)}
                                  className='txt text-green download ms-4'
                                >
                                  {t('ManageJobApply.textChangeProfile')}
                                </button>
                              )}
                              {item.status !== 'accept' && (
                                <button type='button' onClick={() => handleDeleteCv(item.id)} className='txt text-green download ms-4'>
                                  {t('ManageJobApply.textDelete')}
                                </button>
                              )}
                            </div>
                          </div>
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
