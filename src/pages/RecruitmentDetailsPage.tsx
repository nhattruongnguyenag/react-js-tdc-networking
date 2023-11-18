import React, { useEffect, useState } from 'react'
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
import {
  TEXT_BENEFIT,
  TEXT_BTN_APPLY_JOB,
  TEXT_DESCRIPTION_JOB,
  TEXT_EMPLOYMENTTYPE,
  TEXT_EXPIRATION,
  TEXT_LOCATION,
  TEXT_REQUIREMENT_JOB,
  TEXT_SALARY,
  TEXT_TITLE_RECRUITMENT,
  TEXT_TITLE_RECRUITMENT_DETAIL
} from '../constants/StringVietnamese'
import Loading from '../components/common/Loading'

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
    title: ''
  })
  const [result, setResult] = useState([data.benefit])
  const [description, setDescription] = useState([data.description])
  const [requirement, setRequirement] = useState([data.requirement])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axios
        .get(SERVER_ADDRESS + `api/posts/recruitment?postId=${postId}&&userLogin=${userLogin?.id}`)
        .then((recruitment) => {
          setIsLoading(false)
          setData(recruitment.data.data)
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }
  }, [postId])

  const handleBtnJobApply = (title: string, postID: number | null) => {
    navigate(`${JOB_APPLY_PAGE}/${slugify(title)}-${postID}`)
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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{TEXT_TITLE_RECRUITMENT_DETAIL}</h4>
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
                      <h2 className='fw-700 text-black'>{TEXT_TITLE_RECRUITMENT}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faRankingStar} color={COLOR_GREY} />
                        <p className='ml-4 mb-0'>{data.title}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{TEXT_EMPLOYMENTTYPE}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faBriefcase} color={COLOR_GREY} />
                        <p className='ml-4 mb-0'>{data.employmentType}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{TEXT_SALARY}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} color={COLOR_GREY} />
                        <p className='ml-4 mb-0'>{formatVietNamCurrency(data.salary)} vnd</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{TEXT_EXPIRATION}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                        <p className='ml-4 mb-0'>{formatDateTime(data.expiration)}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                    <div className='item'>
                      <h2 className='fw-700 text-black'>{TEXT_LOCATION}</h2>
                      <div className='item-job-recruitment'>
                        <FontAwesomeIcon icon={faMapLocation} color={COLOR_GREY} />
                        <p className='ml-4 mb-0'>{data.location}</p>
                      </div>
                      <div className='border'></div>
                    </div>
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{TEXT_BENEFIT}</h1>
                    <div className='benefit'>
                      {result
                        .filter((item) => item !== '')
                        .map((item, index) => (
                          <div className='item-recruitment' key={index}>
                            <p className='fw-500 mb-0'>{item}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{TEXT_DESCRIPTION_JOB}</h1>
                    {description
                      .filter((item) => item !== '')
                      .map((item, index) => (
                        <div className='item-recruitment-description' key={index}>
                          <p className='fw-500 text-black'>{item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}</p>
                        </div>
                      ))}
                  </div>
                  <div className='group-recruitment-content'>
                    <h1 className='fw-700 fs-3 pt-3 text-black'>{TEXT_REQUIREMENT_JOB}</h1>
                    {requirement
                      .filter((item) => item !== '')
                      .map((item, index) => (
                        <div className='item-recruitment-description' key={index}>
                          <p className='fw-500 text-black'>{item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}</p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='btn-recuitment mb-0'>
                  <button
                    type='button'
                    className='font-xsss fw-600 w175 bg-recruitment mt-3 p-3  text-center text-white'
                    onClick={() => handleBtnJobApply(data.title, postId)}
                  >
                    {TEXT_BTN_APPLY_JOB}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
