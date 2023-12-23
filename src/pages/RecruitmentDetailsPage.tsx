import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/common/Header'
import { JOB_APPLY_PAGE } from '../constants/Page'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/css/login.css'
import { getIdFromSlug, slugify } from '../utils/CommonUtls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLOR_GREY } from '../constants/Color'
import {
  faBriefcase,
  faClock,
  faMapLocation,
  faMoneyCheckDollar,
  faRankingStar
} from '@fortawesome/free-solid-svg-icons'
import { formatVietNamCurrency } from '../utils/FormatCurrency'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { formatDateTime } from '../utils/FormatTime'
import { useAppSelector } from '../redux/Hook'
import Loading from '../components/common/Loading'
import { isStudent } from '../utils/UserHelper'
import { toast } from 'react-toastify'
import { t } from 'react-multi-lang'
import moment from 'moment'

export default function RecruitmentDetailsPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [data, setData] = useState({
    salary: '',
    expiration: '',
    location: '',
    employmentType: '',
    benefit: '',
    description: '',
    requirement: '',
    title: '',
    isApplyJob: 0,
    active: 0
  })
  const [result, setResult] = useState([data.benefit])
  const [description, setDescription] = useState([data.description])
  const [requirement, setRequirement] = useState([data.requirement])
  const [isLoading, setIsLoading] = useState(false)
  const check = useMemo(() => {
    if (moment().isBefore(data.expiration)) {
      return false
    } else {
      return true
    }
  }, [postId, data.expiration])

  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axios
        .get(SERVER_ADDRESS + `api/posts/search?postId=${postId}&&userLogin=${userLogin?.id}`)
        .then((recruitment) => {
          setIsLoading(false)
          if (recruitment.data.data && recruitment.data.data.length !== 0) {
            setData(recruitment.data.data[0])
          }
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }
  }, [postId])

  const handleBtnJobApply = (title: string, postID: number | null) => {
    if (!isStudent(userLogin)) {
      toast.warning(t('RecuitmentPostDetailComponent.textNoApply'))
    } else if (data.isApplyJob === 1) {
      toast(t('RecuitmentPostDetailComponent.textApplied'))
    } else {
      navigate(`${JOB_APPLY_PAGE}/${slugify(title)}-${postID}`)
    }
  }

  useEffect(() => {
    setResult(data.benefit.split(','))
    setDescription(data.description.split(','))
    setRequirement(data.requirement.split(','))
  }, [data.benefit, data.description, data.requirement])

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='middle-wrap'>
          <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
            <div className='card-body w-100 d-flex rounded-3 bg-recruitment border-0 p-4'>
              <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                <i className='ti-arrow-left font-sm text-white' />
              </button>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{t('ToolbarTitle.recruitmentDetailScreen')}</h4>
            </div>
            {isLoading ? (
              <div className='ml-[-320px] mt-[-100px] flex h-screen items-center justify-center'>
                <Loading />
              </div>
            ) : (
              <div className='card-body p-lg-5 w-100 border-0 p-2'>
                <div className='row'>
                  <div className='group-recruitment'>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{t('RecuitmentPostDetailComponent.titleJob')}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faRankingStar} color={COLOR_GREY} />
                        <p className='text-p mb-0 ml-4'>{data.title}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{t('RecuitmentPostDetailComponent.employeType')}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faBriefcase} color={COLOR_GREY} />
                        <p className='text-p mb-0 ml-4'>{data.employmentType}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{t('RecuitmentPostDetailComponent.salary')}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} color={COLOR_GREY} />
                        <p className='text-p mb-0 ml-4'>
                          {formatVietNamCurrency(data.salary)} {t('RecuitmentPostDetailComponent.salaryUnitMonth')}
                        </p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{t('RecuitmentPostDetailComponent.expiration')}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                        <p className='text-p mb-0 ml-4'>{formatDateTime(data.expiration)}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{t('RecuitmentPostDetailComponent.location')}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faMapLocation} color={COLOR_GREY} />
                        <p className='text-p mb-0 ml-4'>{data.location}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{t('RecuitmentPostDetailComponent.benefit')}</h1>
                    <div className='benefit'>
                      {result
                        .filter((item) => item !== '')
                        .map((item, index) => (
                          <div className='item-recruitment' key={index}>
                            <p className='fw-500 text-p mb-0'>{item}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{t('RecuitmentPostDetailComponent.descriptionJob')}</h1>
                    {description
                      .filter((item) => item !== '')
                      .map((item, index) => (
                        <div className='item-recruitment-description' key={index}>
                          <p className='fw-500 text-p text-black'>
                            {item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{t('RecuitmentPostDetailComponent.requipmentJob')}</h1>
                    {requirement
                      .filter((item) => item !== '')
                      .map((item, index) => (
                        <div className='item-recruitment-description' key={index}>
                          <p className='fw-500 text-p text-black'>
                            {item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                {
                  (data.active !== 0 && data.active !== 2) && 
                  <div className='btn-recuitment mb-0'>
                    <button
                      disabled={check}
                      type='button'
                      style={{ opacity: check ? 0.5 : 1 }}
                      className='font-xsss fw-600 bg-recruitment mt-3 p-3  text-center text-white'
                      onClick={() => handleBtnJobApply(data.title, postId)}
                    >
                      {t('RecuitmentPostDetailComponent.btnApplyJob')}
                    </button>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
