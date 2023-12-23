import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { error, log } from 'console'
import { useNavigate, useParams } from 'react-router-dom'
import { FileUploadRequest } from '../types/request/FileUploadRequest'
import { useAppSelector } from '../redux/Hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPaperPlane, faCancel } from '@fortawesome/free-solid-svg-icons'
import { COLOR_BTN_BLUE, COLOR_WHITE } from '../constants/Color'
import { toast } from 'react-toastify'
import { useJobApplyUpdateMutation } from '../redux/Service'
import { getIdFromSlug } from '../utils/CommonUtls'
import { CVURL, PROFILE_ID } from '../constants/KeyValue'
import { useTranslation } from 'react-multi-lang'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function JobApplyPage() {
  const t = useTranslation()
  const { slug } = useParams()
  const postId = getIdFromSlug(slug ?? '')
  const [file, setFile] = useState('')
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [fileName, setFileName] = useState('')
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigate = useNavigate()
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isUploadCV, setIsUpload] = useState(false)
  const profile = sessionStorage.getItem(PROFILE_ID)
  const cvUrl = sessionStorage.getItem(CVURL)

  useEffect(() => {
    if (profile && cvUrl) {
      setFile(SERVER_ADDRESS + 'api/files/' + cvUrl)
      setFileName(cvUrl)
      setIsUpload(true)
    }
  }, [cvUrl])
  const onFileChange = (event: any) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      console.log('Vui lòng chọn một tệp PDF.')
    }
    const formData = new FormData()
    formData.append('files', selectedFile ?? null)
    axios({
      method: 'post',
      url: `${SERVER_ADDRESS}api/upload/files`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      setFileName(res.data.data[0])
      setIsUpload(true)
    })
  }

  const onSuccess = () => {
    if (profile) {
      axios({
        method: 'PUT',
        url: `${SERVER_ADDRESS}api/job/update`,
        data: {
          profileId: postId,
          cvUrl: fileName
        }
      }).then((res) => {
        setIsAnonymous(true)
        navigate(-1)
        toast.success(t('JobApplyScreen.jobApplyScreenChangeSuccessTextContent'))
        sessionStorage.removeItem(PROFILE_ID)
        sessionStorage.removeItem(CVURL)
      }).catch((error)=>{
        toast.error(t('JobApplyScreen.jobApplyScreenUpdateFalse'))
      })
    } else if (fileName && postId) {
      axios({
        method: 'post',
        url: `${SERVER_ADDRESS}api/job/apply`,
        data: {
          post_id: postId,
          user_id: userLogin?.id ?? 12,
          cv_url: fileName
        }
      }).then((res) => {
        setIsAnonymous(true)
        navigate(-1)
        toast.success(t('JobApplyScreen.jobApplyScreenSaveSuccessTextContent'))
      })
    } else {
      toast.error(t('JobApplyScreen.jobApplyScreenFalse'))
    }
  }

  return (
    <div>
      <Header />
      <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className=''>
              <div
                className='position-relative scroll-bar theme-dark-bg pt-0'
                style={{ height: 845, width: 1000, background: '#A6ACAF' }}
              >
                <div className='main' style={{ width: '100%', textAlign: 'center' }}>
                  {file == null ? (
                    <div style={{ fontWeight: 'bold', marginTop: 400 }}>
                      {t('JobApplyScreen.jobApplyScreenEmptyCvTextContent')}{' '}
                    </div>
                  ) : (
                    file && (
                      <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                        {Array.apply(null, Array(numPages))
                          .map((x, i) => i + 1)
                          .map((page) => (
                            <Page pageNumber={page} />
                          ))}
                      </Document>
                    )
                  )}
                  <div style={{ position: 'fixed', bottom: 25, right: '33%', width: 130 }}>
                    <button
                      className='btn btn-info button_nop'
                      style={{ position: 'fixed', bottom: 27, right: '55%', width: 150, height: 40 }}
                      onClick={() => navigate(-1)}
                    >
                      <p>
                        {t('JobApplyScreen.jobApplyScreenButtonGoBack')}{' '}
                        <FontAwesomeIcon icon={faCancel} size='1x' color={COLOR_WHITE} />
                      </p>
                    </button>
                    <button
                      className='btn btn-info'
                      disabled={isAnonymous ? true : false}
                      style={{ position: 'fixed', bottom: 27, right: '45%', width: 150, height: 60 }}
                    >
                      <label htmlFor='fileInput' className='lbButton'>
                        {isUploadCV ? (
                          <p style={{whiteSpace: 'normal', display: 'inline'}}>
                            <p style={{fontSize: 17, marginBottom: 0}}>{t('JobApplyScreen.jobApplyScreenButtonUpdateCvTitle')}{' '}</p>
                            <FontAwesomeIcon icon={faPlus} size='1x' color={COLOR_WHITE} />

                          </p>
                        ) : (
                          <p style={{whiteSpace: 'normal', display: 'inline'}}>
                            <p style={{fontSize: 17, marginBottom: 0}}>{t('JobApplyScreen.jobApplyScreenButtonAddCvTitle')}{' '}</p>
                            <FontAwesomeIcon icon={faPlus} size='1x' color={COLOR_WHITE} />
                          </p>
                        )}
                      </label>
                    </button>
                    <input
                      id='fileInput'
                      type='file'
                      accept='.pdf'
                      onChange={onFileChange}
                      style={{ display: 'none' }}
                    />
                    <button
                      disabled={isAnonymous ? true : false}
                      className='btn btn-info button_nop'
                      style={{ position: 'fixed', bottom: 27, right: '35%', width: 150, height: 40 }}
                      onClick={onSuccess}
                    >
                      <p>
                        {t('JobApplyScreen.jobApplyScreenButtonComplete')}{' '}
                        <FontAwesomeIcon icon={faPaperPlane} size='1x' color={COLOR_WHITE} />
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
