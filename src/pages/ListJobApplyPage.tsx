import React, { Fragment, useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFilePdf, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { getIdFromSlug, slugify } from '../utils/CommonUtls'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import DefaultAvatar from '../components/common/DefaultAvatar'
import { formatDateTime } from '../utils/FormatTime'
import { toast } from 'react-toastify'
import Loading from '../components/common/Loading'
import { DETAILS_JOB_APPLY } from '../constants/Page'
import { useGetProfileApplyQuery, useJobApplyUpdateMutation } from '../redux/Service'
import { COLOR_SUCCESS } from '../constants/Color'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import { t } from 'react-multi-lang'
let md5 = require('md5')

export interface JobApplyResponseData {
  status: string
  isOpen: boolean
}
const defaultModal: JobApplyResponseData = {
  status: 'received',
  isOpen: false
}

export default function ListJobApplyPage() {
  const dataType = [
    { label: t('ListJobApplyComponent.textReceived'), value: 'received' },
    { label: t('ListJobApplyComponent.textIn_progress'), value: 'in_progress' },
    { label: t('ListJobApplyComponent.textNot_meet_standard_quality'), value: 'not_meet_standard_quality' },
    { label: t('ListJobApplyComponent.textInterview'), value: 'interview' },
    {
      label: t('ListJobApplyComponent.textInterview_not_meet_standard_quality'),
      value: 'interview_not_meet_standard_quality'
    },
    { label: t('ListJobApplyComponent.textAccept'), value: 'accept' }
  ]
  const navigate = useNavigate()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const [value, setValue] = useState('received')
  const [item, setItem] = useState(t('ListJobApplyComponent.textReceived'))
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
      toast.success(t('ListJobApplyComponent.textChangeSucces'))
    }
  }, [jobApplyUpdateResponse])
  
  return (
    <Fragment>
      <Header />
      <div className='main-content vh-100 bg-lightblue theme-dark-bg'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body w-100 d-flex rounded-3 bg-recruitment theme-dark-bg overflow-hidden border-0 p-4'>
                  <button className='d-inline-block mt-2' onClick={() => navigate(-1)}>
                    <i className='ti-arrow-left font-sm text-white' />
                  </button>
                  <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>
                    {t('ListJobApplyComponent.listJobApply')}
                  </h4>
                </div>
                <Select
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
                    <p className='fw-600 text-black'>{t('ListJobApplyComponent.listEmpty')}</p>
                  </div>
                ) : (
                  <div className='card-body p-lg-5 w-100 manage border-0 p-2'>
                    {data?.data.map(
                      (data, index) =>
                        data.status === value && (
                          <div className='group-job-apply theme-dark-bg' key={md5(index + data.id)}>
                            <div className='item-job-apply theme-dark-bg'>
                              <div className='tam'>
                                <div className='img-job-apply'>
                                  {data.studentAvatar == null ? (
                                    <DefaultAvatar
                                      name={data.studentName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                      size={80}
                                      styleBootstrap={'defaultImage'}
                                    />
                                  ) : (
                                    <img
                                      src={SERVER_ADDRESS + 'api/images/' + data.studentAvatar}
                                      className='h-14 w-14 rounded-full'
                                    />
                                  )}
                                </div>
                                <div className='content-job-apply'>
                                  <h1 className='fw-900 title text-p text-black'>
                                    {data.studentName.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                                  </h1>
                                  <h1 className='fw-900 title text-p text-black'>{data.jobTitle}</h1>
                                  <div className='item-job'>
                                    <FontAwesomeIcon icon={faPhoneVolume} color='gray' />
                                    {data.phone == null ? (
                                      <p className='fw-500 text-p mb-0 ms-2 text-black'>
                                        {t('ListJobApplyComponent.updateNull')}
                                      </p>
                                    ) : (
                                      <p className='fw-500 mb-0 ms-2 text-black'>{data.phone}</p>
                                    )}
                                  </div>
                                  <div className='item-job'>
                                    <FontAwesomeIcon icon={faEnvelope} color='gray' />
                                    <p className='fw-500 txt mb-0 ms-2 text-black'>{data.email}</p>
                                  </div>
                                </div>
                              </div>

                              <div className='date'>
                                <p className='fw-500 txt mb-0'>{formatDateTime(data.createdAt)}</p>
                              </div>
                            </div>
                            <div className='btnBottom'>
                              <button
                                type='button'
                                className='txt text-green download ms-2'
                                onClick={() => handleBtnJobApply(data.studentName, data.id)}
                              >
                                <FontAwesomeIcon icon={faFilePdf} color={COLOR_SUCCESS} />
                                {t('ListJobApplyComponent.seeDetailCV')}
                              </button>
                              <button className='txt text-green download ms-4' onClick={() => openModal(data.status)}>
                                {t('ListJobApplyComponent.textChangeStatus')}
                              </button>
                              <Modal
                                show={modalVisible.isOpen}
                                onHide={closeModal}
                                aria-labelledby='contained-modal-title-vcenter'
                                backdrop='static'
                                keyboard={false}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>{t('ListJobApplyComponent.textChangeStatus')}</Modal.Title>
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
                                      {item}
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
                                    {t('ListJobApplyComponent.textCancel')}
                                  </Button>
                                  <Button variant='primary' onClick={() => handleChangeStatusJob(data.id)}>
                                    {t('ListJobApplyComponent.textChange')}
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                              <a
                                className='download ms-4'
                                href={SERVER_ADDRESS + 'api/files/' + data.cvUrl}
                                download={data.cvUrl}
                              >
                                {t('ListJobApplyComponent.textDownload')}
                              </a>
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
    </Fragment>
  )
}
