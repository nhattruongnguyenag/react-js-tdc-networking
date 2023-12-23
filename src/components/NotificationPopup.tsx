import classNames from 'classnames'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import '../assets/css/notification.css'
import { FaEllipsisV, FaBullhorn, FaTimes, FaTablet } from 'react-icons/fa'
import { Menu, MenuItem, MenuButton, ControlledMenu, useClick, useMenuState } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import Moment from 'react-moment'
import moment from 'moment'
import { NotificationModel } from '../types/response/NotificationModel'
import { useGetNotificationsUserByIdQuery } from '../redux/Service'
import { useAppSelector } from '../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import NotificationListView from './listviews/NotificationListView'
import { ACCEPT_POST, CHANGE_PASSWORD_SUCCESS, CREATE_RECRUITMENT, CREATE_SURVEY, FACULTY_CREATE_NORMAL, FACULTY_CREATE_SURVEY, POST_LOG, REGISTER_SUCCESS, SAVE_POST, UPDATE_POST, USER_APPLY_JOB, USER_CHANGE_LANGUAGE, USER_COMMENT_POST, USER_CONDUCT_SURVEY, USER_CREATE_WATCH_JOB, USER_FOLLOW, USER_LIKE_POST, USER_REPLY_COMMENT, USER_UPDATE, USER_UPDATE_AVATAR } from '../constants/TypeNotification';
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import { DETAILS_JOB_APPLY, LIST_JOB_APPLY_PAGE, POST_DETAIL, SURVEY_RESULT_PAGE } from '../constants/Page'
import { slugify } from '../utils/CommonUtls'
import Button from 'react-bootstrap/Button'
interface NotificationPopupProps {
  show?: boolean
}

export default function NotificationPopup(props: NotificationPopupProps) {
  const t = useTranslation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [show, setShow] = useState(false)
  const [log, setLog] = useState('')
  const navigate = useNavigate()
  const { data, isFetching } = useGetNotificationsUserByIdQuery(
    {
      id: userLogin?.id ?? -1
    },
    {
      pollingInterval: 1500
    }
  )
  const [arr, setArr] = useState<NotificationModel[]>()

  useEffect(() => {
    // setIsLoading(false)
    setArr(data?.data)
  }, [isFetching])

  const handleAllIsRead = () => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, {
      userId: userLogin?.id ?? -1
    })
  }

  const handleItem = (id: number) => {
    const notification = data?.data.find(item => id === item.id)
    const state = {
      postId: notification?.dataValue.id,
      notificationContent: notification?.dataValue.content,
      notificationType: notification?.type
    }


    if (notification) {
      switch (notification.type) {
        case CREATE_SURVEY:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case CREATE_RECRUITMENT:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case FACULTY_CREATE_SURVEY:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case FACULTY_CREATE_NORMAL:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case SAVE_POST:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case USER_LIKE_POST:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case USER_COMMENT_POST:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case USER_REPLY_COMMENT:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case USER_CONDUCT_SURVEY:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case ACCEPT_POST:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case USER_CREATE_WATCH_JOB:
          navigate(`${POST_DETAIL}/${slugify('bai-viet')}-${notification?.dataValue.id}`, { state })
          break
        case POST_LOG:
          setShow(true)
          setLog(notification?.dataValue.content)
          break
        case USER_APPLY_JOB:
          navigate(`${DETAILS_JOB_APPLY}/${slugify('chi-tiet')}-${notification.dataValue.id}`)
          break
        default:
          break
      }
    }
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
      id: id,
      userId: userLogin?.id ?? -1
    })
  }
  //Danh dau chua doc
  const handleIsNotRead = (id: number) => {
    axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/makeNotSeen`, {
      id: id,
      userId: userLogin?.id ?? -1
    })
  }

  const handleDelNotification = (id: number) => {
    axios.delete(`${SERVER_ADDRESS}api/notifications`, {
      data: {
        id: id,
        userId: userLogin?.id ?? -1
      }
    })
  }

  const handleItemCanNotClick = (id: number) => {
    console.log('123');

    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
        id: id,
        userId: userLogin?.id
      })
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  const handleClose = () => { setShow(false) }

  const notificationItems = (item: NotificationModel) => {
    return (
      <div
        key={item.id}
        className='card bg-transparent-card w-100 itemNotification mb-0 border-0 ps-0'
        style={{ background: item.status == '0' ? '#e6e6e6' : '#fff', flexDirection: 'row', padding: 10 }}
        onClick={() => handleItem(item.id)}
      >
        <img src='/assets/images/user-8.png' alt='user' className='image_item' />
        <div className='content_item'>
          <h5 className='text-grey-900 fw-500 font-xsss lh-4 txt_content' >
            Lorem
            {/* {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content} */}
          </h5>
          <h6 className='font-xssss text-grey-500 fw-500 d-block mb-1 mt-1 txt_name'>
            {moment(item.createdAt).fromNow()}
          </h6>
        </div>
        <Menu
          menuButton={
            <MenuButton className='menu_btn '>
              <FaEllipsisV />
            </MenuButton>
          }
          transition
        >
          <MenuItem onClick={() => handleIsNotRead(item.id)}>
            <FaBullhorn className='icon_option' />
            {t('NotificationsComponent.unReadNotification')}
          </MenuItem>
          <MenuItem onClick={() => handleDelNotification(item.id)}>
            <FaTimes className='icon_option' />
            {t('NotificationsComponent.deleteNotification')}
          </MenuItem>
        </Menu>

      </div>
    )
  }



  return (
    <div
      className={classNames(
        'dropdown-menu notification-dropdown rounded-xxl right-0 border-0 p-4 shadow-lg ',
        props.show ? 'show' : ''
      )}
      aria-labelledby='dropdownMenu3'
    >
      <h4 className='fw-700 font-xss mb-2 title_notification'>{t('NotificationsComponent.notification')}</h4>
      <div className='mb-3'>
        <button
          onClick={handleAllIsRead}
          style={{
            background: '#1e74fd',
            color: '#fff',
            borderRadius: 50,
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 13,
            marginLeft: 10,
            fontWeight: 'bold'
          }}
        >
          {t('NotificationsComponent.readAll')}
        </button>
      </div>
      <NotificationListView
        data={arr}
        handleItem={handleItem}
        handleDelNotification={handleDelNotification}
        handleIsNotRead={handleIsNotRead}
        handleItemCanNotClick={handleItemCanNotClick}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='text-sm' >Bài viết của bạn không được duyệt vì: "{log}"</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Đã hiểu!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

