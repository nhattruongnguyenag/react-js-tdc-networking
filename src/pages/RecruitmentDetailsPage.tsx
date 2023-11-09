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
import { Item } from 'react-photoswipe-gallery'

export default function RecruitmentDetailsPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const [dataRecruitmentDetail, setDataRecruitmentDetail] = useState({
    salary: '',
    expiration: '',
    location: '',
    employmentType: '',
    benefit: '',
    description: '',
    requirement: '',
    title: ''
  })
  const [result, setResult] = useState([dataRecruitmentDetail.benefit])
  const [description, setDescription] = useState([dataRecruitmentDetail.description])
  const [requirement, setRequirement] = useState([dataRecruitmentDetail.requirement])
  useEffect(() => {
    if (postId) {
      axios
        .get(SERVER_ADDRESS + `api/posts/recruitment/${postId}`)
        .then((recruitment) => {
          setDataRecruitmentDetail(recruitment.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [postId])
  const onSubmit = (title: string, postID: number | null) => {
    navigate(`${JOB_APPLY_PAGE}/${slugify(title)}-${postID}`)
  }

  useEffect(() => {
    setResult(dataRecruitmentDetail.benefit.split(','))
    setDescription(dataRecruitmentDetail.description.split(','))
    setRequirement(dataRecruitmentDetail.requirement.split(','))
  }, [dataRecruitmentDetail.benefit, dataRecruitmentDetail.description, dataRecruitmentDetail.requirement])

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
                      <p className='ml-4'>{dataRecruitmentDetail.title}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Hình thức tuyển dụng</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faBriefcase} color={COLOR_GREY} />
                      <p className='ml-4'>{dataRecruitmentDetail.employmentType}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Lương</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faMoneyCheckDollar} color={COLOR_GREY} />
                      <p className='ml-4'>{formatVietNamCurrency(dataRecruitmentDetail.salary)} vnd</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Thời hạn ứng tuyển</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faClock} color={COLOR_GREY} />
                      <p className='ml-4'>{formatDateTime(dataRecruitmentDetail.expiration)}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                  <div className='item'>
                    <h2 className='fw-700 text-black'>Địa chỉ làm việc</h2>
                    <div className='item-job-recruitment'>
                      <FontAwesomeIcon icon={faMapLocation} color={COLOR_GREY} />
                      <p className='ml-4'>{dataRecruitmentDetail.location}</p>
                    </div>
                    <div className='border'></div>
                  </div>
                </div>
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Phúc lợi</h1>
                  <div className='benefit'>
                    {result.map((item, index) => (
                      <div className='item-recruitment' key={index}>
                        <p className='fw-500'>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Mô tả công việc</h1>
                  {description.map((item, index) => (
                    <div className='item-recruitment-description' key={index}>
                      <p className='fw-500 text-black'>{item.replace(/(^|\s)\S/g, l=> l.toUpperCase())}</p>
                    </div>
                  ))}
                </div> 
                <div className='group-recruitment-content'>
                  <h1 className='fw-700 fs-3 pt-3 text-black'>Yêu cầu</h1>
                  {requirement.map((item, index) => (
                    <div className='item-recruitment-description' key={index}>
                      <p className='fw-500 text-black'>{item.replace(/(^|\s)\S/g, l=> l.toUpperCase())}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='btn-recuitment mb-0'>
                <button
                  type='button'
                  className='font-xsss fw-600 w175 bg-recruitment mt-3 p-3 text-center text-white'
                  onClick={() => onSubmit(dataRecruitmentDetail.title, postId)}
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
