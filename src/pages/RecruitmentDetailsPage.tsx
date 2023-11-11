import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { BUSINESS_DASHBOARD_PAGE, JOB_APPLY_PAGE } from '../constants/Page'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../style/login.css'
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

export default function RecruitmentDetailsPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  console.log(SERVER_ADDRESS + `api/posts/recruitment?postId=${postId}&&userLogin=${userLogin?.id}`);
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

  

  useEffect(() => {
    if (postId) {
      axios
        .get(SERVER_ADDRESS + `api/posts/recruitment?postId=${postId}&&userLogin=${userLogin?.id}`)
        .then((recruitment) => {
          setData(recruitment.data.data)
          console.log(`id : ${postId} + ${userLogin?.id}`)
        })
        .catch((error) => {
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
              <Link className='d-inline-block mt-2' to={BUSINESS_DASHBOARD_PAGE}>
                <i className='ti-arrow-left font-sm text-white' />
              </Link>
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Chi tiết tuyển dụng</h4>
            </div>
            <div className='card-body p-lg-5 w-100 border-0 p-2'>
              <div className='row'>
                <div className='group-recruitment'>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Vị trí tuyển dụng</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faRankingStar} color={COLOR_GREY} />
                      <p className='ml-4'>{data.title}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Hình thức tuyển dụng</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faBriefcase} color={COLOR_GREY} />
                      <p className='ml-4'>{data.employmentType}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Lương</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faMoneyCheckDollar} color={COLOR_GREY} />
                      <p className='ml-4'>{formatVietNamCurrency(data.salary)} vnd</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Thời hạn ứng tuyển</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                      <p className='ml-4'>{formatDateTime(data.expiration)}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Địa chỉ làm việc</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faMapLocation} color={COLOR_GREY} />
                      <p className='ml-4'>{data.location}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                </div>
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Phúc lợi</h1>
                  <div className='benefit'>
                    {result
                      .filter((item) => item !== '')
                      .map((item, index) => (
                        <div className='item-recruitment' key={index}>
                          <p className='fw-500'>{item}</p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Mô tả công việc</h1>
                  {description
                    .filter((item) => item !== '')
                    .map((item, index) => (
                      <div className='item-recruitment-description' key={index}>
                        <p className='fw-500 text-black'>{item.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}</p>
                      </div>
                    ))}
                </div>
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Yêu cầu</h1>
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
                  className='font-xsss fw-600 w175 bg-recruitment mt-3 p-3 text-center text-white'
                  onClick={() => handleBtnJobApply(data.title, postId)}
                >
                  Nộp đơn ứng tuyển
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
