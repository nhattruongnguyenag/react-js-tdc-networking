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
import {
  TEXT_NOTIFICATION_LIST_EMPTY,
  TEXT_NOTIFICATION_PHONE_NULL,
  TEXT_SEE_CV,
  TEXT_TITLE_DOWNLOAD_CV,
  TEXT_TITLE_LIST_JOB_APPLY
} from '../constants/StringVietnamese'
import { DETAILS_JOB_APPLY } from '../constants/Page'
import { useGetProfileApplyQuery, useJobApplyUpdateMutation } from '../redux/Service'
import { COLOR_SUCCESS } from '../constants/Color'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export interface JobApplyResponseData {
  status: string
  isOpen: boolean
}
const defaultModal: JobApplyResponseData = {
  status: 'received',
  isOpen: false
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export default function ListJobApplyPage() {
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
  const navigate = useNavigate()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const [value, setValue] = useState('received')
  const [item, setItem] = useState('Đã nhận')
  const [modalVisible, setModalVisible] = useState<JobApplyResponseData>(defaultModal)
  const [jobApplyUpdateRequest, jobApplyUpdateResponse] = useJobApplyUpdateMutation()
  const { data, isLoading } = useGetProfileApplyQuery(postId || -1, {
    pollingInterval: 1000
  })
  const openModal = (status: string) => {
    setModalVisible({
      status: status,
      isOpen: true
    })
  }

  const closeModal = () => {
    setModalVisible({
      status: 'received',
      isOpen: false
    })
  }

  useEffect(() => {
    if (data?.data.length == 0) {
      navigate(-1)
      toast(TEXT_NOTIFICATION_LIST_EMPTY)
    }
  })
  const handleBtnJobApply = (username: string, cvID: number) => {
    navigate(`${DETAILS_JOB_APPLY}/${slugify(username)}-${cvID}`)
  }

  const handleChangeStatusJob = (profileId: number) => {
    jobApplyUpdateRequest({
      profileId: profileId,
      status: modalVisible.status
    })
    setModalVisible({
      status: 'received',
      isOpen: false
    })
  }
  useEffect(() => {
    if (jobApplyUpdateResponse.isSuccess || jobApplyUpdateResponse.data) {
      console.log(jobApplyUpdateResponse.data)

      alert('Đổi trạng thái thành công')
    }
  }, [jobApplyUpdateResponse])

  useEffect(() => {
    console.log(data?.data)
    console.log(item)
  }, [value, item])

  
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
              <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>{TEXT_TITLE_LIST_JOB_APPLY}</h4>
            </div>
            {/* <Select
              value={value}
              defaultValue={value}
              options={options}
            /> */}
            <select
              className='style2-input form-control selectType pe-5 ps-5'
              onChange={(e) => {
                setValue(e.target.value)
              }}
              
            >
              <option hidden value={value}>
                {item}
              </option>
              {dataType.map((item, index) => (
                <option value={item.value} label={item.label} key={index}>
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
                {data?.data.map((data, index) =>
                  data.status == value ? (
                    <div className='group-job-apply' key={index}>
                      <div className='item-job-apply'>
                        <div className='tam'>
                          <div className='img-job-apply'>
                            {data.studentName == '' ? (
                              <DefaultAvatar
                                name={data.studentName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                size={80}
                                styleBootstrap={'defaultImage'}
                              />
                            ) : (
                              <img
                                src={data.studentAvatar ? SERVER_ADDRESS + 'api/images/' + data.studentAvatar : ''}
                                className='avatar p-0'
                                alt='avatar'
                              />
                            )}
                          </div>
                          <div className='content-job-apply'>
                            <h1 className='fw-900 title text-black'>
                              {data.studentName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                            </h1>
                            <h1 className='fw-900 title text-black'>{data.jobTitle}</h1>
                            <div className='item-job'>
                              <FontAwesomeIcon icon={faPhoneVolume} />
                              {data.phone === null ? (
                                <p className='fw-500 mb-0 ms-2 text-black'>{TEXT_NOTIFICATION_PHONE_NULL}</p>
                              ) : (
                                <p className='fw-500 mb-0 ms-2 text-black'>{data.phone}</p>
                              )}
                            </div>
                            <div className='item-job'>
                              <FontAwesomeIcon icon={faEnvelope} />
                              <p className='fw-500 txt mb-0 ms-2 text-black'>{data.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className='date'>
                          <p className='fw-600 mb-0'>{formatDateTime(data.createdAt)}</p>
                        </div>
                      </div>
                      <div className='btnBottom'>
                        <button
                          type='button'
                          className='txt text-green download ms-2'
                          onClick={() => handleBtnJobApply(data.studentName, data.id)}
                        >
                          <FontAwesomeIcon icon={faFilePdf} color={COLOR_SUCCESS} /> Xem hồ sơ
                        </button>
                        <button className='txt text-green download' onClick={() => openModal(data.status)}>
                          Chỉnh sửa hồ sơ
                        </button>
                        <Modal
                          show={modalVisible.isOpen}
                          onHide={closeModal}
                          aria-labelledby='contained-modal-title-vcenter'
                          backdrop='static'
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Đổi trạng thái</Modal.Title>
                            <button
                              style={{ position: 'absolute', top: 10, right: 30 }}
                              type='button'
                              className='btn-close-modal-header close font-xl'
                              onClick={closeModal}
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </Modal.Header>
                          <Modal.Body>
                            <select
                              className='style2-input form-control selectType pe-5 ps-5'
                              onChange={(e) => {
                                setModalVisible({
                                  status: e.target.value,
                                  isOpen: true
                                })
                              }}
                            >
                              <option hidden value={modalVisible.status}>
                                {modalVisible.status}
                              </option>
                              {dataType.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant='secondary' onClick={closeModal}>
                              Close
                            </Button>
                            <Button variant='primary' onClick={() => handleChangeStatusJob(data.id)}>
                              Thay đổi
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <a className='download' href={SERVER_ADDRESS + 'api/files/' + data.cvUrl} download={data.cvUrl}>
                          {TEXT_TITLE_DOWNLOAD_CV}
                        </a>
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
    </Fragment>
  )
}
