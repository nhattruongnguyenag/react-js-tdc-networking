import { Fragment, useEffect, useState } from 'react'
import Header from '../components/common/Header'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/setting.css'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setDefaultLanguage, setUserLogin } from '../redux/Slice'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { APPROVAL_POST_PAGE, CHANGE_PASSWORD_PAGE, FACULTY_STUDENT_PAGE, LOGIN_PAGE, MANAGEMENT_JOB_APPLY_PAGE, PENDING_POST_PAGE, USER_DETAILS_PAGE } from '../constants/Page'
import { isAdmin, isBusiness, isFaculty, isStudent } from '../utils/UserHelper'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue'
import { slugify } from '../utils/CommonUtls'
import { Faculty } from '../types/Faculty'
import { Student } from '../types/Student'
import { getGroupForPost } from '../utils/GetGroup'
import { useTranslation } from 'react-multi-lang'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import axios from 'axios'

const data = [
  { label: 'Vietnamese', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' }
]

export default function SettingPage() {
  const t = useTranslation()
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('vi')
  const navigate = useNavigate()
  const filter = data.filter((item) =>
    item.label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        search
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
  )
  const handleClose = () => setShow(false)

  useEffect(() => {
    axios.post(`${SERVER_ADDRESS}api/option/get`, {
      userId: userLogin?.id,
      optionKey: 'language'
    }).then(response => {
      setLanguage(response.data.data.value)
      // dispatch(setDefaultLanguage(language))
    })
  }, [])



  const handleChange = () => {
    if (language) {
      axios.post(`${SERVER_ADDRESS}api/option/language`, {
        userId: userLogin?.id,
        value: language
      })
      dispatch(setDefaultLanguage(language))
      toast.success('Thay đổi ngôn ngữ thành công')
      setShow(false)
    } else {
      toast.error('Thay đổi ngôn ngữ không thành công')
    }
  }

  const handleShow = () => setShow(true)

  const logout = () => {
    sessionStorage.removeItem(USER_LOGIN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    dispatch(setUserLogin(null))
    navigate(LOGIN_PAGE)
  }

  const handleClickToAvatarAndName = () => {
    if (userLogin) {
      const state = {
        userId: userLogin.id,
        group: "",
      };
      navigate(`${USER_DETAILS_PAGE}/${slugify(userLogin.name)}-${state.userId}`, { state });
    }
  }

  const handleClickToChangePasswordPage = () => {
      navigate(CHANGE_PASSWORD_PAGE)
  }

  const isUserFacultyOrStudent = (isFaculty(userLogin) || isStudent(userLogin));
  const groupCode = isUserFacultyOrStudent ? (userLogin as unknown as Faculty || userLogin as unknown as Student).facultyGroupCode : "";

  return (
    <Fragment>
      <Header />
      <div className='main-content bg-lightblue theme-dark-bg'>
        <div className='middle-sidebar-bottom'>
          <div className='middle-sidebar-left'>
            <div className='middle-wrap'>
              <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                <div className='card-body p-lg-5 w-100 border-0 p-4'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <h4 className='font-xxl fw-700 mont-font mb-lg-5 font-md-xs mb-4 text-black'>
                        {t('Setting.setting')}
                      </h4>
                      <h6 className='mb-4 mt-0'>
                        {t('Setting.greeting')}, {userLogin?.name}
                      </h6>
                      <div className='nav-caption fw-600 font-xssss text-grey-500 mb-2'>Chung</div>
                      <ul className='list-inline mb-4'>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault()
                              handleClickToAvatarAndName()
                            }}
                            className='d-flex align-items-center pb-2 pt-2'
                          >
                            <i className='btn-round-md bg-primary-gradiant feather-user  font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('Setting.userInformation')}</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        {(isAdmin(userLogin) || isFaculty(userLogin)) && (
                          <li className='list-inline-item d-block border-bottom me-0'>
                            <Link className='d-flex align-items-center pb-2 pt-2' to={APPROVAL_POST_PAGE}>
                              <i className='btn-round-md bg-gold-gradiant feather-list font-md me-3 text-white' />{' '}
                              <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>Duyệt bài viết</h4>
                              <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                            </Link>
                          </li>
                        )}
                        {(isStudent(userLogin) || isFaculty(userLogin)) && (
                          <li className='list-inline-item d-block border-bottom me-0'>
                            <Link className='d-flex align-items-center pb-2 pt-2' to={FACULTY_STUDENT_PAGE}>
                              <i className='btn-round-md bg-red-gradiant feather-users font-md me-3 text-white' />
                              <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>
                                {getGroupForPost(groupCode ?? '', t)}
                              </h4>
                              <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                            </Link>
                          </li>
                        )}
                        {(isStudent(userLogin) || isBusiness(userLogin)) && (
                          <li className='list-inline-item d-block border-bottom me-0'>
                            <Link className='d-flex align-items-center pb-2 pt-2' to={PENDING_POST_PAGE}>
                              <i className='btn-round-md bg-gold-gradiant feather-clock font-md me-3 text-white' />{' '}
                              <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('Setting.waitPost')}</h4>
                              <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                            </Link>
                          </li>
                        )}

                        {isStudent(userLogin) && (
                          <li className='list-inline-item d-block me-0'>
                            <Link
                              className='d-flex align-items-center pb-2 pt-2'
                              to={`${MANAGEMENT_JOB_APPLY_PAGE}/${slugify(userLogin.name)}-${userLogin.id}`}
                            >
                              <i className='btn-round-md bg-red-gradiant feather-list font-md me-3 text-white' />{' '}
                              <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('Setting.applyPost')}</h4>
                              <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                            </Link>
                          </li>
                        )}
                      </ul>
                      <div className='nav-caption fw-600 font-xsss text-grey-500 mb-2'>Khác</div>
                      <ul className='list-inline'>
                        <li className='list-inline-item d-block border-bottom me-0 cursor-pointer'>
                          <a className='d-flex align-items-center pb-2 pt-2' onClick={handleShow}>
                            <i className='btn-round-md bg-gold-gradiant feather-globe font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0 text-black' style={{ color: 'black' }}>
                              {t('Setting.language')}
                            </h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a href='/helpbox' className='d-flex align-items-center pb-2 pt-2'>
                            <i className='btn-round-md bg-primary-gradiant feather-help-circle font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('Setting.help')}</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block border-bottom me-0'>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault()
                              handleClickToChangePasswordPage()
                            }}
                            className='d-flex align-items-center pb-2 pt-2'
                          >
                            <i className='btn-round-md bg-gold-gradiant feather-repeat font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('ChangePassword.setting')}</h4>
                            <i className='ti-angle-right font-xsss text-grey-500 ms-auto mt-3' />
                          </a>
                        </li>
                        <li className='list-inline-item d-block me-0'>
                          <button className='d-flex align-items-center pb-2 pt-2' onClick={() => logout()}>
                            <i className='btn-round-md bg-red-gradiant feather-lock font-md me-3 text-white' />{' '}
                            <h4 className='fw-600 font-xsss mb-0 mt-0 text-black'>{t('Setting.logout')}</h4>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ngôn ngữ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type='search'
              placeholder={t('Options.placeholderSearch')}
              style={{
                width: '100%',
                marginBottom: 20,
                marginTop: 20,
                paddingLeft: 60,
                paddingRight: 30,
                borderWidth: '1px',
                height: '50px',
                borderRadius: 50
              }}
              onChange={(txt) => {
                setSearch(txt.target.value)
              }}
            />
            <FontAwesomeIcon
              style={{ position: 'absolute', left: 35, top: 50, fontSize: 20 }}
              icon={faSearch}
              color='grey'
            />
            <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 500 }}>
              {search == ''
                ? data.map((data: any, index) => (
                    <div key={index.toString()}>
                      <div className='item-language' style={{ background: data.value == language ? '#dadde1' : '' }}>
                        <div>
                          <p className='name-language' onClick={() => setLanguage(data.value)}>
                            {data.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : filter.map((data: any, index) => (
                    <div key={index.toString()}>
                      <div className='item-language' style={{ background: data.value == language ? '#dadde1' : '' }}>
                        <div>
                          <p className='name-language' onClick={() => setLanguage(data.value)}>
                            {data.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Hủy
            </Button>
            <Button variant='primary' onClick={handleChange}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Fragment>
  )
}
