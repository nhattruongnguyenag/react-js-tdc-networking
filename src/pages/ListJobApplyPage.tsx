import React, { Fragment, useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFilePdf, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { getIdFromSlug, slugify } from '../utils/CommonUtls'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { formatDateTime } from '../utils/FormatTime'
import { toast } from 'react-toastify'
import Loading from '../components/common/Loading'
import { DETAILS_JOB_APPLY } from '../constants/Page'
import { useTranslation } from 'react-multi-lang'

export default function ListJobApplyPage() {
  const t = useTranslation()
  const navigate = useNavigate()
  const [listJob, setListJob] = useState([
    {
      id: 0,
      createdAt: '',
      user: {
        image: '',
        name: '',
        phone: '',
        email: ''
      },
      cvUrl: ''
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')

  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axios
        .get(SERVER_ADDRESS + 'api/job/post/' + postId)
        .then((response) => {
          setIsLoading(false)
          setListJob(response.data.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }
  }, [postId])

  useEffect(() => {
    if (listJob.length == 0) {
      navigate(-1)
      toast(t('ListJobApplyComponent.listEmpty'))
    }
  })
  const handleBtnJobApply = (username: string, cvID: number) => {
    navigate(`${DETAILS_JOB_APPLY}/${slugify(username)}-${cvID}`)
  }

  return (
    <Fragment>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 bg-recruitment border-0 p-4'>
              <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                <i className='ti-arrow-left font-sm text-white' />
              </button>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{t('ListJobApplyComponent.titleListJobApply')}</h4>
            </div>
            {isLoading ? (
              <div className='ml-[-320px] mt-[-100px] flex h-screen items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <div className='card-body p-lg-5 w-100 border-0 p-2'>
                {listJob.map((item, index) => (
                  <div className='item-job-apply' key={index}>
                    <div className='tam'>
                      <div className='img-job-apply'>
                        {item.user.image == '' ? (
                          <DefaultAvatar
                            name={item.user.name.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            size={80}
                            styleBootstrap={'defaultImage'}
                          />
                        ) : (
                          <img
                            src={item.user.image ? SERVER_ADDRESS + 'api/images/' + item.user.image : ''}
                            className='avatar p-0'
                            alt='avatar'
                          />
                        )}
                      </div>
                      <div className='content-job-apply'>
                        <h1 className='fw-900 text-black title'>
                          {item.user.name.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                        </h1>
                        <div className='item-job'>
                          <FontAwesomeIcon icon={faPhoneVolume} />
                          {item.user.phone === null ? (
                            <p className='fw-500 ms-2 mb-0 text-black'>{t('ListJobApplyComponent.updateNull')}</p>
                          ) : (
                            <p className='fw-500 ms-2 mb-0 text-black'>{item.user.phone}</p>
                          )}
                        </div>
                        <div className='item-job'>
                          <FontAwesomeIcon icon={faEnvelope} />
                          <p className='fw-500 txt ms-2 mb-0 text-black'>{item.user.email}</p>
                        </div>
                        <div className='item-job'>
                          <FontAwesomeIcon icon={faFilePdf} />
                          <button
                            type='button'
                            className='txt text-green ms-2'
                            onClick={() => handleBtnJobApply(item.user.name, item.id)}
                          >
                            {t('ListJobApplyComponent.seeDetailCV')}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='date'>
                      <p className='fw-600 mb-0'>{formatDateTime(item.createdAt)}</p>
                      <a className='download' href={SERVER_ADDRESS + 'api/files/' + item.cvUrl} download={item.cvUrl}>
                        {t('ListJobApplyComponent.titleDownloadCv')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}