import { Fragment, memo, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { toggleDarkMode } from '../../redux/Slice'
import NotificationPopup from '../NotificationPopup'
import MobileNavigation from './MobileNavigation'
import Navigaion from './Navigation'
// import '../../assets/css/iconCount.css'
import {
  BUSINESS_DASHBOARD_PAGE,
  FACULTY_DASHBOARD_PAGE,
  SEARCH_PAGE,
  STUDENT_DASHBOARD_PAGE
} from '../../constants/Page'
import NavItem from './NavItem'
import classNames from 'classnames'
import { IMAGE_URL } from '../../constants/Path'
import { useCountNewUpdateConversationsQuery, useGetQualityNotificationQuery } from '../../redux/Service'

function Header() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const location = useLocation()
  const [showNotificationPopup, setShowNotificationPopup] = useState(false)
  const [showMobleNavigation, setShowMobileNavigation] = useState(false)
  const dispatch = useAppDispatch()
  const [qty, setQty] = useState<any>()

  const { data, isFetching } = useGetQualityNotificationQuery(
    {
      id: userLogin?.id ?? -1
    },
    {
      pollingInterval: 3000
    }
  )

  const countNewUpdateConversation = useCountNewUpdateConversationsQuery({
    userId: userLogin?.id ?? -1
  }, {pollingInterval: 2000})

  useEffect(() => {
    setQty(data?.data)
  }, [data, isFetching])

  const getFacultyByFacultyGroupCode = (group: string): string => {
    let faculty = group.substring(group.indexOf('_') + 1)
    faculty = 'khoa_' + faculty
    return faculty
  }
  return (
    <Fragment>
      <div className='nav-header shadow-xs border-0 bg-white'>
        <div className='nav-top bg-inherit'>
          <Link to={BUSINESS_DASHBOARD_PAGE}>
            <img src='/assets/images/app-logo.png' width={'200px'} />
          </Link>
          <a className='mob-menu chat-active-btn me-2 ms-auto' href='/defaultmessage'>
            <i className='feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight' />
          </a>
          <a className='mob-menu me-2' href='/defaultvideo'>
            <i className='feather-video text-grey-900 font-sm btn-round-md bg-greylight' />
          </a>
          <span className='menu-search-icon mob-menu me-2'>
            <i className='feather-search text-grey-900 font-sm btn-round-md bg-greylight' />
          </span>
          <button
            className='nav-menu me-feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 0 ms-2'
            type='button'
            onClick={() => setShowMobileNavigation(!showMobleNavigation)}
          />
        </div>

        <div>
          <NavItem to={BUSINESS_DASHBOARD_PAGE} active={BUSINESS_DASHBOARD_PAGE == location.pathname}>
            <i className='feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 ' />
          </NavItem>

          <NavItem to={STUDENT_DASHBOARD_PAGE} active={Boolean(STUDENT_DASHBOARD_PAGE == location.pathname)}>
            <i className='feather-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500' />
          </NavItem>

          <NavItem
            to={
              FACULTY_DASHBOARD_PAGE +
              `/${
                userLogin?.facultyGroupCode
                  ? getFacultyByFacultyGroupCode(userLogin?.facultyGroupCode)
                  : 'danh-sach-khoa'
              }`
            }
            active={location.pathname.includes(FACULTY_DASHBOARD_PAGE)}
          >
            <i className='feather-book font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500' />
          </NavItem>

          <NavItem to={SEARCH_PAGE} active={SEARCH_PAGE == location.pathname}>
            <i className='feather-search font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 ' />
          </NavItem>
        </div>

        <span
          onClick={() => setShowNotificationPopup(!showNotificationPopup)}
          className='pointer menu-icon ms-auto p-2 text-center '
          id='dropdownMenu3'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {
            qty > 0 && <span className='dot-count'>{qty}</span>
          }
          {/* <div className='icon_count bg-warning'></div> */}
          <i className='feather-bell font-xl text-current' />
        </span>
        
        <NotificationPopup show={showNotificationPopup} />
        <Link to='/hoi-thoai' className='menu-icon chat-active-btn ms-3 p-2 text-center'>
          {
            countNewUpdateConversation.data && ( countNewUpdateConversation.data.count > 0) &&
            <span className='dot-count'>{countNewUpdateConversation.data?.count}</span>
          }
          <i className='feather-message-square font-xl text-current' />
        </Link>
        <span
          onClick={() => dispatch(toggleDarkMode())}
          className='pointer menu-icon chat-active-btn ms-3 p-2 text-center '
        >
          <i className='feather-moon font-xl text-current' />
        </span>
        <Link className='menu-icon ms-3 p-0' to='/cai-dat'>
          {userLogin?.image ? (
            <img src={IMAGE_URL + userLogin.image} alt='user' className='avatarSetting h-10 w-10 rounded-full object-cover' />
          ) : (
            <div
              className={classNames(
                'me-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r',
                'from-purple-400 to-blue-400'
              )}
            >
              <span>{userLogin?.name[0]}</span>
            </div>
          )}
        </Link>
        <Navigaion />
      </div>
      <MobileNavigation show={showMobleNavigation} />
      <div id='main-content-wrap' className='right-chat nav-wrap right-scroll-bar mt-2  '>
        <div className='middle-sidebar-right-content shadow-xss rounded-xxl bg-white'>
          <div className='section full position-relative feed-body pe-3 ps-4 pt-4'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>CONTACTS</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-8.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Hurin Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-7.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Victor Exrixon
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-6.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Surfiya Zakir
                  </span>
                </h3>
                <span className='bg-warning btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-5.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Goria Coast
                  </span>
                </h3>
                <span className='bg-danger btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-4.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Hurin Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-3.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    David Goria
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-2.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Seary Victor
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-12.png' alt='avater' className='w35' />
                </figure>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>Ana Seary</span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
          <div className='section full position-relative feed-body pb-4 pe-3 ps-4 pt-4'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>GROUPS</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-primary-gradiant ls-3 font-xssss fw-700 me-3 text-white'>UD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Studio Express
                  </span>
                </h3>
                <span className='badge text-grey-500 badge-pill font-xsssss mt-0 pe-0'>2 min</span>
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-gold-gradiant ls-3 font-xssss fw-700 me-3 text-white'>AR</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Armany Design
                  </span>
                </h3>
                <span className='bg-warning btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-mini-gradiant ls-3 font-xssss fw-700 me-3 text-white'>UD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>De fabous</span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
          <div className='section full position-relative feed-body pb-4 pe-3 ps-4 pt-0'>
            <h4 className='font-xsssss text-grey-500 text-uppercase fw-700 ls-3'>Pages</h4>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-primary-gradiant ls-3 font-xssss fw-700 me-3 text-white'>AB</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Armany Seary
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
              <li className='list-group-item no-icon d-flex align-items-center border-0 bg-transparent pb-2 pe-0 ps-0 pt-2'>
                <span className='btn-round-sm bg-gold-gradiant ls-3 font-xssss fw-700 me-3 text-white'>SD</span>
                <h3 className='fw-700 mb-0 mt-0'>
                  <span className='font-xssss text-grey-600 d-block text-dark model-popup-chat pointer'>
                    Entropio Inc
                  </span>
                </h3>
                <span className='bg-success btn-round-xss ms-auto' />
              </li>
            </ul>
          </div>
        </div>
        <div className='modal-popup-chat '>
          <div className='modal-popup-wrap rounded-3 bg-white p-0 shadow-lg'>
            <div className='modal-popup-header w-100 border-bottom'>
              <div className='card d-block d-block border-0 p-3'>
                <figure className='avatar float-left mb-0 me-2'>
                  <img src='assets/images/user-12.png' alt='avater' className='w35 me-1' />
                </figure>
                <h5 className='fw-700 text-primary font-xssss mb-1 mt-1'>Hendrix Stamp</h5>
                <h4 className='text-grey-500 font-xsssss mb-0 mt-0'>
                  <span className='d-inline-block bg-success btn-round-xss m-0' /> Available
                </h4>
                <div className='font-xssss position-absolute pointer right-0 top-0 me-4 mt-3'>
                  <i className='ti-close text-grey-900 d-inline-block mt-2' />
                </div>
              </div>
            </div>
            <div className='modal-popup-body w-100 h-auto p-3'>
              <div className='message'>
                <div className='message-content font-xssss lh-24 fw-500'>Hi, how can I help you?</div>
              </div>
              <div className='date-break font-xsssss lh-24 fw-500 text-grey-500 mb-2 mt-2'>Mon 10:20am</div>
              <div className='message self mt-2 text-right'>
                <div className='message-content font-xssss lh-24 fw-500'>
                  I want those files for you. I want you to send 1 PDF and 1 image file.
                </div>
              </div>
              <div className='snippet bg-grey float-right mt-2 rounded-xl pb-2 pe-3 ps-4 pt-3' data-title='.dot-typing'>
                <div className='stage'>
                  <div className='dot-typing' />
                </div>
              </div>
              <div className='clearfix' />
            </div>
            <div className='modal-popup-footer w-100 border-top'>
              <div className='card d-block d-block border-0 p-3'>
                <div className='form-group icon-right-input style1-input mb-0'>
                  <input
                    type='text'
                    placeholder='Start typing..'
                    className='form-control bg-greylight font-xssss fw-500 rounded-xl border-0 ps-3'
                  />
                  <i className='feather-send text-grey-500 font-md' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default memo(Header)
